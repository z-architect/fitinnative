import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useEffect } from "react";
import NumericInput from "react-native-numeric-input";
import { Modal, Button, Switch } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import Axios from "axios";
import Meal from "./meal";
import { GifSearch } from "react-native-gif-search";
import { Props } from "../../types";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const MealConstituentEdit = ({ navigation, route }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [showgifModal, SetShowgifModal] = useState(false);
  const [Visible, SetVisible] = useState(true);
  const [Description, SetDescription] = useState(
    "this is a set intended to make you lots of pushups"
  );
  const [Meal, SetMeal] = useState("PushUps");
  const [Repetition, SetRepitition] = useState(10);
  const [Duration, SetDuration] = useState(4);
  const [Tempo, SetTempo] = useState(false);
  const [Met, SetMet] = useState(18);

  return (
    <>
      <Modal
        isOpen={showgifModal}
        onClose={() => {
          SetShowgifModal(false);
          SetVisible(false);
        }}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>GIF Selection</Modal.Header>
          <Modal.Body>
            <View style={styles.gifContainerRouter}>
              <GifSearch
                style={styles.gifContainer}
                giphyApiKey={"bEbcELv6yDBowe2xR9Yem24sMUQflMNR"}
                onGifSelected={(gif_url) => {
                  Alert.alert(gif_url);
                }}
                horizontal={false}
                gifsToLoad={10}
                maxGifsToLoad={25}
                visible={Visible}
                numColumns={3}
                loadingSpinnerColor={"blue"}
                placeholderTextColor={"grey"}
                placeholderText={"Search an exercise "}
                textInputStyle={{
                  fontWeight: "bold",
                  color: "black",
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                }}
                onBackPressed={() => {
                  SetVisible(false);
                  SetShowgifModal(false);
                }}
                noGifsFoundText={"No Gifs found :("}
                noGifsFoundTextStyle={{ fontWeight: "bold" }}
                onError={(error) => {
                  if (Visible) {
                    Alert.alert(error);
                  }
                }}
              />
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showMealModal} onClose={() => setShowMealModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.activityGif, { marginRight: 15 }]}></View>
            Create Meal
          </Modal.Header>
          <Modal.Body>
            <TextInput
              placeholder="Meal name ?"
              placeholderTextColor="black"
              style={{
                color: "black",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />

            <TextInput
              placeholder="Description ?"
              placeholderTextColor="black"
              style={{
                color: "black",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                SetShowgifModal(true);
                SetVisible(true);
              }}
            >
              <Text style={{ color: "white" }}>Add a GIF</Text>
            </TouchableOpacity>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                onPress={() => {
                  setShowMealModal(false);
                }}
              >
                Create
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Activities</Modal.Header>
          <Modal.Body>
            <Meal />
            <Meal />
            <Meal />
            <Meal />
            <Meal />
            <Meal />
            <Meal />
            <Meal />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                onPress={() => {
                  setShowMealModal(true);
                }}
              >
                + New Meal
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

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
          <View style={styles.cardHead}>
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
                  value={Meal}
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
                  value={Duration}
                  minValue={0}
                  onChange={(value) => SetDuration(value)}
                  rounded
                  upDownButtonsBackgroundColor="rgb(50,71,85)"
                  iconStyle={{ color: "white" }}
                />
                <Text>Duration in Minutes</Text>
              </View>

              <View>
                <NumericInput
                  type="up-down"
                  value={Repetition}
                  minValue={0}
                  onChange={(value) => SetRepitition(value)}
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
                    value={Tempo}
                    onValueChange={() => {
                      SetTempo(!Tempo);
                    }}
                    trackColor={{ true: "rgb(50,71,85)", false: "grey" }}
                  />
                  <Text style={{ marginLeft: 5 }}>Chill</Text>
                </View>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>METs</Text>
                <NumericInput
                  type="plus-minus"
                  value={Met}
                  minValue={0}
                  onChange={(value) => SetMet(value)}
                  textColor="black"
                  iconStyle={{ color: "white" }}
                  rounded
                  rightButtonBackgroundColor="rgb(50,71,85)"
                  leftButtonBackgroundColor="rgb(50,71,85)"
                />
                <Text style={{ color: "rgb(217,125,84)" }}>
                  Calories Burn Rate
                </Text>
              </View>
            </View>

            {/* <View style={styles.plusminus}>



            </View>
            <View style={styles.switch}>
              <View style={styles.duration}><Text>SOmething</Text></View>
              <View style={styles.rest}><Text>Again</Text></View>
            </View> */}
          </View>

          <View style={styles.foot}>
            <Feather name="edit" size={22} color="lightblue" />
            <TextInput
              placeholder="Description"
              value={Description}
              onChangeText={(val) => {
                SetDescription(val);
              }}
              placeholderTextColor="black"
              style={{ marginHorizontal: 10, fontSize: 16, color: "black" }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <Text style={{ fontSize: 28, color: "white" }}>Update </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(110,140,160,0.8)", //"rgb(217,125,84)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    height: y * 0.5,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
  },
  cardHead: {
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
    // backgroundColor: "pink"
    // alignItems: "center"
  },
  bodyLeft: {
    justifyContent: "space-between",
    borderRightWidth: 1,
    borderRightColor: "lightgrey",
    // backgroundColor: "pink",
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
    // borderWidth: 1,
    // borderRadius: 10
  },
  footInput: {
    // border
  },
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
    // backgroundColor: "pink",
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
    // position: "absolute",
    // bottom: 50,
    width: "60%",
    marginVertical: 20,
    marginHorizontal: "20%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "rgb(110,140,160)", //"rgb(50,71,85)"
  },
  gifContainerRouter: {
    height: y * 0.5,
    alignItems: "center",
  },
  gifContainer: {
    backgroundColor: "white",
    borderWidth: 3,
    width: "100%",
    borderColor: "rgb(50,71,85)",
    borderRadius: 20,
  },
});

export default MealConstituentEdit;
