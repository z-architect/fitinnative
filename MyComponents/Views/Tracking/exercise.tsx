import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import Fontawesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SetStateStructure } from "../ActivitySet/setedit";
import { Asset } from "react-native-image-picker";
import { Props } from "../../types";
import { instance } from "../../../api/config";
import { Image } from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Exercise = ({ navigation, route }: Props) => {
  const [exerciseName] = useState(
    (route.params as any)?.session.name ?? "Exercise"
  );
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [sets, setSets] = useState<SetStateStructure[]>(
    (route.params as any).sets ?? []
  );
  const [currentSet, setCurrentSet] = useState<SetStateStructure>(
    sets[0] ?? null
  );
  const [upcomingSets, setUpcomingSets] = useState<SetStateStructure[]>([]);
  const [currentSetDuration, setCurrentSetDuration] = useState(
    currentSet?.duration
  );
  const [sessionDuration] = useState(
    (route.params as any).session.totalSessionTime ?? 0
  );
  const [setTimer, setSetTimer] = useState({ min: 0, sec: 0 });
  const [sessionTimer, setSessionTimer] = useState({ min: 0, sec: 0 });
  const [image, setImage] = useState<Asset>();

  function getSeparateTimeUnits(duration: number) {
    return {
      min: duration < 60 ? 0 : Math.floor(duration / 60),
      sec: duration < 60 ? duration : duration % 60,
    };
  }

  useEffect(() => {
    setSetTimer(getSeparateTimeUnits(currentSetDuration));
  }, [currentSetDuration]);

  useEffect(() => {
    setSessionTimer(sessionDuration);
  }, [sessionDuration]);

  useEffect(() => {
    console.log({
      setTimer,
      sessionTimer,
      currentSetDuration,
      sessionDuration,
    });
  }, [sessionDuration, currentSetDuration]);

  function handlePrevious() {
    if (sets.length && currentSetIndex > 0)
      setCurrentSetIndex(currentSetIndex - 1);
  }

  function handleNext() {
    if (sets.length && currentSetIndex > sets.length - 2)
      setCurrentSetIndex(currentSetIndex - 1);
  }

  function handlePausePlay() {}

  useEffect(() => console.log(currentSetIndex < sets.length - 1), []);

  function calculateUpcoming() {
    let renderCount = 0;
    let startIndex = 0;
    const _upcomingSets: SetStateStructure[] = [];

    sets.map((set, index) => {
      if (set.id === currentSet.id) startIndex = index;
      if (startIndex < index && renderCount <= 3) {
        _upcomingSets.push(set);
        renderCount++;
      }
    });

    setUpcomingSets(_upcomingSets);
  }

  return (
    <ImageBackground
      source={
        !!image ? image : require("../../../MyAssets/backgroundimage2.png")
      }
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="navigate-before" size={40} color="white" />
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 16 }}>{exerciseName}</Text>

        <TouchableOpacity>
          <MaterialIcons name="info-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.gifCircle}>
          <Image
            height="100%"
            width="100%"
            alt="GIF"
            resizeMode="cover"
            style={{ borderRadius: 75 }}
            source={{
              uri: `${instance.defaults.baseURL}/upload/${
                typeof currentSet?.activity?.actionGif === "string"
                  ? currentSet?.activity?.actionGif
                  : (currentSet?.activity?.actionGif as any)?.id
              }`,
            }}
          />
        </View>

        <View style={styles.sessionNameContainer}>
          <Text style={styles.sessionName}>{currentSet?.activity?.name}</Text>
        </View>

        <View style={styles.outerCircle}>
          <AnimatedCircularProgress
            tintColor={"orange"}
            style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}
            backgroundColor={"rgba(0,0,0,0.0)"}
            size={260}
            width={8}
            fill={20}
          />
          <View style={styles.innerCircle}>
            <AnimatedCircularProgress
              tintColor={"white"}
              style={{
                position: "absolute",
                transform: [{ rotate: "-90deg" }],
              }}
              backgroundColor={"rgba(0,0,0,0.0)"}
              size={225}
              width={8}
              fill={70}
            />
            <View style={styles.innerMostCircle}>
              <Text style={{ color: "white", fontSize: 50 }}>
                {`${
                  setTimer.min > 0 || setTimer.sec > 0
                    ? `${
                        setTimer.min > 0
                          ? ` ${setTimer.min > 0 ? setTimer.min : 0}`
                          : `00:`
                      }${setTimer.sec > 0 ? `${setTimer.sec}` : `00`}`
                    : ` 00:00`
                }`}
              </Text>
              <Text style={{ color: "white", fontSize: 22 }}>__</Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                {setTimer.min > 0 ? "Minutes" : "Seconds"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.upcomingContainer}>
          <Text
            style={{
              color: "white",
              marginVertical: 5,
              marginBottom: 10,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {!!upcomingSets?.length ? "UP COMING" : ""}
          </Text>
          {upcomingSets.map((set) => (
            <Text
              style={{
                color: "white",
                marginVertical: 5,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {set.activity.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity onPress={() => handlePrevious()}>
            <MaterialIcons
              name="skip-previous"
              size={38}
              color={currentSetIndex > 0 ? "white" : "transparent"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playPause}
            onPress={() => handlePausePlay()}
          >
            <Fontawesome name="pause" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNext()}>
            <MaterialIcons
              name="skip-next"
              size={38}
              color={
                sets.length > 0 && currentSetIndex >= sets.length - 1
                  ? "white"
                  : "transparent"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    height: y,
    width: x,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "space-between",
  },
  head: {
    height: y * 0.1,
    width: x,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  sessionNameContainer: {
    marginVertical: 15,
  },
  contentContainer: {
    alignItems: "center",
  },
  gifCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  sessionName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  innerMostCircle: {
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    height: y * 0.23,
    width: y * 0.23,
    borderRadius: y * 0.23 * 0.5,
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
    height: y * 0.26,
    width: y * 0.26,
    borderRadius: y * 0.26 * 0.5,
    // borderWidth: 4,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // borderColor: "white",
  },
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    height: y * 0.29,
    width: y * 0.29,
    borderRadius: y * 0.29 * 0.5,
    // borderWidth: 8,
    // borderBottomWidth: 0,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    // borderColor: "orange",
  },
  upcomingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  playPause: {
    backgroundColor: "rgba(255,255,255,0.5)",
    height: 60,
    width: 60,
    borderRadius: 40,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Exercise;
