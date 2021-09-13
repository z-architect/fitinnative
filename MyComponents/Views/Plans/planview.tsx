import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import SessionCard from "./sessioncardvarianttwo";
import { Props } from "../../types";
import { Input, Checkbox, Switch, Radio, Modal } from "native-base";
import Axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import MyModal from "./deletemodal";
import { Difficulty } from "../../../api/spec";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const mydays = new Array(30).fill({
  isSet: false,
  filledBy: "",
});

const Calander = (props: any) => {
  return (
    <View style={styles.calander}>
      <View style={styles.calanderheader}>
        <AntDesign name="left" size={24} color="white" />
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {" "}
          Augest{" "}
        </Text>
        <AntDesign name="right" size={24} color="white" />
      </View>
      <View style={styles.calanderheadertwo}>
        <MaterialCommunityIcons name="calendar-today" size={30} color="black" />
        <Text>Today</Text>
        <Entypo name="plus" size={30} color="black" />
      </View>
      <View style={styles.calanderbody}>
        {myarray.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.day,
              { backgroundColor: props.Days[i].isSet ? "grey" : "white" },
            ]}
            onPress={() => {
              props.openDaySession(i);
            }}
          >
            <View>
              <Text style={{ color: props.Days[i].isSet ? "white" : "black" }}>
                {i + 1}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const myarray = new Array(30).fill(7);
const SessionMeta = {
  name: "Plyometrics",
  id: "12",
};
const PlanView = ({ navigation, route }: Props) => {
  let userId = 78;

  const [Image, SetImage] = useState("");
  const [Title, SetTitle] = useState("");
  const [Description, SetDescription] = useState("");

  const [Type, SetType] = useState("");
  const [Difficulty, SetDifficulty] = useState("");
  const [Category, SetCategory] = useState("");

  const [Sessions, SetSessions] = useState([
    {
      name: "Hoping",
      id: "21",
    },
    {
      name: "Jumping",
      id: "23",
    },
    {
      name: "Running",
      id: "7",
    },
  ]);

  const [Days, setDays] = useState(mydays);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [DaySession, SetDaySession] = useState(false);
  const [SelectedDay, SetSelectedDay] = useState<number>(-1);
  const [SelectedDaySession, SetSelectedDaySession] = useState("");
  useEffect(() => {
    let dataz = new Array(30).fill({
      isSet: false,
      filledBy: "",
    });
    dataz[1] = {
      isSet: true,
      filledBy: "7",
    };
    dataz[5] = {
      isSet: true,
      filledBy: "7",
    };
    dataz[9] = {
      isSet: true,
      filledBy: "7",
    };
    dataz[13] = {
      isSet: true,
      filledBy: "7",
    };
    dataz[17] = {
      isSet: true,
      filledBy: "7",
    };
    dataz[21] = {
      isSet: true,
      filledBy: "7",
    };
    dataz[25] = {
      isSet: true,
      filledBy: "7",
    };

    dataz[5]["isSet"] = true;
    dataz[5]["filledBy"] = "21";
    dataz[9]["isSet"] = true;
    dataz[9]["filledBy"] = "23";
    dataz[13]["isSet"] = true;
    dataz[13]["filledBy"] = "21";
    dataz[17]["isSet"] = true;
    dataz[17]["filledBy"] = "23";
    dataz[21]["isSet"] = true;
    dataz[21]["filledBy"] = "21";
    dataz[25]["isSet"] = true;
    dataz[25]["filledBy"] = "23";
    setDays(dataz);

    SetImage("//lkjlk");
    SetTitle("My plan");
    SetDescription("a plan for all the athletes");

    SetType("Workout");
    SetDifficulty("Easy");
    SetCategory("Losing_Weight");
  }, []);

  const deletePlan = () => {};

  const displaySession = (day: number) => {
    if (Days[day].isSet) {
      SetSelectedDay(day);
      SetSelectedDaySession(Days[day].filledBy);
      SetDaySession(true);
    }
  };
  return (
    <>
      <MyModal DeleteModal={DeleteModal} setDeleteModal={setDeleteModal} />
      <Modal isOpen={DaySession} onClose={() => SetDaySession(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Day {SelectedDay} of 30</Text>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            {SelectedDay === -1 ? (
              <Text>Tough luck ! somethign is wrong</Text>
            ) : (
              <SessionCard
                sessionMeta={Sessions.find(
                  (session, i) => session.id === SelectedDaySession
                )}
                onSessionSelect={() => {
                  SetDaySession(false);
                  navigation.navigate("SessionView");
                }}
              />
            )}
            <TouchableOpacity
              style={styles.modalbutton}
              onPress={() => {
                SetDaySession(false);
                SetSelectedDay(-1);
              }}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="left" size={32} color="rgb(50,71,85)" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "30%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setDeleteModal(true);
              }}
              handleCalendarPress
            >
              <AntDesign name="delete" size={32} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PlanEdit");
              }}
            >
              <AntDesign name="edit" size={32} color="rgb(217,125,84)" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.planimage}>
          {Image === "" ? (
            <View
              style={[
                styles.image,
                {
                  backgroundColor: "lightgrey",
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "60%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="picture" size={62} color="white" />
              </TouchableOpacity>
              <View style={{ height: "40%", width: "80%" }}>
                <TextInput
                  placeholder="Title"
                  placeholderTextColor="white"
                  style={[styles.input, { fontWeight: "bold" }]}
                />
                <TextInput
                  placeholder="Description"
                  placeholderTextColor="white"
                  style={styles.input}
                />
              </View>
            </View>
          ) : (
            <ImageBackground
              source={require("../../../MyAssets/runninman.jpg")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.imagetext}>Cardio</Text>
              <View
                style={{
                  height: "60%",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={[
                    {
                      color: "white",
                      fontSize: 22,
                      marginVertical: 15,
                      fontWeight: "bold",
                      paddingLeft: 15,
                    },
                  ]}
                >
                  {Description}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      borderLeftColor: "white",
                      color: "white",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    {"\u2B24"} {Type}
                  </Text>
                  <Text
                    style={{
                      borderLeftColor: "white",
                      color: "white",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    {"\u2B24"} {Category}
                  </Text>
                  <Text
                    style={{
                      borderLeftColor: "white",
                      color: "white",
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    {"\u2B24"} {Difficulty}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          )}
        </View>
        <View style={styles.sessioncontainerheader}>
          <Text style={{ fontSize: 26 }}>Sessions in the Plan</Text>
        </View>
        <View style={styles.sessioncontainerwindow}>
          <ScrollView
            style={styles.sessioncontainer}
            contentContainerStyle={styles.sessioncontainerinner}
            nestedScrollEnabled={true}
          >
            {Sessions.length > 0 ? (
              <>
                {Sessions.map((data, i) => (
                  <SessionCard
                    key={i}
                    sessionMeta={data}
                    onSessionSelect={() => {
                      navigation.navigate("SessionView");
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                <Text>There aren't any sessions created yet!!!</Text>
              </>
            )}
          </ScrollView>
        </View>

        <View style={styles.calandertitle}>
          <Text style={{ fontSize: 26 }}>Plan Calander</Text>
        </View>
        <Calander Days={Days} openDaySession={displaySession} />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  main: {},
  head: {
    height: y * 0.1,
    width: x,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  container: {
    backgroundColor: "rgb(242,243,244)",
    borderWidth: 2,
  },
  planimage: {
    height: 300,
  },
  imagetext: {
    color: "white",
    fontSize: 38,
    margin: 20,
  },
  planmetacontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  sessioncontainer: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 250,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    // shadowColor: "black",
    // shadowRadius: 3.0,
    // shadowOpacity: 0.5,

    // elevation: 3
    // borderWidth:1
  },
  sessioncontainerinner: {
    // backgroundColor:"pink"
  },
  sessioncontainerheader: {
    // backgroundColor:"pink",
    padding: 10,
    margin: 10,
  },
  sessioncontainerwindow: {
    height: 400,
  },
  calandertitle: {
    //backgroundColor:"pink",
    padding: 10,

    margin: 10,
  },
  calanderheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(50,71,85)",
    height: 60,
    alignItems: "center",
  },
  calanderheadertwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 60,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  calanderbody: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "98%",
    marginHorizontal: "1%",
  },
  calander: {
    height: 420,
  },
  day: {
    height: 60,
    width: "14%",
    padding: 5,
    backgroundColor: "rgb(200,200,200)",
    justifyContent: "center",
    alignItems: "center",
  },
  sessionbutton: {
    width: "50%",
    height: 60,
    marginHorizontal: "25%",
    marginVertical: 10,
    borderRadius: 32,
    backgroundColor: "rgb(110,140,160)",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: 22,
  },
  modalbutton: {
    width: "60%",
    marginVertical: 20,
    marginHorizontal: "20%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "rgb(110,140,160)",
  },
});
export default PlanView;
