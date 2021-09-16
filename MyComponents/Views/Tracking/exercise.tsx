import React, { useEffect, useRef, useState } from "react";
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
import setIntervalWithTimeout, {
  TimeoutHandler,
} from "../../Utils/TimeoutHandler";
import ProgressTimer from "./ProgressTimer";
import TimerComponent from "./TimerComponent";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Tracking } from "../../../api/interface/Tracking";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Exercise = ({ navigation, route }: Props) => {
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [exerciseName] = useState(
    (route.params as any)?.session.name ?? "Exercise"
  );
  const [image, setImage] = useState<Asset>();
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [sets, setSets] = useState<SetStateStructure[]>(
    (route.params as any).sets ?? []
  );
  const [currentSet, setCurrentSet] = useState<SetStateStructure>(
    sets[0] ?? null
  );
  const [upcomingSets, setUpcomingSets] = useState<SetStateStructure[]>([]);
  const [currentSetDuration, setCurrentSetDuration] = useState({
    wrapper: currentSet?.duration,
  });
  const [sessionDuration] = useState(
    (route.params as any).session.totalSessionTime ?? { min: 0, sec: 0 }
  );
  const [ticker, setTpausedicker] = useState<number>();
  const [setTimer, setSetTimer] = useState({ min: 0, sec: 0 });
  const [sessionTimer, setSessionTimer] = useState({ min: 0, sec: 0 });
  const [paused, setPaused] = useState(false);

  const sessionTimerIndicator = useRef<typeof ProgressTimer>(null);
  const setTimerIndicator = useRef<typeof ProgressTimer>(null);
  const timer = useRef<typeof TimerComponent>(null);

  useEffect(() => {
    console.log({ setsSSSS: sets });
  }, [sets]);

  useEffect(() => {
    setCurrentSetDuration({ wrapper: currentSet?.duration });
  }, [currentSet]);

  function getSeparateTimeUnits(duration: number) {
    return {
      min: duration < 60 ? 0 : Math.floor(duration / 60),
      sec: duration < 60 ? duration : duration % 60,
    };
  }

  useEffect(() => {
    setSetTimer(getSeparateTimeUnits(currentSetDuration.wrapper));

    // if (currentSetDuration <= 0) {
    //   console.log({ tickerInRemove: ticker });
    //   clearInterval(ticker as number);
    // }
  }, [currentSetDuration]);

  useEffect(() => {
    setSessionTimer(sessionDuration);
  }, [sessionDuration]);

  function handlePrevious() {
    if (sets.length && currentSetIndex > 0)
      setCurrentSetIndex(currentSetIndex - 1);
  }

  function handleNext() {
    if (sets.length && currentSetIndex > sets.length - 2)
      setCurrentSetIndex(currentSetIndex - 1);
  }

  function handlePausePlay() {
    timer?.current?.togglePlayer();
    setTimerIndicator?.current?.togglePlayer();
    sessionTimerIndicator?.current?.togglePlayer();
    setPaused(!paused);
  }

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

  async function handleTrack() {
    // await Tracking.recordEngagement({  })
  }

  useEffect(() => {
    calculateUpcoming();
  }, [currentSet]);

  // useEffect(() => {
  //   console.log({ ticker });
  //
  //   if (currentSetDuration > 0) {
  //     if (!!ticker) clearInterval(ticker);
  //
  //     const _ticker = setInterval(() => {
  //       console.log({ currentSetDuration });
  //       setCurrentSetDuration(currentSetDuration - 1);
  //     }, 3000);
  //
  //     setTicker(_ticker);
  //
  //     console.log({ _ticker });
  //   }
  //
  //   return () => {
  //     clearInterval(ticker as number);
  //   };
  // }, [currentSet, currentSetDuration]);

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
        {!exerciseCompleted && (
          <Text style={{ color: "white", fontSize: 16 }}>{exerciseName}</Text>
        )}

        <TouchableOpacity disabled={true}>
          <MaterialIcons name="info-outline" size={32} color="transparent" />
        </TouchableOpacity>
      </View>

      {exerciseCompleted && (
        <>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <AntDesign
                name={"checkcircleo"}
                size={150}
                color={"lightgreen"}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 46,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Workout Completed!
              </Text>
            </View>
          </View>
        </>
      )}

      {!exerciseCompleted && (
        <View style={styles.contentContainer}>
          {!!sets.length && (
            <>
              <View style={[styles.gifCircle]}>
                <Image
                  height="100%"
                  width="100%"
                  alt="GIF"
                  resizeMode="cover"
                  style={{ borderRadius: 75 }}
                  source={{
                    uri: !!currentSet?.activity
                      ? `${instance.defaults.baseURL}/upload/${
                          typeof currentSet?.activity?.actionGif === "string"
                            ? currentSet?.activity?.actionGif
                            : (currentSet?.activity?.actionGif as any)?.id
                        }`
                      : "no-image",
                  }}
                />
              </View>
              <View style={styles.sessionNameContainer}>
                <Text style={styles.sessionName}>
                  {currentSet?.activity?.name}
                </Text>
              </View>
            </>
          )}

          <ProgressTimer
            ref={sessionTimerIndicator}
            duration={sessionDuration}
            tintColor={"orange"}
            containerStyle={styles.outerCircle}
            innerStyle={{
              position: "absolute",
              transform: [{ rotate: "-90deg" }],
            }}
            onPlayerToggle={(value) => {
              setPaused(value);
            }}
            onFinish={() => {
              setPaused(true);
              setExerciseCompleted(true);
            }}
            backgroundColor={"rgba(0,0,0,0.0)"}
            size={260}
            width={8}
            fill={99.9}
            children={
              <ProgressTimer
                ref={setTimerIndicator}
                duration={getSeparateTimeUnits(currentSetDuration.wrapper)}
                tintColor={"white"}
                containerStyle={styles.innerCircle}
                innerStyle={{
                  position: "absolute",
                  transform: [{ rotate: "-90deg" }],
                }}
                backgroundColor={"rgba(0,0,0,0.0)"}
                size={225}
                width={8}
                fill={99.9}
                children={
                  <TimerComponent
                    onFinish={() => {
                      setSets(
                        sets.filter((set, index) => {
                          const isCurrentSet = set.id === currentSet.id;

                          if (isCurrentSet) {
                            if (index < sets.length)
                              setCurrentSet(sets[index + 1]);
                          }

                          return !isCurrentSet;
                        })
                      );
                    }}
                    setTimer={setTimer}
                    ref={timer}
                  />
                }
              />
            }
          />

          <View style={styles.upcomingContainer}>
            <Text
              style={{
                color: "white",
                marginVertical: 5,
                marginBottom: 10,
                fontSize: 18,
              }}
            >
              {!!upcomingSets?.length ? "UP COMING" : ""}
            </Text>
            {upcomingSets.map((set) => (
              <Text
                key={set.id}
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
      )}

      {!exerciseCompleted && (
        <View style={styles.buttonsContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginBottom: 50,
            }}
          >
            {/*<TouchableOpacity onPress={() => handlePrevious()}>*/}
            {/*  <MaterialIcons*/}
            {/*    name="skip-previous"*/}
            {/*    size={38}*/}
            {/*    color={currentSetIndex > 0 ? "white" : "transparent"}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity
              style={styles.playPause}
              onPress={() => handlePausePlay()}
            >
              <Fontawesome
                name={!paused ? "pause" : "play"}
                size={32}
                color="white"
              />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => handleNext()}>*/}
            {/*  <MaterialIcons*/}
            {/*    name="skip-next"*/}
            {/*    size={38}*/}
            {/*    color={*/}
            {/*      sets.length > 0 && currentSetIndex >= sets.length - 1*/}
            {/*        ? "white"*/}
            {/*        : "transparent"*/}
            {/*    }*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
          </View>
        </View>
      )}
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
    borderRadius: 30,
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Exercise;
