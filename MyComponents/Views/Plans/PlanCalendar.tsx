import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useRef, useState } from "react";
import { FetchSessionsResponseSpec } from "../../../api/spec/SessionSpec";
import RBSheet from "react-native-raw-bottom-sheet";
import { Modal } from "native-base";
import SessionCard from "./sessioncardvarianttwo";
import { Props } from "../../types";

export interface IntervalsStateStructure {
  interval: number;
  set: FetchSessionsResponseSpec | string;
}

interface CalendarProps extends Props {
  sessions: any[];
  sessionIntervals: IntervalsStateStructure[];
  setSessionIntervals: (session: any) => void;
  editMode?: boolean;
  createMode?: boolean;
  subscribed?: boolean;
  selectedSession?: FetchSessionsResponseSpec;
}

const MAXIMUM_ALLOWED_NUMBER_OF_DAYS_IN_A_PLAN = 45;

function PlanCalendar({
  sessions: _sessions,
  sessionIntervals: _sessionIntervals,
  setSessionIntervals: _setSessionIntervals,
  editMode,
  createMode,
  selectedSession,
  subscribed,
  navigation,
}: CalendarProps) {
  const [showSession, setShowSession] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const infoSheet = useRef<RBSheet>(null);
  const [sessionIntervals, setSessionIntervals] = useState(
    _sessionIntervals.length
      ? _sessionIntervals
      : ([] as IntervalsStateStructure[])
  );
  const [largestDay, setLargestDay] = useState(0);

  function handleSelect(day: number) {
    if (!editMode && !createMode && !subscribed) return;

    const index = sessionIntervals.findIndex((v) => v?.interval === day);
    const id =
      typeof sessionIntervals[index]?.set === "string"
        ? sessionIntervals[index]?.set
        : (sessionIntervals[index]?.set as FetchSessionsResponseSpec)?.id;

    if (index !== -1) {
      if (
        (!!selectedSession?.id && id === selectedSession?.id) ||
        !!sessionIntervals[index]?.interval
      ) {
        setSessionIntervals(
          sessionIntervals.filter((value) => value?.interval !== day)
        );
      }
    } else {
      const sessionIntervalsCopy = !!sessionIntervals.length
        ? [...sessionIntervals]
        : [];

      sessionIntervalsCopy.push({
        interval: day,
        set: selectedSession as FetchSessionsResponseSpec,
      });

      console.log(sessionIntervalsCopy);

      setSessionIntervals(sessionIntervalsCopy);
    }
  }

  function handleLongPress(day: number) {
    const index = sessionIntervals.findIndex((v) => v?.interval === day);

    if (index !== -1) {
      setSelectedDay(day);
      setShowSession(true);
    }
  }

  useEffect(() => {
    sessionIntervals.forEach((value) => {
      if (value.interval > largestDay) setLargestDay(value.interval);
    });
  }, [sessionIntervals]);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={styles.calendarHeader}>
        {editMode || createMode ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name={"scatter-plot"} size={32} color="black" />
            <Text style={{ color: "black", fontSize: 20 }}>
              {" "}
              Session Plotter
            </Text>
          </View>
        ) : (
          <Text style={{ color: "black", fontSize: 20 }}>Plan Calendar</Text>
        )}
        <TouchableOpacity onPress={() => infoSheet?.current?.open()}>
          <MaterialIcons name="info-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.calendarBody}>
        {editMode || createMode || !subscribed ? (
          <>
            {[
              ...new Array(MAXIMUM_ALLOWED_NUMBER_OF_DAYS_IN_A_PLAN).keys(),
            ].map((item, i) => (
              <TouchableOpacity
                activeOpacity={
                  !editMode && !createMode && !subscribed ? 1 : 0.4
                }
                key={i}
                style={[styles.day]}
                onPress={() => {
                  handleSelect(i + 1);
                }}
                onLongPress={() => {
                  handleLongPress(i + 1);
                }}
              >
                <View
                  style={{
                    transform: [{ rotate: "45deg" }],
                    padding: 5,
                    width: 35,
                    height: 35,
                    borderColor:
                      sessionIntervals.findIndex(
                        (v) => v?.interval === i + 1
                      ) !== -1
                        ? i % 2 === 0
                          ? "rgba(255,255,255,0.1)"
                          : (typeof sessionIntervals[
                              sessionIntervals.findIndex(
                                (v) => v?.interval === i + 1
                              )
                            ]?.set === "string"
                              ? sessionIntervals[
                                  sessionIntervals.findIndex(
                                    (v) => v?.interval === i + 1
                                  )
                                ]?.set
                              : (
                                  sessionIntervals[
                                    sessionIntervals.findIndex(
                                      (v) => v?.interval === i + 1
                                    )
                                  ]?.set as FetchSessionsResponseSpec
                                )?.id) !== selectedSession?.id
                          ? "rgb(217,125,84)"
                          : "teal"
                        : "transparent",
                    borderWidth: 1,
                    backgroundColor:
                      i % 2 === 0 &&
                      sessionIntervals.findIndex(
                        (v) => v?.interval === i + 1
                      ) !== -1
                        ? (typeof sessionIntervals[
                            sessionIntervals.findIndex(
                              (v) => v?.interval === i + 1
                            )
                          ]?.set === "string"
                            ? sessionIntervals[
                                sessionIntervals.findIndex(
                                  (v) => v?.interval === i + 1
                                )
                              ]?.set
                            : (
                                sessionIntervals[
                                  sessionIntervals.findIndex(
                                    (v) => v?.interval === i + 1
                                  )
                                ]?.set as FetchSessionsResponseSpec
                              )?.id) !== selectedSession?.id
                          ? "rgb(217,125,84)"
                          : "teal"
                        : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      transform: [{ rotate: "-45deg" }],
                      color:
                        i % 2 === 0 &&
                        sessionIntervals.findIndex(
                          (v) => v?.interval === i + 1
                        ) !== -1
                          ? "white"
                          : "black",
                    }}
                  >
                    {i + 1}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : null}
      </View>

      <RBSheet
        ref={infoSheet}
        height={250}
        closeOnDragDown={true}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <View
          style={{
            padding: 20,
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 20, fontStyle: "italic", textAlign: "justify" }}
          >
            This is an interval planner. Enable edit mode, select an exercise
            and plot the days on which it will be performed with in the limit of
            45 days.
          </Text>
          <Text />
          <Text style={{ fontSize: 16 }}>
            NB: A plan can only go as far as a month and a half.
          </Text>
        </View>
      </RBSheet>

      <Modal
        isOpen={showSession}
        onClose={() => {
          setShowSession(false);
          setSelectedDay(-1);
        }}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>
              Day {selectedDay} of {largestDay}
            </Text>
          </Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <SessionCard
              sessionMeta={sessionIntervals.find(
                (session) => session.interval === selectedDay
              )}
              onSessionSelect={() => {
                setShowSession(false);
                navigation.navigate("SessionView");
              }}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowSession(false);
                setSelectedDay(-1);
              }}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarTitle: {
    padding: 10,
    margin: 10,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  calendarBody: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "98%",
    marginHorizontal: "1%",
  },
  day: {
    height: 60,
    width: "14%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  modalButton: {
    width: "60%",
    marginVertical: 20,
    marginHorizontal: "20%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "rgb(110,140,160)",
  },
});

export default PlanCalendar;
