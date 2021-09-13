import React, { useEffect, useState } from "react";
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
import SetCard from "./setcard";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, Modal } from "native-base";
import SetSnack from "./setCardUnselected";
import SetList from "./SetList";
import { SetStateStructure } from "../ActivitySet/setedit";

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
  const [sets, setSets] = useState<SetStateStructure[]>([
    // {
    //   id: "1",
    //   order: 1,
    //   name: "pushups",
    //   duration: "4 min",
    // },
    // {
    //   id: "2",
    //   order: 2,
    //   name: "Situps",
    //   duration: "4 min",
    // },
  ]);
  const [unselectedSets, setUnselectedSets] = useState([]);

  const createSet = () => {};

  const addSet = (set: any) => {
    setSets((Sets) => {
      return Sets.concat({ ...set, order: Sets.length + 1 });
    });
  };
  const removeSet = (id: string, order: number) => {
    setSets((sets) => {
      return sets.filter((item, j) => item.id !== id || item.order !== order);
    });
  };
  const deleteUnselectedSet = (id: string) => {
    setUnselectedSets((sets) => {
      return sets.filter((item, j) => item.id !== id);
    });
  };

  useEffect(() => {}, []);
  return (
    <>
      {/*<Modal isOpen={showModal} onClose={() => setShowModal(false)}>*/}
      {/*  <Modal.Content maxWidth="400px">*/}
      {/*    <Modal.CloseButton />*/}
      {/*    <Modal.Header>Sets</Modal.Header>*/}
      {/*    <Modal.Body>*/}
      {/*      {unselectedSets.map((data, i) => (*/}
      {/*        <SetSnack*/}
      {/*          key={i}*/}
      {/*          set={data}*/}
      {/*          onTouch={(id: string) => addSet(id)}*/}
      {/*          deleteSet={(id: string) => deleteUnselectedSet(id)}*/}
      {/*          editSet={(id: string) => {*/}
      {/*            setShowModal(false);*/}
      {/*            navigation.navigate("SetEdit", { editMode: true, data });*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </Modal.Body>*/}
      {/*    <Modal.Footer>*/}
      {/*      <Button.Group variant="ghost" space={2}>*/}
      {/*        <Button*/}
      {/*          onPress={() => {*/}
      {/*            navigation.navigate("Set", { createMode: true });*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          + New Set*/}
      {/*        </Button>*/}
      {/*      </Button.Group>*/}
      {/*    </Modal.Footer>*/}
      {/*  </Modal.Content>*/}
      {/*</Modal>*/}

      {showModal ? (
        <SetList
          showModal={showModal}
          setShowModal={setShowModal}
          navigation={navigation}
          route={route}
          selectedSets={sets}
          setSelectedSets={setSets}
        />
      ) : null}
      <View style={styles.container}>
        {/* <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.image}>
                    <View >
                        <Text style={{ fontSize: 26, fontWeight: "bold", color: "black" }}> Pilipino Curry</Text>
                        <Text> 380 Kcal</Text>
                    </View>
                </ImageBackground> */}
        {!showModal ? (
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
        ) : null}

        <View style={styles.Sessionimage}>
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
          {sets.length === 0 ? (
            <Text>Sorry , you haven't added any sets yet</Text>
          ) : (
            sets.map((data, i) => (
              <SetCard
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
        {!showModal ? (
          <TouchableOpacity
            style={styles.addbutton}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <View>
              <Text> Add Set</Text>
            </View>
          </TouchableOpacity>
        ) : null}
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
  Sessionimage: {
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

  addbutton: {
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
  imagetext: {
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
