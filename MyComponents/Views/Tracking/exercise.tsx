import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import Fontawesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SetStateStructure } from "../ActivitySet/setedit";
import { Asset } from "react-native-image-picker";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Exercise = () => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [sets, setSets] = useState<SetStateStructure[]>([
    {
      id: "",
      met: 23,
      duration: 56,
      reps: 4,
      forReps: true,
      activity: { id: "18", actionGif: "bvj", name: "ghj", description: "" },
      createdBy: "",
    },
  ]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [image, setImage] = useState<Asset>();

  function handlePrevious() {
    if (sets.length && currentSetIndex > 0)
      setCurrentSetIndex(currentSetIndex - 1);
  }

  function handleNext() {
    if (sets.length && currentSetIndex > sets.length - 2)
      setCurrentSetIndex(currentSetIndex - 1);
  }

  function handlePausePlay() {}

  useEffect(() => console.log(currentSetIndex < sets.length - 1), []);

  return (
    <ImageBackground
      source={
        !!image ? image : require("../../../MyAssets/backgroundimage2.png")
      }
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.head}>
        <TouchableOpacity>
          <MaterialIcons name="navigate-before" size={40} color="white" />
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 16 }}>CURRENT ACTIVITY</Text>

        <TouchableOpacity>
          <MaterialIcons name="info-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.gifCircle} />

        <View style={styles.sessionNameContainer}>
          <Text style={styles.sessionName}>Medicine-ball Push-up </Text>
        </View>

        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <View style={styles.innerMostCircle}>
              <Text style={{ color: "white", fontSize: 50 }}>2:30</Text>
              <Text style={{ color: "white", fontSize: 22 }}>__</Text>
              <Text style={{ color: "white", fontSize: 20 }}>Minutes</Text>
            </View>
          </View>
        </View>

        <View style={styles.upcomingContainer}>
          <Text
            style={{
              color: "white",
              marginVertical: 5,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            UP COMING
          </Text>
          <Text
            style={{
              color: "white",
              marginVertical: 5,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            TRX Body-Row
          </Text>
          <Text style={{ color: "white", marginVertical: 5, fontSize: 20 }}>
            Pistol Squats
          </Text>
          <Text style={{ color: "white", marginVertical: 5, fontSize: 18 }}>
            Bicycles
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity onPress={() => handlePrevious()}>
            <MaterialIcons
              name="skip-previous"
              size={38}
              color={currentSetIndex > 0 ? "white" : "transparent"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playPause}
            onPress={() => handlePausePlay()}
          >
            <Fontawesome name="pause" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNext()}>
            <MaterialIcons
              name="skip-next"
              size={38}
              color={
                sets.length > 0 && currentSetIndex >= sets.length - 1
                  ? "white"
                  : "transparent"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    height: y,
    width: x,
    backgroundColor: "pink",
    justifyContent: "space-between",
  },
  head: {
    height: y * 0.1,
    width: x,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  sessionNameContainer: {
    marginVertical: 15,
  },
  contentContainer: {
    alignItems: "center",
  },
  gifCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  sessionName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  innerMostCircle: {
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    height: y * 0.23,
    width: y * 0.23,
    borderRadius: y * 0.23 * 0.5,
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
    height: y * 0.26,
    width: y * 0.26,
    borderRadius: y * 0.26 * 0.5,
    borderWidth: 4,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: "white",
  },
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
    height: y * 0.29,
    width: y * 0.29,
    borderRadius: y * 0.29 * 0.5,
    borderWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "orange",
  },
  upcomingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  playPause: {
    backgroundColor: "rgba(255,255,255,0.5)",
    height: 60,
    width: 60,
    borderRadius: 40,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Exercise;
