import Onboard from "react-native-onboarding-swiper";
import React from "react";
import { View, Image, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Props } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnBoarding = ({ navigation }: Props) => {
  const completeOnBoarding = async () => {
    try {
      await AsyncStorage.setItem(
        "@hasOnboarded",
        JSON.stringify({
          hasOnboarded: true,
        })
      );
    } catch (e) {
      Alert.alert(e.message); // TODO do something else
    }
    navigation.navigate("Auth");
  };

  // TODO fix the views below
  return (
    <Onboard
      onDone={completeOnBoarding}
      onSkip={completeOnBoarding}
      pages={[
        {
          backgroundColor: "#324755",
          image: (
            <View
              style={{
                transform: [{ rotate: "45deg" }],
              }}
            >
              <AntDesign name="closesquareo" color="white" size={70} />
            </View>
          ),
          title: "Track your active life style",
          subtitle: "With a goal driven approach",
        },
        {
          backgroundColor: "rgb(217,125,84)",
          image: (
            <Image
              source={require("../../../MyAssets/pngtryout.png")}
              style={{ width: 180, height: 180 }}
            />
          ),
          title: "Plans",
          subtitle: "Create Customized Workout Plans",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../../MyAssets/undraw.png")}
              style={{ width: 180, height: 180 }}
            />
          ),
          title: "Tracking",
          subtitle: "Track your day tooday exercises in a way you see fit",
        },
      ]}
    />
  );
};

export default OnBoarding;
