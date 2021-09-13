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
import AntDesign from "react-native-vector-icons/AntDesign";
import { Input } from "native-base";
import SessionCard from "./sessioncardvariant";
import { Props } from "../../types";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const SessionMeta = {
  name: "Plyometrics",
  id: "12",
};
const CurrentPlan = ({ navigation, route }: Props) => {
  const [Current, setCurrent] = useState(true);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../MyAssets/runninman.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.planimagetext}>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "black" }}>
            {" "}
            Pilipino Curry
          </Text>
          <Text> 380 Kcal</Text>
        </View>
      </ImageBackground>
      <View>
        <Text style={styles.textheader}> Schedule </Text>
        <ScrollView
          style={styles.dayscontainer}
          contentContainerStyle={styles.dayscontainerinner}
          horizontal={true}
        >
          <View style={[styles.daybox, styles.daycurrentbox]}>
            <Text style={styles.dayicon}>
              <AntDesign name="check" size={20} color="white" />
            </Text>
            <Text style={styles.dayno}>1</Text>
            <Text style={styles.daytext}>Auguest 20</Text>
          </View>

          <View style={styles.daybox}>
            <Text style={styles.dayicon}>
              <AntDesign name="check" size={20} color="white" />
            </Text>
            <Text style={styles.dayno}>1</Text>
            <Text style={styles.daytext}>Auguest 20</Text>
          </View>

          <View style={styles.daybox}>
            <Text style={styles.dayicon}>
              <AntDesign name="check" size={20} color="white" />
            </Text>
            <Text style={styles.dayno}>1</Text>
            <Text style={styles.daytext}>Auguest 20</Text>
          </View>

          <View style={styles.daybox}>
            <Text style={styles.dayicon}>
              <AntDesign name="check" size={20} color="white" />
            </Text>
            <Text style={styles.dayno}>1</Text>
            <Text style={styles.daytext}>Auguest 20</Text>
          </View>
        </ScrollView>
      </View>
      <View>
        <View style={styles.textContainer}>
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Day 3 of 9
          </Text>

          <Text>On Track</Text>
        </View>
        <View style={styles.session}>
          <SessionCard sessionMeta={SessionMeta} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.sessionbutton}
        onPress={() => {
          navigation.navigate("Exercise");
        }}
      >
        <View>
          <Text>Start Session</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: y,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  imageText: {},
  image: {
    height: y * 0.35,
    // backgroundColor: "pink"
  },
  planimagetext: {},
  textheader: {
    margin: 10,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  dayscontainer: {
    height: y * 0.25,
    flexGrow: 0,
    width: x,
    // borderWidth: 1,
    // backgroundColor: "yellow"
  },
  dayscontainerinner: {
    alignItems: "center",
  },
  daybox: {
    height: y * 0.18,
    width: 140,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(51,72,86)",
    marginHorizontal: 1,
  },
  daycurrentbox: {
    // backgroundColor: "pink",
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
  dayicon: {
    alignSelf: "flex-end",
  },

  dayno: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  daytext: {
    color: "white",
    marginBottom: 8,
  },
  textContainer: {
    paddingHorizontal: 15,
    width: x,
    height: y * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  session: {
    marginHorizontal: 20,
  },

  sessionbutton: {
    width: "50%",
    height: 60,
    marginHorizontal: "25%",
    marginVertical: 10,
    borderRadius: 32,
    backgroundColor: "rgb(110,140,160)",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CurrentPlan;
