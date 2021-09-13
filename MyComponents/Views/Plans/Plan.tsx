import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Props } from "../../types";
import SessionCard from "./SessionCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import DeleteModal from "../../Utils/DeleteModal";
import { BlurView } from "@react-native-community/blur";
import { useAppSelector } from "../../Redux/hooks";
import { v4 as uuidv4 } from "uuid";
import { Difficulty, Goal, PlanType, Subscription } from "../../../api/spec";
import RBSheet from "react-native-raw-bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import PlanCalendar, { IntervalsStateStructure } from "./PlanCalendar";
import { FetchSessionsResponseSpec } from "../../../api/spec/SessionSpec";
import { Plan as _Plan } from "../../../api/interface";
import meal from "../MealConstituent/meal";

const y = Dimensions.get("window").height;

const Plan = ({ navigation, route }: Props) => {
  const bottomSheet = useRef<RBSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const subscribedPlans = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user.subscribedPlans
  );

  const plans = useAppSelector(
    (state) => state.profiles.profiles[state.profiles.activeProfile].user.plans
  );
  const savedPlans = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user.savedPlans ??
      []
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

  const [id] = useState((route.params as any)?.plan?.id ?? uuidv4());
  const [_private, setPrivate] = useState(
    (route.params as any)?.plan?.private ?? true
  );
  const [type, setType] = useState(
    (route.params as any)?.plan?.type ?? PlanType.MEAL
  );
  const [category, setCategory] = useState(
    (route.params as any)?.plan?.category ?? Goal.MASS_GAIN
  );
  const [difficulty, setDifficulty] = useState(
    (route.params as any)?.plan.difficulty ?? Difficulty.MEDIUM
  );
  const [image, setImage] = useState<Asset>(
    (route.params as any)?.plan?.image ?? null
  );
  const [title, setTitle] = useState(
    (route.params as any)?.plan?.title ?? "Calisthenics"
  );
  const [description, setDescription] = useState(
    (route.params as any)?.plan?.description ??
      "An intense training for overall body development."
  );

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<FetchSessionsResponseSpec>({
      id: "5",
      name: "karate",
      description: "fancy",
      duration: 4,
      caloriesToBurn: 1,
      createdBy: "",
    });
  const [sessionIntervals, setSessionIntervals] = useState<
    IntervalsStateStructure[]
  >([
    { interval: 12, set: { id: "5" } },
    { interval: 7, set: { id: "5" } },
    { interval: 23, set: { id: "5" } },
    { interval: 29, set: { id: "2" } },
  ]);
  const [sessions, setSessions] = useState([
    {
      id: "1",
      title: "karate",
      description: "fancy",
      duration: 4,
      caloriesToBurn: 1,
      createdBy: "",
    },
    {
      id: "2",
      title: "karate",
      description: "fancy",
      duration: 4,
      caloriesToBurn: 1,
      createdBy: "",
    },
    {
      id: "3",
      title: "karate",
      description: "fancy",
      duration: 4,
      caloriesToBurn: 1,
      createdBy: "",
    },
    {
      id: "4",
      title: "karate",
      description: "fancy",
      duration: 3,
      caloriesToBurn: 1,
      createdBy: "",
    },
    {
      id: "5",
      title: "karate",
      description: "fancy",
      duration: 4,
      caloriesToBurn: 1,
      createdBy: "",
    },
    {
      id: "6",
      title: "karate",
      description: "fancy",
      duration: 4,
      caloriesToBurn: 1,
      createdBy: "",
    },
  ]);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // useEffect(() => {
  //   let totalTime = 0;
  //   let totalCalories = 0;
  //
  //   for (const set of sessions) {
  //     console.log({ met: set.met });
  //
  //     totalTime += set.duration;
  //     totalCalories += getCaloriesFromMet(set.met || 0);
  //   }
  //
  //   setTotalSessionTime({
  //     min: totalTime < 60 ? 0 : Math.floor(totalTime / 60),
  //     sec: totalTime < 60 ? totalTime : totalTime % 60,
  //   });
  //   setTotalCaloriesToBurn(totalCalories);
  // }, [sessions]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const removeSession = (id: string) => {
    setSessions((sets) => {
      return sets.filter((item) => item.id !== id);
    });
  };

  // const handleCalendarPress = (day: number) => {
  //   if ((sessionIntervals[day] as any)?.id === selectedSession?.id) {
  //     console.log("here");
  //     setSessionIntervals(
  //       sessionIntervals.filter((value: any, index: number) => index === day)
  //     );
  //   } else {
  //     console.log("lther");
  //
  //     setSessionIntervals(
  //       (sessionIntervals as any).map((value: any, index: number) => {
  //         if (index === day) return { isSet: true, filledBy: "" };
  //         else return { isSet: true, filledBy: "" };
  //       }) ?? [{ isSet: true, filledBy: "" }]
  //     );
  //   }
  //   // if (days[day].isSet) {
  //   //   setSelectedDay(day);
  //   //   setSelectedDaySession(days[day].filledBy);
  //   //   setDaySession(true);
  //   // }
  // };

  async function handleSubscribeToPlan() {
    const result = await _Plan.subscribeToPlan({ id });

    if (!!result?.data) {
      console.log({ subscribed: true });
    }
  }

  useEffect(() => {
    if (showBottomSheet) bottomSheet?.current?.open();
    else {
      bottomSheet?.current?.close();
    }
  }, [showBottomSheet]);

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onDelete={() => {
          setShowDeleteModal(false);
        }}
        prompt={"Do you really want to delete this session?"}
      />

      <View style={styles.container}>
        <View style={styles.head}>
          {!editMode ? (
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
                setEditMode(false);
                // TODO
              }}
            >
              <MaterialIcons name="check" size={32} color="green" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                // TODO
                navigation.goBack();
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
                    setEditMode(false);
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
                !!image ? image : require("../../../MyAssets/runninman.jpg")
              }
              resizeMode="cover"
              style={[
                styles.image,
                {
                  backgroundColor: "lightgrey",
                  justifyContent: "flex-end",
                  alignItems: "center",
                },
              ]}
            >
              {editMode || createMode ? (
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

                            setImage(response.assets[0]);
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
                        // autoFocus={true}
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 32,
                          borderBottomWidth: 1,
                          borderColor: "white",
                        }}
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          {
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

          <ScrollView
            style={[styles.sessionContainer]}
            nestedScrollEnabled={true}
          >
            {sessions.length === 0 ? (
              <Text>Sorry , you haven't added any sets yet</Text>
            ) : (
              sessions.map((data) => (
                <SessionCard
                  key={data.id}
                  session={data}
                  onSheetOpen={() => {
                    bottomSheet.current?.open();
                    setShowBottomSheet(true);
                  }}
                  editMode={editMode}
                  createMode={createMode}
                  scrollEnabled={scrollEnabled}
                  setScrollEnabled={setScrollEnabled}
                  onSelect={() => {
                    navigation.navigate("SessionView");
                  }}
                  onEdit={() => {
                    navigation.navigate("SessionView", {
                      editMode: true,
                      set: data,
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
                ? "+ Add Session"
                : subscribedPlans.includes(id)
                ? "Start Session"
                : subscribedPlans.length !== 2
                ? "Follow"
                : "Stop Following"}
            </Text>
          </TouchableOpacity>
        </View>
        {showBottomSheet ? (
          <RBSheet
            ref={bottomSheet}
            onClose={() => setShowBottomSheet(false)}
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
