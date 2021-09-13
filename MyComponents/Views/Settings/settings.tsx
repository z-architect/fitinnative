import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  AppTheme,
  changeLanguage,
  changeTheme,
  Language,
} from "../../Redux/profilesSlice";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Settings = () => {
  const settings = useAppSelector(
    (state) => state.profiles.profiles[state.profiles.activeProfile].settings
  );
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      <View style={[styles.container1, styles.cardContainer]}>
        <Text style={styles.cardHeaderText}>Theme</Text>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => dispatch(changeTheme(AppTheme.LIGHT))}
            style={styles.listItem}
          >
            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.title,
                  settings.theme === AppTheme.LIGHT && styles.active,
                ]}
              >
                Light Mode
              </Text>
            </View>
            {settings.theme === AppTheme.LIGHT && (
              <Icon
                style={styles.active}
                name="ios-checkmark-circle-outline"
                size={30}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => dispatch(changeTheme(AppTheme.DIMMED))}
            style={styles.listItem}
          >
            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.title,
                  settings.theme === AppTheme.DIMMED && styles.active,
                ]}
              >
                Dimmed Mode
              </Text>
            </View>
            {settings.theme === AppTheme.DIMMED && (
              <Icon
                style={styles.active}
                name="ios-checkmark-circle-outline"
                size={30}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => dispatch(changeTheme(AppTheme.DARK))}
            style={styles.listItem}
          >
            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.title,
                  settings.theme === AppTheme.DARK && styles.active,
                ]}
              >
                Dark Mode
              </Text>
            </View>
            {settings.theme === AppTheme.DARK && (
              <Icon
                style={styles.active}
                name="ios-checkmark-circle-outline"
                size={30}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.container2, styles.cardContainer]}>
        <Text style={styles.cardHeaderText}>Language</Text>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => dispatch(changeLanguage(Language.ENGLISH))}
            style={styles.listItem}
          >
            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.title,
                  settings.language === Language.ENGLISH && styles.active,
                ]}
              >
                English
              </Text>
            </View>
            {settings.language === Language.ENGLISH && (
              <Icon
                style={styles.active}
                name="ios-checkmark-circle-outline"
                size={30}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => dispatch(changeLanguage(Language.AMHARIC))}
            style={styles.listItem}
          >
            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.title,
                  settings.language === Language.AMHARIC && styles.active,
                ]}
              >
                Amharic
              </Text>
            </View>
            {settings.language === Language.AMHARIC && (
              <Icon
                style={styles.active}
                name="ios-checkmark-circle-outline"
                size={30}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => dispatch(changeLanguage(Language.FRENCH))}
            style={styles.listItem}
          >
            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.title,
                  settings.language === Language.FRENCH && styles.active,
                ]}
              >
                French
              </Text>
            </View>
            {settings.language === Language.FRENCH && (
              <Icon
                style={styles.active}
                name="ios-checkmark-circle-outline"
                size={30}
              />
            )}
          </TouchableOpacity>
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
  listItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  textWrapper: {
    width: "90%",
  },
  title: {
    fontSize: 18,
    color: "#434343",
  },
  subtitle: {
    color: "#AAAAAA",
  },
  active: {
    color: "#03a87c",
  },
});
export default Settings;
