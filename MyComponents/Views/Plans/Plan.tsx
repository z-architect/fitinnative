import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Props } from "../../types";
import SessionCard from "./SessionCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import DeleteModal from "../../Utils/DeleteModal";
import { BlurView } from "@react-native-community/blur";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { v4 as uuidv4 } from "uuid";
import { Difficulty, Goal, PlanType, UploadEntity } from "../../../api/spec";
import RBSheet from "react-native-raw-bottom-sheet";
import PlanCalendar, { IntervalsStateStructure } from "./PlanCalendar";
import { FetchSessionsResponseSpec } from "../../../api/spec/SessionSpec";
import { Plan as _Plan, Session, Upload } from "../../../api/interface";
import { Select, Switch } from "native-base";
import DifficultySelector from "./DifficultySelector";
import SessionList from "./SessionList";
import { instance } from "../../../api/config";
import { changePlanType } from "../../Redux/globalsSlice";
import { useIsFocused } from "@react-navigation/native";

const y = Dimensions.get("window").height;

const Plan = ({ navigation, route }: Props) => {
  const focusIsHere = useIsFocused();

  const bottomSheet = useRef<RBSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const dispatch = useAppDispatch();

  const subscribedPlans = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user.subscribedPlans
  );

  const chosenPlanType = useAppSelector(
    (state) => state.globals.chosenPlanType
  );

  const plans = useAppSelector(
    (state) => state.profiles.profiles[state.profiles.activeProfile].user.plans
  );
  const savedPlans = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user.savedPlans ??
      []
  );
  const verifiedProfessional = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user
        .isVerifiedProfessional || false
  );

  const [days, setDays] = useState(
    new Array(45).fill({
      isSet: false,
      filledBy: "",
    })
  );

  const [selectedDay, setSelectedDay] = useState<number>(-1);
  const [daySession, setDaySession] = useState(false);
  const [selectedDaySession, setSelectedDaySession] = useState("");
  const [displaySession, setDisplaySession] = useState(false);
  const [editMode, setEditMode] = useState(
    (route.params as any)?.editMode ?? false
  );
  const [createMode, setCreateMode] = useState(
    (route.params as any)?.createMode ?? false
  );
  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState((route.params as any)?.plan?.id ?? uuidv4());
  const [_private, setPrivate] = useState(
    (route.params as any)?.plan?.private ?? true
  );
  const [type, setType] = useState(
    (route.params as any)?.plan?.type ?? chosenPlanType
  );
  const [category, setCategory] = useState(
    (route.params as any)?.plan?.category ?? Goal.MASS_GAIN
  );
  const [difficulty, setDifficulty] = useState(
    (route.params as any)?.plan?.difficulty ?? Difficulty.MEDIUM
  );
  const [title, setTitle] = useState((route.params as any)?.plan?.title ?? "");
  const [description, setDescription] = useState(
    (route.params as any)?.plan?.description ?? ""
  );
  const [image, setImage] = useState(
    (route.params as any)?.plan?.image ?? null
  );
  const [imageAsset, setImageAsset] = useState<Asset | null>(null);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<FetchSessionsResponseSpec | null>(null);
  const [sessionIntervals, setSessionIntervals] = useState<
    IntervalsStateStructure[]
  >([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    console.log({ idFirst: id });
  }, []);

  const removeSession = (id: string) => {
    setSessions((sets) => {
      return sets.filter((item) => item.id !== id);
    });
  };

  async function handleSubscribeToPlan() {
    const result = await _Plan.subscribeToPlan({ id });

    if (!!result?.data) {
      // TODO
    }
  }

  async function handleUnsubscribeFromPlan() {
    const result = await _Plan.unsubscribeFromPlan({ id });

    if (result) {
      // TODO
    }
  }

  async function handleImageUpload(asset: Asset) {
    // setImageAsset(asset);

    const result = await Upload.uploadResource([asset], UploadEntity.PLAN);
    if (result) setImage(result.data[0]);
  }

  async function handleCreatePlan() {
    const planData: any = {
      id,
      description,
      category,
      difficulty,
      sessionIntervals,
      private: _private,
      title,
      type,
    };

    if (!!image) {
      planData.image = typeof image === "string" ? image : image.id;
    }

    const result = await _Plan.createPlan(planData);
    if (!!result?.data) {
      console.log("CREATE SUCCESS");
    }

    navigation.goBack();
  }

  async function handleUpdate() {
    const result = await _Plan.updatePlan({
      id,
      description,
      category,
      difficulty,
      image,
      sessionIntervals,
      private: _private,
      title,
    });

    console.log({ idInUpdate: result?.data });

    if (!!result?.data) {
      setId(result.data);
    }

    if (!(route.params as any).editMode) setEditMode(false);
    else navigation.replace("MyPlans");
  }

  async function handleDelete() {
    setShowDeleteModal(false);
    const result = await _Plan.removePlan({ id });

    if (result) navigation.goBack();
  }

  useEffect(() => {
    if (showBottomSheet) bottomSheet?.current?.open();
    else {
      bottomSheet?.current?.close();
    }
  }, [showBottomSheet]);

  useEffect(() => {
    if (!!(route.params as any)?.plan?.type) {
      dispatch(changePlanType((route.params as any)?.plan?.type));
    }
  }, []);

  async function fetchSessionIntervals() {
    const result = await _Plan.fetchSessionIntervals({ id });

    if (!!result?.data) {
      const _sessions: any = [];

      result.data?.sessionIntervals?.forEach((order) => {
        const sessionIds = _sessions.map((_session: any) => _session.id);

        if (!sessionIds.includes((order.set as FetchSessionsResponseSpec).id))
          _sessions.push(order.set);
      });

      setSessionIntervals(
        result?.data?.sessionIntervals.map((session) => {
          return {
            interval: session.interval,
            set: (session.set as FetchSessionsResponseSpec).id,
          };
        })
      );

      setSessions(_sessions);
    }
  }

  useEffect(() => {
    const sessionIds = sessions.map((session) => session?.id);

    setSessionIntervals(
      sessionIntervals.filter((session, index) =>
        sessionIds.includes(session.set)
      )
    );
  }, [sessions]);

  useEffect(() => {
    if (focusIsHere) {
      void fetchSessionIntervals();
    }
  }, [focusIsHere]);

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onDelete={() => handleDelete()}
        prompt={"Do you really want to delete this session?"}
      />
      {showModal ? (
        <SessionList
          showModal={showModal}
          setShowModal={setShowModal}
          navigation={navigation}
          route={route}
          selectedSessions={sessions}
          setSelectedSessions={setSessions}
        />
      ) : null}
      <View style={styles.container}>
        <View style={styles.head}>
          {!editMode && !createMode ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <MaterialIcons name="navigate-before" size={40} color="black" />
            </TouchableOpacity>
          ) : !createMode ? (
            <TouchableOpacity
              onPress={() => {
                void handleUpdate();
              }}
            >
              <MaterialIcons name="check" size={32} color="green" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                void handleCreatePlan();
              }}
            >
              <Text style={{ fontSize: 20, color: "green" }}>Create</Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {!editMode && !createMode ? (
              !plans.map((v: any) => v.id).includes(id) ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setShowDeleteModal(true);
                    }}
                  >
                    <MaterialIcons name="delete" size={32} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => {
                      // navigation.navigate("SessionEdit");
                      setEditMode(true);
                    }}
                  >
                    <MaterialIcons name="edit" size={32} color="black" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      // TODO bookmark
                    }}
                  >
                    <MaterialIcons
                      name={
                        savedPlans.map((v: any) => v.id).includes(id)
                          ? "bookmark"
                          : "bookmark-outline"
                      }
                      size={32}
                      color="black"
                    />
                  </TouchableOpacity>
                </>
              )
            ) : !createMode ? (
              <>
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    if (!(route.params as any).editMode) setEditMode(false);
                    else navigation.goBack();
                  }}
                >
                  <MaterialIcons name="close" size={32} color="red" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text style={{ fontSize: 20, color: "red" }}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <ScrollView scrollEnabled={scrollEnabled}>
          <View style={styles.planImage}>
            <ImageBackground
              source={
                !!image
                  ? {
                      uri: `${instance.defaults.baseURL}/upload/${
                        typeof image === "string" ? image : image.id
                      }`,
                    }
                  : { uri: "nothing" }
              }
              resizeMode="cover"
              style={[
                styles.image,
                {
                  justifyContent: "flex-end",
                  alignItems: "center",
                },
              ]}
            >
              {editMode && !(route.params as any)?.editMode ? ( // TODO FIX THIS PROPERLY LATER
                <BlurView
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  overlayColor={"transparent"}
                  blurType="dark"
                  blurAmount={1}
                />
              ) : null}
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0, 0.4)",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {editMode || createMode ? (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      paddingHorizontal: 20,
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                        paddingTop: 17,
                      }}
                      onPress={() => {
                        launchImageLibrary(
                          { selectionLimit: 1, mediaType: "photo" },
                          (response) => {
                            if (
                              response.didCancel ||
                              response.assets?.length !== 1
                            )
                              return;
                            void handleImageUpload(response.assets[0]);
                          }
                        );
                      }}
                    >
                      <MaterialIcons
                        name="add-photo-alternate"
                        size={48}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    paddingBottom: 40,
                    paddingHorizontal: 20,
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                  }}
                >
                  {!editMode && !createMode ? (
                    <>
                      <Text
                        style={[
                          {
                            fontSize: 32,
                            color: "white",
                            paddingBottom: 5,
                          },
                        ]}
                      >
                        {title}
                      </Text>

                      <Text
                        style={[
                          {
                            color: "white",
                            fontSize: 18,
                          },
                        ]}
                      >
                        {description}
                      </Text>
                    </>
                  ) : (
                    <>
                      <TextInput
                        // autoFocus={!!createMode} TODO
                        style={{
                          color: "white",
                          minWidth: "30%",
                          fontWeight: "bold",
                          fontSize: 32,
                          borderBottomWidth: 1,
                          borderColor: "white",
                        }}
                        placeholder={"Title"}
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          {
                            minWidth: "65%",
                            borderBottomWidth: 1,
                            borderColor: "white",
                            paddingTop: 20,
                          },
                        ]}
                        placeholder={"Description"}
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                      />
                    </>
                  )}
                </View>
              </View>
            </ImageBackground>
          </View>

          {editMode || createMode ? (
            <View
              style={{
                paddingTop: 30,
                paddingBottom: 20,
                paddingHorizontal: 20,
                flexDirection: verifiedProfessional ? "row" : "column",
              }}
            >
              <View style={{ marginLeft: verifiedProfessional ? 20 : 0 }}>
                <View style={{ paddingBottom: 20, flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Difficulty
                  </Text>
                </View>
                <DifficultySelector
                  horizontal={!verifiedProfessional}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginLeft: verifiedProfessional ? 20 : 0,
                  paddingTop: !verifiedProfessional ? 50 : 0,
                  paddingLeft: !verifiedProfessional ? 0 : 20,
                  borderLeftWidth: !verifiedProfessional ? 0 : 1,
                  borderColor: "rgba(0,0,0,0.05)",
                }}
              >
                <View style={{ width: "100%" }}>
                  <View style={{ paddingBottom: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Category
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: "rgba(0,0,0,0.1)",
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                  >
                    <Select
                      style={{ width: "100%" }}
                      selectedValue={category}
                      accessibilityLabel={`Category selector`}
                      placeholder={`Choose plan category`}
                      onValueChange={(value) => setCategory(value as Goal)}
                    >
                      {Object.values(Goal).map((value) => (
                        <Select.Item key={value} label={value} value={value} />
                      ))}
                    </Select>
                  </View>
                </View>
                {verifiedProfessional ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {`Public `}
                    </Text>
                    <Switch
                      isChecked={!_private}
                      onToggle={() => setPrivate(!_private)}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          ) : null}

          <ScrollView
            style={[styles.sessionContainer]}
            nestedScrollEnabled={true}
          >
            {!sessions.length ? (
              <>
                {!editMode && !createMode ? (
                  <View
                    style={{
                      flex: 1,
                      height: 350,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>No exercises</Text>
                  </View>
                ) : null}
              </>
            ) : (
              sessions.map((data) => (
                <SessionCard
                  key={data.id}
                  session={data}
                  onSheetOpen={() => {
                    bottomSheet.current?.open();
                    setSelectedSession(data);
                    setShowBottomSheet(true);
                  }}
                  editMode={editMode}
                  createMode={createMode}
                  scrollEnabled={scrollEnabled}
                  setScrollEnabled={setScrollEnabled}
                  onSelect={() => {
                    navigation.navigate("Session", { session: data });
                  }}
                  onEdit={() => {
                    navigation.navigate("Session", {
                      editMode: true,
                      session: data,
                    });
                  }}
                  onDelete={(id: string) => {
                    removeSession(id);
                  }}
                  setcolor="orange"
                />
              ))
            )}
          </ScrollView>

          <View
            style={{
              paddingBottom: 165,
            }}
          />
        </ScrollView>
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity
            disabled={!(editMode || createMode) && !sessions.length}
            onPress={() => {
              if (editMode || createMode) setShowModal(true);
              else if (subscribedPlans.includes(id))
                navigation.navigate("Exercise");
              else void handleSubscribeToPlan();
            }}
            style={[
              styles.button,
              {
                borderColor:
                  editMode || createMode || sessions.length
                    ? "white"
                    : "rgba(255,255,255, 0.6)",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                color:
                  editMode || createMode || sessions.length
                    ? "white"
                    : "rgba(255,255,255, 0.6)",
              }}
            >
              {createMode || editMode
                ? "+ Add Exercise"
                : subscribedPlans.includes(id)
                ? "Start Session"
                : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
        {showBottomSheet ? (
          <RBSheet
            ref={bottomSheet}
            onClose={() => {
              setShowBottomSheet(false);
              setSelectedSession(null);
            }}
            height={550}
            closeOnDragDown={true}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <PlanCalendar
              sessions={sessions}
              sessionIntervals={sessionIntervals}
              setSessionIntervals={setSessionIntervals}
              selectedSession={selectedSession}
              editMode={editMode}
              createMode={createMode}
              navigation={navigation}
              route={route}
              // subscribed={!!(route.params as any)?.subscribed}
            />
          </RBSheet>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "rgba(110,140,160,0.1)",
  },
  planImage: {
    maxHeight: 300,
    elevation: 15,
    shadowOpacity: 0.1,
    backgroundColor: "white",
    marginTop: 8,
  },
  image: {
    position: "relative",
    width: "100%",
    height: y * 0.3,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  sessionContainer: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  addButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    width: "50%",
    height: 60,
    marginHorizontal: "25%",
    borderRadius: 32,
    backgroundColor: "rgb(110,140,160)",
  },
  input: {
    color: "white",
    fontSize: 18,
  },
  imageText: {
    color: "white",
    fontSize: 38,
    margin: 20,
  },
  head: {
    height: y * 0.085,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingRight: 20,
    elevation: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 55,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#5E85A2",
    width: "50%",
    marginVertical: 20,
    marginHorizontal: "20%",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    elevation: 15,
  },
  textContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    paddingLeft: 6,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default Plan;
