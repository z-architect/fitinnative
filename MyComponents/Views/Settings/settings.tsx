import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Switch,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Input } from "native-base";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Settings = () => {
  //const [SelectedValue, SetSelectedValue] = useState("Dark")
  const [Val1, SetVal1] = useState(true);
  const [Val2, SetVal2] = useState(false);
  const [Val3, SetVal3] = useState(false);

  const [ValSec1, SetValSec1] = useState(true);
  const [ValSec2, SetValSec2] = useState(false);
  const [ValSec3, SetValSec3] = useState(false);

  const SetSelectedValue = (value: boolean, no: number, type: string) => {
    if (type === "theme") {
      if (value) {
        if (no === 1) {
          SetVal1(true);
          SetVal2(false);
          SetVal3(false);
        } else if (no === 2) {
          SetVal1(false);
          SetVal2(true);
          SetVal3(false);
        } else if (no === 3) {
          SetVal1(false);
          SetVal2(false);
          SetVal3(true);
        }
      } else if (!value) {
      }
    } else if (type === "lang") {
      if (value) {
        if (no === 1) {
          SetValSec1(true);
          SetValSec2(false);
          SetValSec3(false);
        } else if (no === 2) {
          SetValSec1(false);
          SetValSec2(true);
          SetValSec3(false);
        } else if (no === 3) {
          SetValSec1(false);
          SetValSec2(false);
          SetValSec3(true);
        }
      } else if (!value) {
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      <View style={[styles.container1, styles.cardContainer]}>
        <Text style={styles.cardHeaderText}>Theme</Text>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            onValueChange={(val) => {
              SetSelectedValue(val, 1, "theme");
            }}
            value={Val1}
          />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Dimmed Mode</Text>
          <Switch
            onValueChange={(val) => {
              SetSelectedValue(val, 2, "theme");
            }}
            value={Val2}
          />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Light mode</Text>
          <Switch
            onValueChange={(val) => {
              SetSelectedValue(val, 3, "theme");
            }}
            value={Val3}
          />
        </View>
      </View>
      <View style={[styles.container2, styles.cardContainer]}>
        <Text style={styles.cardHeaderText}>Language</Text>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>English</Text>
          <Switch
            onValueChange={(val) => {
              SetSelectedValue(val, 1, "lang");
            }}
            value={ValSec1}
          />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Amharic</Text>
          <Switch
            onValueChange={(val) => {
              SetSelectedValue(val, 2, "lang");
            }}
            value={ValSec2}
          />
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>French</Text>
          <Switch
            onValueChange={(val) => {
              SetSelectedValue(val, 3, "lang");
            }}
            value={ValSec3}
          />
        </View>
      </View>
      <View style={[styles.container3]}>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                transform: [{ rotate: "45deg" }],
                marginRight: 10,
              }}
            >
              <AntDesign
                name="closesquareo"
                color="rgb(217,125,84)"
                size={18}
              />
            </View>
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
            >
              FitIn
            </Text>
          </View>

          <Text style={{ textAlign: "center", fontSize: 15 }}>
            Version 0.0.1
          </Text>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            Property of AXE Software
          </Text>
          <Text style={{ textAlign: "center", fontSize: 15 }}>© 2021, AXE</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 15,
    marginLeft: 30,
  },
  container: {
    height: y,
    width: x,
  },
  cardContainer: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: x * 0.9,
    shadowColor: "black",
    shadowOpacity: 0.5,
    elevation: 4,
    backgroundColor: "white",
  },
  cardHeaderText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  container1: {},
  container2: {},
  container3: {
    paddingHorizontal: 40,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: x,
  },
  optionContainer: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  optionText: {
    fontSize: 16,
  },
});
export default Settings;
