import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Props } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Access } from "../../../api/interface";

const LandingPage = ({ navigation }: Props) => {
  const getData = async () => {
    try {
      const { hasOnboarded } = JSON.parse(
        (await AsyncStorage.getItem("@hasOnboarded")) as string
      );

      if (!hasOnboarded) navigation.navigate("Onboarding");
      else navigation.navigate("Auth");
    } catch (err) {
      Alert.alert(err.message); // TODO do something else
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          void getData();
        }}
      >
        <View style={styles.landingImage}>
          <ImageBackground
            source={require("../../../MyAssets/colton.jpg")}
            resizeMode="cover"
            style={styles.landingImageBackground}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 60,
              }}
            >
              <View
                style={{
                  transform: [{ rotate: "45deg" }],
                }}
              >
                <AntDesign name="closesquareo" color="white" size={70} />
              </View>
              <Text style={styles.landingImageText}>Fit In</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.lowerTextContainer}>
          <View style={styles.innerLowerTextContainer}>
            <Text style={styles.bigText}>Track Your Active Life Style</Text>
            <Text style={{ color: "white", fontSize: 40 }}>___</Text>
            <Text style={styles.smallText}>With a goal driven approach</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(50,71,85)",
  },
  landingImage: {
    height: "65%",
  },
  landingImageBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  landingImageText: {
    fontSize: 90,
    color: "white",
  },
  bigText: {
    fontSize: 38,
    color: "white",
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 20,
    color: "white",
  },
  lowerTextContainer: {
    height: "35%",
    paddingHorizontal: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerLowerTextContainer: {
    // borderWidth: 2,
    // borderColor: "red"
  },
});
export default LandingPage;
