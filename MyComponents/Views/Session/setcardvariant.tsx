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
import { useAppSelector } from "../../Redux/hooks";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const SetCard = ({
  set,
  onSelect,
  createMode,
  editMode,
  setScrollEnabled,
  scrollEnabled,
  onEdit,
  onDelete,
}: any) => {
  const [timed, setTimed] = useState(!set?.duration);
  const [_delete, setDelete] = useState(false);
  const swiper = useRef<SwipeRow<View>>(null);
  const [duration, setDuration] = useState({ min: 0, sec: 0 });
  const [caloriesToBurn, setCaloriesToBurn] = useState(0);
  const measurements = useAppSelector((state) => state.measurements);

  function getSeparateTimeUnits(duration: number) {
    return {
      min: duration < 60 ? 0 : Math.floor(duration / 60),
      sec: duration < 60 ? duration : duration % 60,
    };
  }

  function getCaloriesFromMet(met: number) {
    return (
      (met *
        3.5 *
        (measurements.measurements[measurements.currentMeasurement].mass ||
          55)) /
      200
    ).toFixed(2);
  }

  useEffect(() => {
    setDuration(getSeparateTimeUnits(set?.duration ?? 0));
  }, [set]);

  useEffect(() => {
    if (_delete) setTimeout(() => onDelete(set?.id), 500);
  }, [_delete]);

  useEffect(() => {
    console.log({ met: set.met });
    setCaloriesToBurn(getCaloriesFromMet(set.met));
  }, [set]);

  return (
    <SwipeRow
      ref={swiper}
      disableLeftSwipe={!(editMode || createMode)}
      disableRightSwipe={true}
      swipeGestureBegan={() => setScrollEnabled(false)}
      swipeGestureEnded={() => setScrollEnabled(true)}
      rightOpenValue={-(x * 0.3)}
      leftOpenValue={x * 0.3}
      friction={10}
      tension={60}
      stopRightSwipe={-(x * 0.45)}
      stopLeftSwipe={x * 0.45}
      leftActionValue={x * 0.45}
      rightActionValue={-(x * 0.45)}
    >
      <View style={[styles.setCard, { flex: 1, padding: 0 }]}>
        {/*<TouchableOpacity*/}
        {/*  style={{*/}
        {/*    flex: 1,*/}
        {/*    height: "100%",*/}
        {/*    alignItems: "flex-start",*/}
        {/*    backgroundColor: "teal",*/}
        {/*    borderTopStartRadius: 12,*/}
        {/*    padding: 20,*/}
        {/*    borderBottomStartRadius: 12,*/}
        {/*    justifyContent: "center",*/}
        {/*  }}*/}
        {/*  onPress={onEdit}*/}
        {/*>*/}
        {/*  <MaterialIcons name={"edit"} size={32} color="white" />*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            alignItems: "flex-end",
            backgroundColor: "red",
            // borderTopEndRadius: 12,
            // borderBottomEndRadius: 12,
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
        style={[styles.setCard, { backgroundColor: _delete ? "red" : "white" }]}
      >
        <TouchableOpacity
          style={styles.setCardContentContainer}
          onPress={() => {
            onSelect();
          }}
        >
          <View style={styles.setCardContent}>
            <View
              style={[
                styles.setGif,
                {
                  borderColor: !_delete ? "rgba(0,0,0,0.4)" : "white",
                },
              ]}
            >
              {set?.activity?.actionGif ? (
                <Image
                  height="100%"
                  width="100%"
                  alt="Action Gif"
                  resizeMode="cover"
                  style={{ borderRadius: 75 }}
                  source={{
                    uri: `${instance.defaults.baseURL}/upload/${
                      typeof set?.activity?.actionGif === "string"
                        ? set?.activity?.actionGif
                        : set?.activity?.actionGif.id
                    }`,
                  }}
                />
              ) : null}
            </View>
            <View style={styles.setDataContainer}>
              <Text
                style={[
                  styles.activityName,
                  { color: !_delete ? "black" : "white" },
                ]}
              >
                {set?.activity?.name ?? "Exercise Name"}
              </Text>
              <View style={styles.setInfo}>
                <View style={styles.setDuration}>
                  <MaterialIcons
                    name={"av-timer"}
                    size={16}
                    color={!_delete ? "black" : "white"}
                  />
                  <Text
                    style={{ color: !_delete ? "rgba(0,0,0,0.7)" : "white" }}
                  >
                    {duration.min > 0 || duration.sec > 0
                      ? `${
                          duration.min > 0
                            ? ` ${duration.min > 0 ? duration.min : 0} min`
                            : ``
                        }${duration.sec > 0 ? ` ${duration.sec} sec` : ``}`
                      : ` 0 min`}
                  </Text>
                </View>
                <View style={styles.setCalBurn}>
                  <MaterialIcons
                    name="whatshot"
                    size={16}
                    color={!_delete ? "black" : "white"}
                  />
                  <Text
                    style={{ color: !_delete ? "rgba(0,0,0,0.7)" : "white" }}
                  >{` ${caloriesToBurn ?? 0} kcal`}</Text>
                </View>
                <View style={styles.setCalBurn}>
                  <MaterialIcons
                    name="repeat"
                    size={16}
                    color={!_delete ? "black" : "white"}
                  />
                  <Text
                    style={{ color: !_delete ? "rgba(0,0,0,0.7)" : "white" }}
                  >{` ${set?.reps ?? 0} reps`}</Text>
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
  setCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "grey",
    padding: 20,
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 4,
  },
  setCardContentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  setCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  setDataContainer: {
    justifyContent: "center",
    marginLeft: 12,
  },

  activityName: {
    fontSize: 20,
    fontFamily: "",
    paddingBottom: 4,
  },

  setInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  setDuration: {
    flexDirection: "row",
    alignItems: "center",
  },

  setCalBurn: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  setGif: {
    width: 42,
    height: 42,
    borderRadius: 30,
    borderWidth: 1,
    overflow: "hidden",
  },
  setCardIcons: {
    width: "20%",
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
export default SetCard;
