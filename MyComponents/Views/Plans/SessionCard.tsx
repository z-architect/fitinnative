import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Image } from "native-base";
import { instance } from "../../../api/config";
import { SwipeRow } from "react-native-swipe-list-view";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const SessionCard = ({
  session,
  onSelect,
  createMode,
  onSheetOpen,
  editMode,
  setScrollEnabled,
  scrollEnabled,
  onEdit,
  onDelete,
  setSelectedSession,
}: any) => {
  const [timed, setTimed] = useState(!session.duration);
  const [_delete, setDelete] = useState(false);
  const swiper = useRef<SwipeRow<View>>(null);

  useEffect(() => {
    if (_delete) {
      setTimeout(() => onDelete(session.id), 500);
    }
  }, [_delete]);

  useEffect(() => {
    console.log({ editMode });
  }, []);

  return (
    <SwipeRow
      ref={swiper}
      disableLeftSwipe={!(editMode || createMode)}
      // disableRightSwipe={true}
      swipeGestureBegan={() => setScrollEnabled(false)}
      swipeGestureEnded={() => setScrollEnabled(true)}
      rightOpenValue={-(x * 0.3)}
      leftOpenValue={x * 0.3}
      stopRightSwipe={-(x * 0.45)}
      stopLeftSwipe={x * 0.45}
      leftActionValue={x * 0.4}
      rightActionValue={-(x * 0.4)}
      onRightAction={(rowKey) => {
        console.log("right");
      }}
    >
      <View style={[styles.sessionCard, { flex: 1, padding: 0 }]}>
        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            alignItems: "flex-start",
            backgroundColor: "teal",
            borderTopStartRadius: 12,
            padding: 20,
            borderBottomStartRadius: 12,
            justifyContent: "center",
          }}
          onPress={() => {
            swiper?.current?.closeRowWithoutAnimation();
            onSheetOpen();
          }}
        >
          <MaterialIcons name={"scatter-plot"} size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            alignItems: "flex-end",
            backgroundColor: "red",
            borderRadius: 12,
            padding: 20,
            justifyContent: "center",
          }}
          onPress={() => {
            swiper?.current?.closeRowWithoutAnimation();
            setDelete(true);
          }}
        >
          <MaterialIcons name={"delete"} size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.sessionCard,
          { backgroundColor: _delete ? "red" : "white" },
        ]}
      >
        <TouchableOpacity
          style={styles.sessionCardContentContainer}
          onPress={() => {
            onSelect();
          }}
        >
          <View style={styles.sessionCardContent}>
            <View
              style={[
                styles.sessionImage,
                {
                  borderColor: !_delete
                    ? "rgba(0,0,0,0.05)"
                    : "rgba(255,255,255,0.5)",
                },
              ]}
            >
              {session?.image ? (
                <Image
                  height="100%"
                  width="100%"
                  alt="Action Gif"
                  resizeMode="cover"
                  source={{
                    uri: `${instance.defaults.baseURL}/upload/${
                      typeof session?.image === "string"
                        ? session?.image
                        : session?.image.id
                    }`,
                  }}
                />
              ) : null}
            </View>
            <View style={styles.sessionDataContainer}>
              <Text
                style={[
                  styles.activityName,
                  { color: !_delete ? "black" : "white" },
                ]}
              >
                {session?.name ?? "Exercise Name"}
              </Text>
              <View style={styles.sessionInfo}>
                <View style={styles.sessionDuration}>
                  <MaterialIcons
                    name={"av-timer"}
                    size={16}
                    color={!_delete ? "black" : "white"}
                  />
                  <Text
                    style={{ color: !_delete ? "rgba(0,0,0,0.7)" : "white" }}
                  >{` ${session?.duration ?? 0} min`}</Text>
                </View>
                <View style={styles.sessionCalBurn}>
                  <MaterialIcons
                    name="whatshot"
                    size={16}
                    color={!_delete ? "black" : "white"}
                  />
                  <Text
                    style={{ color: !_delete ? "rgba(0,0,0,0.7)" : "white" }}
                  >{` ${session?.caloriesToBurn ?? 0} kcal`}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SwipeRow>
  );
};
const styles = StyleSheet.create({
  sessionCard: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 4,
  },
  sessionCardContentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  sessionCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  sessionDataContainer: {
    justifyContent: "center",
    marginLeft: 12,
    padding: 20,
    paddingLeft: 0,
  },

  activityName: {
    fontSize: 20,
    fontFamily: "",
    paddingBottom: 4,
  },

  sessionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  sessionDuration: {
    flexDirection: "row",
    alignItems: "center",
  },

  sessionCalBurn: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  sessionImage: {
    maxWidth: 120,
    maxHeight: 100,
    width: 100,
    height: 100,
    borderRightWidth: 1,
    overflow: "hidden",
  },
  setCardIcons: {
    width: "20%",
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
export default SessionCard;
