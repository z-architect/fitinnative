import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import NumericInput from "react-native-numeric-input";
import { Image, ScrollView, Switch } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { Props } from "../../types";
import { ActivityStateStructure } from "../Activity/Activity";
import ActivityList from "./ActivityList";
import { instance } from "../../../api/config";
import DeleteModal from "../../Utils/DeleteModal";
import { ActivitySet as _ActivitySet } from "../../../api/interface";
import TimeSelector from "./TimeSelector";
// @ts-ignore
import ScrollPicker from "react-native-wheel-scroll-picker";
import ScrollSelector from "./ScrollSelector";
import { current } from "@reduxjs/toolkit";
import { ProfileGetOwnResponseSpec } from "../../../api/spec";

let x = Dimensions.get("window").width;
let y = Dimensions.get("window").height;

export interface SetStateStructure {
  id: string;
  met: number;
  duration: number;
  reps: number;
  forReps: boolean;
  activity: ActivityStateStructure;
  createdBy: string | ProfileGetOwnResponseSpec;
}

const minuteData = [...Array(61).keys()]
  .filter((v, i) => i !== 60)
  .map((v) => `${v < 10 ? "0" : ""}${v}`);
const secondData = [...Array(61).keys()]
  .filter((v, i) => i !== 0 && i !== 60)
  .map((v) => `${v < 10 ? "0" : ""}${v}`);

const ActivitySet = ({ navigation, route }: Props) => {
  const [minutePickerData, setMinutePickerData] = useState<string[]>([]);
  const [secondPickerData, setSecondPickerData] = useState<string[]>([]);
  const [repsPickerData, setRepsPickerData] = useState<number[]>([
    ...Array(501).keys(),
  ]);
  const [metsPickerData, setMetsPickerData] = useState<number[]>(
    [...Array(51).keys()].filter((v, i) => i !== 0)
  );

  const [id] = useState((route.params as any)?.set?.id ?? uuidv4());
  const [forReps, setForReps] = useState(
    (route.params as any)?.set?.forReps ?? true
  );
  const [duration, setDuration] = useState(
    (route.params as any)?.set?.duration ?? 28
  );
  const [durationSelections, setDurationSelections] = useState<number[]>([
    0, 28,
  ]);
  const [repetition, setRepetition] = useState(
    (route.params as any)?.set?.reps || 5
  );
  const [repetitionSelectedDigits, setRepetitionSelectedDigits] = useState(
    getDigits(repetition)
  );
  const [met, setMet] = useState((route.params as any)?.set?.met || 5);
  const [metsSelectedDigits, setMetsSelectedDigits] = useState(getDigits(met));
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityStateStructure>(
      (route.params as any)?.set?.activity ?? undefined
    );
  const [description, setDescription] = useState(
    selectedActivity?.description ?? ""
  );

  const [showActivityList, setShowActivityList] = useState(false);
  const [editMode, setEditMode] = useState(
    !!(route.params as any)?.createMode
      ? true
      : !(route.params as any)?.set?.id
      ? true
      : !!(route.params as any)?.editMode
  );
  const [createMode, setCreateMode] = useState(
    !!(route.params as any)?.createMode ? true : !(route.params as any)?.set?.id
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setMinutePickerData(minuteData);
    setDurationSelections([
      minuteData.findIndex(
        (minute) =>
          Number.parseInt(minute) ===
          (duration < 60 ? 0 : Math.floor(duration / 60))
      ),
      durationSelections[1],
    ]);
  }, []);

  useEffect(() => {
    setSecondPickerData(secondData);
    setDurationSelections([
      durationSelections[0],
      secondData.findIndex(
        (second) =>
          Number.parseInt(second) === (duration < 60 ? duration : duration % 60)
      ),
    ]);
  }, []);

  useEffect(() => {
    setDurationSelections([
      minuteData.findIndex(
        (minute) =>
          Number.parseInt(minute) ===
          (duration < 60 ? 0 : Math.floor(duration / 60))
      ),
      secondData.findIndex(
        (second) =>
          Number.parseInt(second) === (duration < 60 ? duration : duration % 60)
      ),
    ]);
  }, [minutePickerData, secondPickerData]);

  useEffect(() => {
    setMet(
      Number.parseInt(
        metsSelectedDigits.reduce((acc, current) => `${acc}${current}`, "")
      )
    );
  }, [metsSelectedDigits]);

  useEffect(() => {
    setRepetition(
      Number.parseInt(
        repetitionSelectedDigits.reduce(
          (acc, current) => `${acc}${current}`,
          ""
        )
      )
    );
  }, [repetitionSelectedDigits]);

  function getDigits(value: number) {
    let digits: number[] = [];

    if (!value) digits = [0, 0, 0];
    else {
      if (value < 10) {
        digits = [0, 0, value];
      } else if (value < 100) {
        digits = [0, Math.floor(value / 10), value % 10];
      } else {
        digits = [
          Math.floor(value / 100),
          Math.floor((value % 100) / 10),
          (value % 100) % 10,
        ];
      }
    }

    return digits;
  }

  function getUpdatedDigits(value: number[], update: number, index: number) {
    return value.map((v, i) => {
      if (index === i) return update;
      else return v;
    });
  }

  async function handleSetCreate() {
    await _ActivitySet.createActivity({
      activity: selectedActivity?.id,
      met,
      duration,
      forReps,
      reps: repetition,
    });

    navigation.goBack();
  }

  async function handleSetUpdate() {
    await _ActivitySet.updateActivitySet({
      id,
      activity: selectedActivity.id,
      reps: repetition,
      forReps,
      met,
      duration,
    });

    if (!(route.params as any)?.editMode) setEditMode(false);
    else navigation.goBack();
  }

  async function handleSetRemove() {
    await _ActivitySet.removeActivitySet({ id });
    navigation.goBack();
  }

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onDelete={handleSetRemove}
        prompt={"Do you really want to delete this set?"}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => {
              if (showActivityList) setShowActivityList(false);
              else if (createMode || !!(route.params as any)?.editMode)
                navigation.goBack();
              else if (editMode) setEditMode(false);
              else navigation.goBack();
            }}
          >
            <AntDesign name="left" size={32} color="white" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "30%",
            }}
          >
            {!editMode && !createMode ? (
              <>
                <TouchableOpacity
                  style={{ paddingRight: 25 }}
                  onPress={() => {
                    setShowDeleteModal(true);
                  }}
                >
                  <AntDesign name="delete" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEditMode(true);
                  }}
                >
                  <AntDesign name="edit" size={32} color="white" />
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>

        <View
          style={{
            ...styles.card,
            maxHeight: showActivityList ? y * 0.7 : y * 0.55,
          }}
        >
          {!showActivityList ? (
            <>
              <TouchableOpacity
                style={styles.cardHead}
                onPress={() => {
                  if (editMode) setShowActivityList(true);
                  else console.log("activityModal"); // TODO
                }}
              >
                <View style={styles.gif}>
                  {selectedActivity?.actionGif ? (
                    <Image
                      height="100%"
                      width="100%"
                      alt="GIF"
                      resizeMode="cover"
                      style={{ borderRadius: 75 }}
                      source={{
                        uri: `${instance.defaults.baseURL}/upload/${
                          typeof selectedActivity?.actionGif === "string"
                            ? selectedActivity?.actionGif
                            : (selectedActivity?.actionGif as any)?.id
                        }`,
                      }}
                    />
                  ) : (
                    <Text
                      style={{ color: editMode ? "rgb(217,125,84)" : "black" }}
                    >
                      GIF
                    </Text>
                  )}
                </View>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Select activity"
                    value={selectedActivity?.name}
                    editable={false}
                    placeholderTextColor="black"
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "lightgrey",
                      color: "black",
                    }}
                    onChangeText={() => {}}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={[
                  styles.body,
                  {
                    borderBottomWidth: editMode || !description ? 0 : 1,
                  },
                ]}
              >
                <View style={styles.bodyLeft}>
                  <View>
                    {editMode ? (
                      <TimeSelector
                        totalTimeInSeconds={duration}
                        setTotalTimeInSeconds={setDuration}
                        minuteData={minutePickerData}
                        secondData={secondPickerData}
                        minuteSelectedIndex={durationSelections[0]}
                        secondSelectedIndex={durationSelections[1]}
                        setSelections={setDurationSelections}
                      />
                    ) : (
                      <View style={styles.numericInputContainer}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                          {duration}
                        </Text>
                      </View>
                    )}
                    <View style={{ alignItems: "center", marginTop: 5 }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                        {forReps ? "Estimated Duration" : "Duration"}
                      </Text>
                    </View>
                  </View>

                  <View>
                    {editMode ? (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <ScrollSelector
                          width={30}
                          data={[...Array(5).keys()]}
                          onValueChange={(value) =>
                            setRepetitionSelectedDigits(
                              getUpdatedDigits(
                                repetitionSelectedDigits,
                                value,
                                0
                              )
                            )
                          }
                          focusIndex={[...Array(5).keys()].findIndex(
                            (v) => v === repetitionSelectedDigits[0]
                          )}
                        />
                        <ScrollSelector
                          width={30}
                          data={[...Array(10).keys()]}
                          onValueChange={(value) =>
                            setRepetitionSelectedDigits(
                              getUpdatedDigits(
                                repetitionSelectedDigits,
                                value,
                                1
                              )
                            )
                          }
                          focusIndex={[...Array(10).keys()].findIndex(
                            (v) => v === repetitionSelectedDigits[1]
                          )}
                        />
                        <ScrollSelector
                          width={30}
                          data={[...Array(10).keys()]}
                          onValueChange={(value) =>
                            setRepetitionSelectedDigits(
                              getUpdatedDigits(
                                repetitionSelectedDigits,
                                value,
                                2
                              )
                            )
                          }
                          focusIndex={[...Array(10).keys()].findIndex(
                            (v) => v === repetitionSelectedDigits[2]
                          )}
                        />
                      </View>
                    ) : (
                      <View style={styles.numericInputContainer}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                          {repetition}
                        </Text>
                      </View>
                    )}
                    <View style={{ alignItems: "center", marginTop: 5 }}>
                      <Text style={{ fontWeight: "bold" }}>Repetition</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.bodyRight}>
                  <View style={{ alignItems: "center" }}>
                    <View style={{ alignItems: "center", marginBottom: 5 }}>
                      <Text style={{ fontWeight: "bold" }}>Type</Text>
                    </View>
                    {editMode ? (
                      <View
                        style={{
                          flexDirection: "row",
                          marginBottom: 5,
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            maxWidth: 40,
                          }}
                        >
                          <Text style={{ marginRight: 5, flexShrink: 1 }}>
                            For Time
                          </Text>
                        </View>
                        <Switch
                          size="lg"
                          isChecked={forReps}
                          onToggle={() => {
                            console.log({ forReps });
                            setForReps(!forReps);
                          }}
                          trackColor={{ true: "rgb(50,71,85)", false: "grey" }}
                        />
                        <View style={{ flexDirection: "row", maxWidth: 40 }}>
                          <Text style={{ marginLeft: 5, flexShrink: 1 }}>
                            For Reps
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={[styles.numericInputContainer, { padding: 5 }]}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          {forReps ? "For Reps" : "For Time"}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <View style={{ alignItems: "center", marginBottom: 5 }}>
                      <Text style={{ fontWeight: "bold" }}>METs</Text>
                    </View>
                    {editMode ? (
                      <View style={{ flexDirection: "row" }}>
                        <ScrollSelector
                          width={30}
                          data={[...Array(5).keys()]}
                          onValueChange={(value) =>
                            setMetsSelectedDigits(
                              getUpdatedDigits(metsSelectedDigits, value, 1)
                            )
                          }
                          focusIndex={[...Array(5).keys()].findIndex(
                            (v) => v === metsSelectedDigits[1]
                          )}
                        />
                        <ScrollSelector
                          width={30}
                          data={[...Array(10).keys()].filter((v, i) => i !== 0)}
                          onValueChange={(value) =>
                            setMetsSelectedDigits(
                              getUpdatedDigits(metsSelectedDigits, value, 2)
                            )
                          }
                          focusIndex={[...Array(10).keys()]
                            .filter((v, i) => i !== 0)
                            .findIndex((v) => v === metsSelectedDigits[2])}
                        />
                      </View>
                    ) : (
                      <View style={styles.numericInputContainer}>
                        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                          {met}
                        </Text>
                      </View>
                    )}
                    <Text style={{ color: "rgb(110,140,160)" }}>
                      Calories Burn Rate
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.foot,
                  { padding: editMode || !description ? 10 : 20 },
                ]}
              >
                {editMode || !description ? null : (
                  <Text style={{ fontSize: 16 }}>{description}</Text>
                )}
              </View>
            </>
          ) : (
            <ActivityList
              onBack={() => {
                setShowActivityList(false);
              }}
              onSubmit={(activity) => {
                setShowActivityList(false);
                setSelectedActivity(activity);
              }}
            />
          )}
        </View>

        {!showActivityList && editMode ? (
          <TouchableOpacity
            disabled={!selectedActivity?.id}
            onPress={() => {
              if (!selectedActivity?.id) return;
              else if (createMode) void handleSetCreate();
              else void handleSetUpdate();
            }}
            style={[
              styles.button,
              {
                borderColor: !!selectedActivity?.id
                  ? "white"
                  : "rgba(255,255,255, 0.6)",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 28,
                color: !!selectedActivity?.id
                  ? "white"
                  : "rgba(255,255,255, 0.6)",
              }}
            >
              {!createMode ? "Update Set" : "Create Set"}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 100 }} />
        )}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: y,
    width: x,
    backgroundColor: "rgba(110,140,160,0.8)", //"rgb(217,125,84)",
    alignItems: "center",
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
  card: {
    minHeight: y * 0.55,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  cardHead: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  body: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomColor: "lightgrey",
  },
  bodyLeft: {
    justifyContent: "space-between",
    padding: 20,
    paddingVertical: 40,
    flex: 1,
  },
  bodyRight: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 20,
    marginLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "lightgrey",
  },
  numericInputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "lightgrey",
    borderRadius: 15,
  },
  foot: {
    padding: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  footInput: {},
  gif: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  input: {
    justifyContent: "center",
    padding: 10,
    // backgroundColor: "pink",
    flexGrow: 1,
    color: "black",
  },
  plusMinus: {
    flexDirection: "row",
  },
  duration: {
    width: "100%",
    backgroundColor: "lightblue",
    margin: 4,
    borderRadius: 6,
  },
  rest: {
    width: "100%",
    backgroundColor: "yellow",
    margin: 4,
    borderRadius: 6,
  },
  switch: {
    width: "80%",
  },
  met: {},
  button: {
    width: "60%",
    marginVertical: 20,
    marginHorizontal: "20%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderColor: "white",
    borderWidth: 1,
  },
  gifContainerRouter: {
    height: y * 0.5,
    alignItems: "center",
  },
  gifContainer: {
    backgroundColor: "white",
    borderWidth: 3,
    width: "100%",
    borderColor: "rgb(50,71,85)",
    borderRadius: 20,
  },
});

export default ActivitySet;
