import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Input } from "native-base";

import NumericInput from "react-native-numeric-input";
import { Props } from "../../types";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useAppSelector } from "../../Redux/hooks";
import { Tracking } from "../../../api/interface/Tracking";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const DailyGoals = ({ route, navigation }: Props) => {
  const [water, setWater] = useState(route?.params?.waterIntake);
  const [value, setValue] = useState(0);

  const dailyGlassesOfWater = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user
        .dailyGlassesOfWater
  );
  const dailyHoursOfSleep = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user
        .dailyHoursOfSleep
  );

  async function handleTrack() {
    const data: any = {};

    if (value) {
      if (water) data.glassesOfWater = value;
      else data.hoursOfSleep = value;
      await Tracking.recordEngagement({ ...data });
    }

    navigation.pop();
  }

  return (
    <>
      <View style={styles.titleContainer}>
        <>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <AntDesign name={"left"} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <TouchableOpacity onPress={() => handleTrack()}>
              <AntDesign color="green" size={32} name="check" />
            </TouchableOpacity>
          </TouchableOpacity>
        </>
      </View>

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{ marginBottom: 20 }}>
            <IonIcons
              name={water ? "water-outline" : "bed-outline"}
              color="black"
              size={200}
            />
            <View>
              <Text style={{ color: "teal", fontSize: 16 }}>
                Your Goal is{" "}
                {water
                  ? `${dailyGlassesOfWater ?? 0} Glasses Per Day`
                  : `${dailyHoursOfSleep} hours of rest`}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {water ? "Glasses of Water" : "Hours of Sleep"}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <NumericInput
                type="plus-minus"
                onChange={(value) => setValue(value)}
                value={value}
                totalWidth={210}
                totalHeight={80}
                textColor="black"
                iconStyle={{ color: "white" }}
                minValue={0}
                maxValue={16}
                rounded
                rightButtonBackgroundColor="rgb(50,71,85)"
                leftButtonBackgroundColor="rgb(50,71,85)"
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: y,
    width: x,
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    marginVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerContainer: {
    height: 0.8 * y,
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default DailyGoals;
