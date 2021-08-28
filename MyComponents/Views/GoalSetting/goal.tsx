import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Goal as _Goal } from "../../../api/spec/AccessSpec";
import { Props } from "../../types";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Goal = ({ navigation, route }: Props) => {
  function handleGoalSetting(goal: string) {
    //TODO handle goal setting
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.title}>
          <Text
            style={{ fontSize: 28, fontWeight: "bold", paddingHorizontal: 20 }}
          >
            What is your goal?
          </Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <TouchableOpacity
          style={styles.goalCard}
          onPress={() => handleGoalSetting(_Goal.MASS_GAIN)}
        >
          <ImageBackground
            source={require("../../../MyAssets/bulkingup.jpg")}
            resizeMode="cover"
            style={styles.ImageBackground}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.goalCardContentContainer}>
              <Text style={styles.goalText}>Bulking up</Text>
              <Text style={styles.goalDescription}>
                Focus On Weight Training To Build Muscle
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goalCard}
          onPress={() => handleGoalSetting(_Goal.WEIGHT_LOSS)}
        >
          <ImageBackground
            source={require("../../../MyAssets/weighloss.jpg")}
            resizeMode="cover"
            style={styles.ImageBackground}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.goalCardContentContainer}>
              <Text style={styles.goalText}>Losing Weight</Text>
              <Text style={styles.goalDescription}>
                Focus On Cleaning Up Diet and Cardio
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goalCard}
          onPress={() => handleGoalSetting(_Goal.FITNESS_MAINTENANCE)}
        >
          <ImageBackground
            source={require("../../../MyAssets/maintainance.jpg")}
            resizeMode="cover"
            style={styles.ImageBackground}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.goalCardContentContainer}>
              <Text style={styles.goalText}>Maintenance</Text>
              <Text style={styles.goalDescription}>
                Focus On Light Exercises For Longevity
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goalCard}
          onPress={() => handleGoalSetting(_Goal.ATHLETICISM_ENHANCEMENT)}
        >
          <ImageBackground
            source={require("../../../MyAssets/athleticism.jpg")}
            resizeMode="cover"
            style={styles.ImageBackground}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.goalCardContentContainer}>
              <Text style={styles.goalText}>Athleticism</Text>
              <Text style={styles.goalDescription}>
                Focus On Improving Athletic Attributes
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    height: y * 0.08,
    backgroundColor: "rgb(241,243,245)",
    justifyContent: "center",
  },
  scroll: {
    alignItems: "center",
  },
  goalCard: {
    height: y * 0.27,
    width: x * 0.9,
    margin: 20,
    borderRadius: 20,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
  },
  goalCardContentContainer: {
    borderRadius: 20,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  getStarted: {
    backgroundColor: "rgb(217,125,84)",
    height: y * 0.08,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  goalText: {
    color: "white",
    fontSize: 35,
    marginHorizontal: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },

  goalDescription: {
    color: "rgba(255,255,255, 0.8)",
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 40,
    fontWeight: "bold",
  },

  ImageBackground: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "flex-end",
  },
});
export default Goal;
