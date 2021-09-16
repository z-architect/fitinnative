import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
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
import SetCard from "./setcardvariant";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { Modal, Button, Switch, TextArea } from "native-base";
import Setz from "./setCardUnselected";
import MyModal from "../Plans/deletemodal";
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import DeleteModal from "../../Utils/DeleteModal";
import { BlurView } from "@react-native-community/blur";
import SetList from "./SetList";
import { SetStateStructure } from "../ActivitySet/setedit";
import { useAppSelector } from "../../Redux/hooks";
import { v4 as uuidv4 } from "uuid";
import { instance } from "../../../api/config";
import { Plan as _Plan, Session, Upload } from "../../../api/interface";
import { UploadEntity } from "../../../api/spec";
import { FetchActivitySetsResponseSpec } from "../../../api/spec/ActivitySetSpec";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

export interface SetOrdersStateStructure {
  order: number;
  set: FetchActivitySetsResponseSpec | string;
}

const SessionView = ({ navigation, route }: Props) => {
  const focusIsHere = useIsFocused();

  const [editMode, setEditMode] = useState(!!(route.params as any)?.editMode);
  const [createMode, setCreateMode] = useState(
    !!(route.params as any).createMode
  );
  const [subscribed, setSubscribed] = useState(
    !!(route.params as any).subscribed
  );

  const [showModal, setShowModal] = useState(false);

  const chosenPlanType = useAppSelector(
    (state) => state.globals.chosenPlanType
  );

  const [id, setId] = useState((route.params as any)?.session?.id ?? uuidv4());
  const [type] = useState(
    (route.params as any)?.session?.type ?? chosenPlanType
  );
  const [totalSessionTime, setTotalSessionTime] = useState({ min: 0, sec: 0 });
  const [totalCaloriesToBurn, setTotalCaloriesToBurn] = useState(0);
  const [image, setImage] = useState(
    (route.params as any)?.session?.image ?? null
  );
  const [imageAsset, setImageAsset] = useState<Asset | null>(null);
  const [name, setName] = useState((route.params as any)?.session?.name ?? "");
  const [description, setDescription] = useState(
    (route.params as any)?.session?.description ?? ""
  );
  const [CTB, SetCTB] = useState("897");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [_private, setPrivate] = useState(
    (route.params as any)?.session?.private ?? true
  );
  const [sets, setSets] = useState<SetStateStructure[]>([]);
  const [setOrders, setSetOrders] = useState<SetOrdersStateStructure[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const measurements = useAppSelector((state) => state.measurements);

  async function handleImageUpload(asset: Asset) {
    // setImageAsset(asset);

    const result = await Upload.uploadResource([asset], UploadEntity.SESSION);
    if (result) setImage(result.data[0]);
  }

  useEffect(() => {
    let totalTime = 0;
    let totalCalories = 0;

    for (const set of sets) {
      totalTime += set?.duration;
      totalCalories += getCaloriesFromMet(set?.met || 0);
    }

    setTotalSessionTime({
      min: totalTime < 60 ? 0 : Math.floor(totalTime / 60),
      sec: totalTime < 60 ? totalTime : totalTime % 60,
    });
    setTotalCaloriesToBurn(totalCalories);
  }, [sets]);

  function getCaloriesFromMet(met: number) {
    return (
      (met *
        3.5 *
        (measurements.measurements[measurements.currentMeasurement].mass ||
          55)) /
      200
    );
  }

  function removeSet(id: string) {
    setSets((sets) => {
      return sets.filter((item, j) => item.id !== id);
    });
  }

  async function handleCreateSession() {
    const sessionData: any = {
      id,
      description,
      setOrders,
      name,
      image,
      private: _private,
      type,
    };

    if (!!image) {
      sessionData.image = typeof image === "string" ? image : image.id;
    }

    const result = await Session.createSession(sessionData);
    if (!!result?.data) {
      console.log("CREATE SUCCESS");
    }

    navigation.goBack();
  }

  async function handleDelete() {
    setShowDeleteModal(false);
    const result = await Session.removeSession({ id });

    if (result) navigation.goBack();
  }

  async function handleUpdate() {
    console.log({ sessionId: id });

    const result = await Session.updateSession({
      id,
      name,
      description,
      setOrders,
    });

    if (!!result?.data) {
      setId(result.data);
    }

    if (!(route.params as any).editMode) setEditMode(false);
    else navigation.goBack();
  }

  async function fetchSetOrders() {
    const result = await Session.fetchSetOrders({ id });

    if (!!result?.data) {
      const _sets: any = [];
      result.data?.setOrders?.forEach((order) => {
        _sets[order.order - 1] = order.set;
      });

      setSets(_sets);
    }
  }

  useEffect(() => {
    setSetOrders(
      sets.map((set, index) => {
        return {
          order: index + 1,
          set: set.id,
        };
      })
    );
  }, [sets]);

  useEffect(() => {
    if (focusIsHere) {
      void fetchSetOrders();
    }
  }, [focusIsHere]);

  useEffect(() => {
    console.log({ inEffectSessionId: id });
  }, [focusIsHere]);

  return (
    <>
      {showModal ? (
        <SetList
          showModal={showModal}
          setShowModal={setShowModal}
          navigation={navigation}
          route={route}
          selectedSets={sets as SetStateStructure[]}
          setSelectedSets={setSets as (sets: SetStateStructure[]) => void}
        />
      ) : null}
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onDelete={() => void handleDelete()}
        prompt={"Do you really want to delete this session?"}
      />

      <View style={styles.container}>
        <View style={styles.head}>
          {/*<TouchableOpacity*/}
          {/*  onPress={() => {*/}
          {/*    navigation.goBack();*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <MaterialIcons name="navigate-before" size={40} color="black" />*/}
          {/*</TouchableOpacity>*/}

          {/*<View*/}
          {/*  style={{*/}
          {/*    flexDirection: "row",*/}
          {/*    justifyContent: "space-around",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <TouchableOpacity*/}
          {/*    onPress={() => {*/}
          {/*      setShowDeleteModal(true);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <MaterialIcons name="delete" size={32} color="black" />*/}
          {/*  </TouchableOpacity>*/}

          {/*  {!editMode && !createMode ? (*/}
          {/*    <TouchableOpacity*/}
          {/*      style={{ marginLeft: 20 }}*/}
          {/*      onPress={() => {*/}
          {/*        // navigation.navigate("SessionEdit");*/}
          {/*        setEditMode(true);*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <MaterialIcons name="edit" size={32} color="black" />*/}
          {/*    </TouchableOpacity>*/}
          {/*  ) : !createMode ? (*/}
          {/*    <TouchableOpacity*/}
          {/*      style={{ marginLeft: 20 }}*/}
          {/*      onPress={() => {*/}
          {/*        setEditMode(false);*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <MaterialIcons name="close" size={32} color="black" />*/}
          {/*    </TouchableOpacity>*/}
          {/*  ) : null}*/}
          {/*</View>*/}
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
                void handleCreateSession();
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
          <View style={styles.sessionImage}>
            <ImageBackground
              source={
                !!image
                  ? {
                      uri: `${instance.defaults.baseURL}/upload/${
                        typeof image === "string" ? image : image.id
                      }`,
                    }
                  : { uri: "no-image" }
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
              {/*<>
                  <BlurView
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: y * 0.3,
                    }}
                    overlayColor={"transparent"}
                    blurType="dark"
                    blurAmount={1}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      paddingHorizontal: 20,
                      justifyContent: "flex-end",
                      flex: 1,
                      backgroundColor: "rgba(0,0,0, 0.1)",
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
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 40,
                      paddingBottom: 20,
                      width: "100%",
                      backgroundColor: "rgba(0,0,0, 0.1)",
                    }}
                  >
                    <TextInput
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 32,
                        borderBottomWidth: 1,
                        borderColor: "white",
                      }}
                      value={name}
                      onChangeText={(value) => setName(value)}
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
                  </View>
                </>*/}
              {editMode && !(route.params as any)?.editMode ? (
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
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  {!editMode && !createMode ? (
                    <Text
                      style={[
                        {
                          fontSize: 28,
                          color: "white",
                          textAlign: "center",
                          paddingHorizontal: 20,
                          paddingBottom: 5,
                        },
                      ]}
                    >
                      {name}
                    </Text>
                  ) : (
                    <TextInput
                      style={[
                        {
                          fontSize: 28,
                          color: "white",
                          textAlign: "center",
                          paddingHorizontal: 20,
                          paddingBottom: 5,
                          borderBottomWidth: 1,
                          borderColor: "white",
                        },
                      ]}
                      autoFocus={true}
                      value={name}
                      placeholder={"Exercise name"}
                      onChangeText={(value) => setName(value)}
                    />
                  )}
                  {/*{description ? (*/}
                  {/*  <Text*/}
                  {/*    style={[*/}
                  {/*      {*/}
                  {/*        textAlign: "center",*/}
                  {/*        color: "white",*/}
                  {/*        fontSize: 18,*/}
                  {/*        paddingHorizontal: 20,*/}
                  {/*      },*/}
                  {/*    ]}*/}
                  {/*  >*/}
                  {/*    {description}*/}
                  {/*  </Text>*/}
                  {/*) : null}*/}
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      padding: 20,
                      paddingBottom: 35,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialIcons name="av-timer" size={16} color="white" />
                      <Text
                        style={[
                          styles.input,
                          { fontSize: 16, color: "rgba(255,255,255,0.9)" },
                        ]}
                      >
                        {totalSessionTime.min > 0 || totalSessionTime.sec > 0
                          ? `${
                              totalSessionTime.min > 0
                                ? ` ${
                                    totalSessionTime.min > 0
                                      ? totalSessionTime.min
                                      : 0
                                  } min`
                                : ``
                            }${
                              totalSessionTime.sec > 0
                                ? ` ${totalSessionTime.sec} sec`
                                : ``
                            }`
                          : ` 0 min`}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialIcons name="whatshot" size={16} color="white" />
                      <Text
                        style={[
                          styles.input,
                          { fontSize: 16, color: "rgba(255,255,255,0.9)" },
                        ]}
                      >{` ${totalCaloriesToBurn} kcal`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialIcons
                        name="directions-run"
                        size={16}
                        color="white"
                      />
                      <Text
                        style={[
                          styles.input,
                          { fontSize: 16, color: "rgba(255,255,255,0.9)" },
                        ]}
                      >{` ${sets.length} sets`}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <ScrollView style={styles.sessionContainer}>
            {sets.length === 0 ? (
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
              sets.map((data, i) => (
                <SetCard
                  key={data.id}
                  // onDragStart={(e) => handleDragStart(e, index)}
                  // onDragEnter={(e) => handleDragEnter(e, index)}
                  // onDragEnd={handleDragEnd}
                  set={data}
                  editMode={editMode}
                  createMode={createMode}
                  scrollEnabled={scrollEnabled}
                  setScrollEnabled={setScrollEnabled}
                  onSelect={() => {
                    navigation.navigate("Set", { set: data });
                  }}
                  onEdit={() => {
                    navigation.navigate("Set", {
                      editMode: true,
                      set: data,
                    });
                  }}
                  onDelete={(id: string) => {
                    removeSet(id);
                  }}
                  setcolor="orange"
                />
              ))
            )}
          </ScrollView>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={!(editMode || createMode) && !sets.length}
            onPress={() => {
              if (editMode || createMode) setShowModal(true);
              else
                navigation.navigate("Exercise", {
                  /*TODO*/
                  session: { id, name, description, totalSessionTime, type },
                  sets,
                });
            }}
            style={[
              styles.button,
              {
                borderColor:
                  editMode || createMode || sets.length
                    ? "white"
                    : "rgba(255,255,255, 0.6)",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                color:
                  editMode || createMode || sets.length
                    ? "white"
                    : "rgba(255,255,255, 0.6)",
              }}
            >
              {createMode || editMode
                ? "+ Add Set"
                : !(route.params as any)?.subscribed
                ? "Start Session"
                : "Track Session"}
            </Text>
          </TouchableOpacity>
        </View>
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
  sessionImage: {
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
    paddingBottom: 125,
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
    bottom: 25,
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
});
export default SessionView;
