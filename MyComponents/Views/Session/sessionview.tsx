import { NavigationContainer } from "@react-navigation/native";
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

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const SessionView = ({ navigation, route }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [type] = useState("Meal");
  const [totalSessionTime, setTotalSessionTime] = useState({ min: 0, sec: 0 });
  const [totalCaloriesToBurn, setTotalCaloriesToBurn] = useState(0);
  const [image, setImage] = useState<Asset>();
  const [name, setName] = useState("Enhance Balance");
  const [description, setDescription] = useState(
    "The best session one can ask for."
  );
  const [CTB, SetCTB] = useState("897");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sets, setSets] = useState<SetStateStructure[]>([
    {
      id: "1",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "2",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "3",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "4",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "5",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "6",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "7",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "8",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "9",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "10",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "11",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
    {
      id: "12",
      duration: 4,
      met: 0,
      reps: 0,
      activity: {
        id: "1",
        name: "karate",
        description: "fancy",
      },
      createdBy: "",
    },
  ]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const measurements = useAppSelector((state) => state.measurements);

  useEffect(() => {
    let totalTime = 0;
    let totalCalories = 0;

    for (const set of sets) {
      console.log({ met: set.met });

      totalTime += set.duration;
      totalCalories += getCaloriesFromMet(set.met || 0);
    }

    setTotalSessionTime({
      min: totalTime < 60 ? 0 : Math.floor(totalTime / 60),
      sec: totalTime < 60 ? totalTime : totalTime % 60,
    });
    setTotalCaloriesToBurn(totalCalories);
  }, [sets]);

  function getCaloriesFromMet(met: number) {
    // TODO

    console.log(measurements.measurements[measurements.currentMeasurement]);

    return (
      (met *
        3.5 *
        (measurements.measurements[measurements.currentMeasurement] || 55)) /
      200
    );
  }

  const removeSet = (id: string) => {
    setSets((sets) => {
      return sets.filter((item, j) => item.id !== id);
    });
  };

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
        onDelete={() => {
          setShowDeleteModal(false);
        }}
        prompt={"Do you really want to delete this session?"}
      />

      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="navigate-before" size={40} color="black" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowDeleteModal(true);
              }}
            >
              <MaterialIcons name="delete" size={32} color="black" />
            </TouchableOpacity>

            {!editMode && !createMode ? (
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => {
                  // navigation.navigate("SessionEdit");
                  setEditMode(true);
                }}
              >
                <MaterialIcons name="edit" size={32} color="black" />
              </TouchableOpacity>
            ) : !createMode ? (
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => {
                  setEditMode(false);
                }}
              >
                <MaterialIcons name="close" size={32} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <ScrollView scrollEnabled={scrollEnabled}>
          <View style={styles.sessionImage}>
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
                      >{`${
                        totalSessionTime.min > 0
                          ? ` ${totalSessionTime.min} min`
                          : ``
                      }${
                        totalSessionTime.sec > 0
                          ? ` ${totalSessionTime.sec} sec`
                          : ``
                      }`}</Text>
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
              <Text>Sorry , you haven't added any sets yet</Text>
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
                    navigation.navigate("Set");
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
