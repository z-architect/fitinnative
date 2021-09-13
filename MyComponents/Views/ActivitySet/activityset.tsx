import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import { Switch } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ActivityStateStructure } from "../Activity/Activity";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { Props } from "../../types";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const ActivitySet = ({ navigation, route }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showgifModal, SetShowgifModal] = useState(false);
  const [Visible, SetVisible] = useState(true);
  const [ActivityValue, SetActivityValue] = useState<ActivityStateStructure>({
    id: uuidv4(),
    name: "",
    description: "",
    actionGif: "",
  });
  const [NewActivityDescription, SetNewActivityDescription] = useState("");
  const [NewActivityName, SetNewActivityName] = useState("");
  const [activities, setActivities] = useState<ActivityStateStructure[]>([
    {
      id: "10",
      name: "running",
      description: "fast paced activity of walking",
      actionGif: "ljd",
    },
    {
      id: "11",
      name: "Hopping",
      description: "fast paced activity of walking",
      actionGif: "ljl",
    },
    {
      id: "12",
      name: "Sitting",
      description: "fast paced activity of walking",
      actionGif: "llmj",
    },
    {
      id: "13",
      name: "running",
      description: "fast paced activity of walking",
      actionGif: "lwej",
    },
    {
      id: "14",
      name: "running",
      description: "fast paced activity of walking",
      actionGif: "ljrt",
    },
  ]);
  const [SelectedActivity, SetSelectedActivity] = useState("");
  const deleteActivity = (id: string) => {
    setActivities((activity) => {
      const list = activity.filter((act, i) => act.id !== id);
      return list;
    });
  };

  return (
    <>
      {/*<ActivityView*/}
      {/*  showModal={showActivityModal}*/}
      {/*  onSubmit={(activity) => {*/}
      {/*    setActivities((activities) => {*/}
      {/*      return activities.concat(activity);*/}
      {/*    });*/}
      {/*  }}*/}
      {/*  _id={ActivityValue.id}*/}
      {/*  _name={ActivityValue.name}*/}
      {/*  _description={ActivityValue.description}*/}
      {/*  _actionGif={ActivityValue.actionGif}*/}
      {/*/>*/}

      {/*<Modal isOpen={showModal} onClose={() => setShowModal(false)}>*/}
      {/*  <Modal.Content maxWidth="400px">*/}
      {/*    <Modal.CloseButton />*/}
      {/*    <Modal.Header>Activities</Modal.Header>*/}
      {/*    <Modal.Body>*/}
      {/*      {activities.map((activity, i) => (*/}
      {/*        <Activity*/}
      {/*          key={i}*/}
      {/*          data={activity}*/}
      {/*          onPress={() => {*/}
      {/*            SetActivityValue(activity);*/}
      {/*            setShowModal(false);*/}
      {/*          }}*/}
      {/*          onDeleteButtonPress={() => {*/}
      {/*            deleteActivity(activity.id);*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </Modal.Body>*/}
      {/*    <Modal.Footer>*/}
      {/*      <Button.Group variant="ghost" space={2}>*/}
      {/*        <Button*/}
      {/*          onPress={() => {*/}
      {/*            // setShowActivityModal(true);*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          + New Activity*/}
      {/*        </Button>*/}
      {/*      </Button.Group>*/}
      {/*    </Modal.Footer>*/}
      {/*  </Modal.Content>*/}
      {/*</Modal>*/}
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => {
              //createPlan();
            }}
          >
            <AntDesign name="check" size={32} color="rgb(50,71,85)" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="close" size={32} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.cardhead}>
            <View style={styles.activityGif}>
              <Text style={{ color: "rgb(217,125,84)" }}> GIF</Text>
            </View>
            <View style={styles.input}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <TextInput
                  placeholder="select something"
                  value={ActivityValue.name}
                  editable={false}
                  placeholderTextColor="black"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey",
                    color: "black",
                  }}
                  onChangeText={() => {}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyLeft}>
              <View>
                <NumericInput
                  type="up-down"
                  onChange={(value) => console.log(value)}
                  rounded
                  upDownButtonsBackgroundColor="rgb(50,71,85)"
                  iconStyle={{ color: "white" }}
                />
                <Text>Duration in Minutes</Text>
              </View>

              <View>
                <NumericInput
                  type="up-down"
                  onChange={(value) => console.log(value)}
                  rounded
                  upDownButtonsBackgroundColor="rgb(50,71,85)"
                  iconStyle={{ color: "white" }}
                />
                <Text>Repetition</Text>
              </View>
            </View>

            <View style={styles.bodyRight}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>Tempo</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ marginRight: 5 }}>Intense</Text>
                  <Switch
                    size="lg"
                    trackColor={{ true: "rgb(50,71,85)", false: "grey" }}
                  />
                  <Text style={{ marginLeft: 5 }}>Chill</Text>
                </View>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>METs</Text>
                <NumericInput
                  type="plus-minus"
                  onChange={(value) => console.log(value)}
                  textColor="black"
                  iconStyle={{ color: "white" }}
                  rounded
                  rightButtonBackgroundColor="rgb(50,71,85)"
                  leftButtonBackgroundColor="rgb(50,71,85)"
                />
                <Text>Calories Burn Rate</Text>
              </View>
            </View>
          </View>

          <View style={styles.foot}>
            <Feather name="edit" size={22} color="lightblue" />
            <TextInput
              placeholder="Description"
              placeholderTextColor="black"
              style={{ marginHorizontal: 10, fontSize: 16, color: "black" }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={{ fontSize: 28, color: "white" }}>Create Set </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(110,140,160,0.8)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    height: y * 0.55,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
  },
  cardhead: {
    flexDirection: "row",
    height: "15%",
  },
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
  body: {
    height: "65%",
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  bodyLeft: {
    justifyContent: "space-between",
    borderRightWidth: 1,
    borderRightColor: "lightgrey",
    padding: 20,
    marginVertical: 5,
  },
  bodyRight: {
    justifyContent: "space-between",
    padding: 20,
    marginLeft: 10,
    marginVertical: 5,
  },
  foot: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  footInput: {},
  activityGif: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    justifyContent: "center",
    padding: 10,
    flexGrow: 1,
    color: "black",
  },
  plusMinus: {
    flexDirection: "row",
  },
  duration: {
    width: "100%",
    backgroundColor: "lightblue",
    margin: 4,
    borderRadius: 6,
  },
  rest: {
    width: "100%",
    backgroundColor: "yellow",
    margin: 4,
    borderRadius: 6,
  },
  switch: {
    width: "80%",
  },
  met: {},
  button: {
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
  gifcontainerouter: {
    height: y * 0.5,
    alignItems: "center",
  },
  gifcontainer: {
    backgroundColor: "white",
    borderWidth: 3,
    width: "100%",
    borderColor: "rgb(50,71,85)",
    borderRadius: 20,
  },
});

export default ActivitySet;
