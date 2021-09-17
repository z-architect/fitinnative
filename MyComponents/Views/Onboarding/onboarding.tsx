import Onboard from "react-native-onboarding-swiper";
import React from "react";
import { View, Image, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Props } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../Redux/hooks";
import { updateHasBeenOnboarded } from "../../Redux/globalsSlice";

import Planill from "../../../MyAssets/illustration/undraw_To_do_re_jaef.svg";
import Trackill from "../../../MyAssets/illustration/undraw_fitness_stats_sht6.svg";
import Monitorkill from "../../../MyAssets/illustration/undraw_Metrics_re_6g90.svg";

const OnBoarding = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const completeOnBoarding = async () => {
    try {
      // TODO remove
      // await AsyncStorage.setItem(
      //   "@hasOnboarded",
      //   JSON.stringify({
      //     hasOnboarded: true,
      //   })
      // );

      dispatch(updateHasBeenOnboarded());
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
          backgroundColor: "#B9B0A2",
          image: <Planill style={{ width: 180, height: 180 }} />,
          title: "Track your active life style",
          subtitle: "With a goal driven approach",
        },
        {
          backgroundColor: "#6E8CA0",
          image: <Trackill style={{ width: 180, height: 180 }} />,
          title: "Plans",
          subtitle: "Create Customized Workout Plans",
        },
        {
          backgroundColor: "#87BCBF",
          image: <Monitorkill style={{ width: 180, height: 180 }} />,
          title: "Tracking",
          subtitle: "Track your day tooday exercises in a way you see fit",
        },
      ]}
    />
  );
};

export default OnBoarding;
