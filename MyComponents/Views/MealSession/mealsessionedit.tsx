import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
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
import ConstituentCard from "./constituentCard";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { Modal, Button, Switch } from "native-base";
import Constituentz from "./constituentUnselected";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const SessionEdit = ({ navigation, route }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const [Type, SetType] = useState("Meal");
  const [Image, SetImage] = useState("jhk");
  const [Title, SetTitle] = useState("My session");
  const [Description, SetDescription] = useState(
    "The best session one can ask for"
  );
  const [CTB, SetCTB] = useState("789");
  const [Sets, SetSets] = useState([
    {
      id: "1",
      order: 1,
      name: "pushups",
      duration: "4 min",
    },
    {
      id: "2",
      order: 2,
      name: "Situps",
      duration: "4 min",
    },
  ]);
  const [UnselectedConstituents, SetUnselectedConstituents] = useState([
    {
      id: "1",
      name: "pushups",
      duration: "4 min",
    },
    {
      id: "2",
      name: "Situps",
      duration: "4 min",
    },
    {
      id: "22",
      name: "Chinups",
      duration: "2 min",
    },
    {
      id: "3",
      name: "Standups",
      duration: "8 min",
    },
    {
      id: "12",
      name: "Runups",
      duration: "10 min",
    },
  ]);
  const createSet = () => {};
  const addSet = (set: any) => {
    SetSets((Sets) => {
      let mySets = Sets.concat({ ...set, order: Sets.length + 1 });
      return mySets;
    });
  };
  const removeSet = (id: string, order: number) => {
    SetSets((sets) => {
      const list = sets.filter(
        (item, j) => item.id !== id || item.order !== order
      );
      return list;
    });
  };
  const deleteUnselectedSet = (id: string) => {
    SetUnselectedConstituents((sets) => {
      const list = sets.filter((item, j) => item.id !== id);
      return list;
    });
  };
  useEffect(() => {}, []);
  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Constituents</Modal.Header>
          <Modal.Body>
            {UnselectedConstituents.map((data, i) => (
              <Constituentz
                key={i}
                data={data}
                onTouch={() => {
                  addSet(data);
                }}
                deleteSet={() => {
                  deleteUnselectedSet(data.id);
                }}
                editSet={() => {
                  setShowModal(false);
                  navigation.navigate("ConstituentEdit");
                }}
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                onPress={() => {
                  navigation.navigate("Constituent");
                }}
              >
                + New Constituent
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <View style={styles.container}>
        {/* <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.image}>
                    <View >
                        <Text style={{ fontSize: 26, fontWeight: "bold", color: "black" }}> Pilipino Curry</Text>
                        <Text> 380 Kcal</Text>
                    </View>
                </ImageBackground> */}
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => {
              createSet();
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

        <View style={styles.planImage}>
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
                  height: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="picture" size={62} color="white" />
              </TouchableOpacity>
              <View style={{ height: "60%", width: "80%" }}>
                <TextInput
                  placeholder="Title"
                  value={Title}
                  onChangeText={(val) => {
                    SetTitle(val);
                  }}
                  placeholderTextColor="white"
                  style={[styles.input, { fontWeight: "bold" }]}
                />
                <TextInput
                  placeholder="Description"
                  value={Description}
                  onChangeText={(val) => {
                    SetDescription(val);
                  }}
                  placeholderTextColor="white"
                  style={styles.input}
                />
                <TextInput
                  placeholder="Calories to Burn"
                  value={CTB}
                  onChangeText={(val) => {
                    SetCTB(val);
                  }}
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
              <View
                style={{
                  height: "60%",
                  width: "80%",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  placeholder="Title"
                  value={Title}
                  onChangeText={(val) => {
                    SetTitle(val);
                  }}
                  placeholderTextColor="white"
                  style={[styles.input, { fontWeight: "bold" }]}
                />
                <TextInput
                  placeholder="Description"
                  value={Description}
                  onChangeText={(val) => {
                    SetDescription(val);
                  }}
                  placeholderTextColor="white"
                  style={styles.input}
                />
                <TextInput
                  placeholder="Calories to Burn"
                  value={CTB}
                  onChangeText={(val) => {
                    SetCTB(val);
                  }}
                  placeholderTextColor="white"
                  style={styles.input}
                />
              </View>
            </ImageBackground>
          )}
        </View>
        <ScrollView
          style={styles.sessionContainer}
          contentContainerStyle={{ paddingBottom: 65 }}
        >
          {Sets.length === 0 ? (
            <Text>Sorry , you haven't added any sets yet</Text>
          ) : (
            Sets.map((data, i) => (
              <ConstituentCard
                key={i}
                order={data.order}
                data={data}
                setcolor="green"
                deleteSet={() => {
                  removeSet(data.id, data.order);
                }}
              />
            ))
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <View>
            <Text> Add Set</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    height: "100%",
    backgroundColor: "rgba(110,140,160,0.4)",
    //backgroundColor: "rgb(240,243,244)"
  },
  planImage: {
    height: 300,
    //backgroundColor:"yellow"
  },
  image: {
    width: "100%",
    height: y * 0.3,
    backgroundColor: "yellow",
    justifyContent: "flex-end",
  },
  sessionContainer: {
    // borderWidth: 1,
    margin: 20,
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
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white",
    fontSize: 22,
  },
  imageText: {
    color: "white",
    fontSize: 38,
    margin: 20,
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
});
export default SessionEdit;
