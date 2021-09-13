import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// @ts-ignore
import ScrollPicker from "react-native-wheel-scroll-picker";

interface TimeSelectorProps {
  totalTimeInSeconds?: number;
  setTotalTimeInSeconds: (seconds: number) => void;
  setSelections: (selections: number[]) => void;
  minuteData: string[];
  secondData: string[];
  minuteSelectedIndex?: number;
  secondSelectedIndex?: number;
}

function TimeSelector({
  totalTimeInSeconds,
  setTotalTimeInSeconds,
  minuteData,
  secondData,
  minuteSelectedIndex,
  secondSelectedIndex,
  setSelections,
}: TimeSelectorProps) {
  const [minutes, setMinutes] = useState(
    !!totalTimeInSeconds
      ? totalTimeInSeconds < 60
        ? 0
        : Math.floor((totalTimeInSeconds as number) / 60)
      : 0
  );
  const [seconds, setSeconds] = useState(
    !!totalTimeInSeconds
      ? totalTimeInSeconds >= 60
        ? (totalTimeInSeconds as number) % 60
        : totalTimeInSeconds
      : 0
  );

  useEffect(() => {
    setTotalTimeInSeconds(minutes * 60 + seconds);
    setSelections([
      minuteData.findIndex((minute) => Number.parseInt(minute) === minutes),
      secondData.findIndex((second) => Number.parseInt(second) === seconds),
    ]);
  }, [seconds, minutes]);

  return (
    <>
      <View style={styles.timeSelectorContainer}>
        <ScrollPicker
          dataSource={minuteData}
          selectedIndex={minuteSelectedIndex || 0}
          onValueChange={(data: string, selectedIndex: number) => {
            setMinutes(Number.parseInt(data));
          }}
          wrapperHeight={90}
          wrapperWidth={50}
          wrapperBackground={"#FFFFFF"}
          itemHeight={30}
          highlightColor={"#d8d8d8"}
          highlightBorderWidth={1}
          activeItemColor={"black"}
          itemColor={"#B4B4B4"}
        />
        <View style={{ marginHorizontal: 5, alignItems: "center" }}>
          <Text style={{ color: "black", fontWeight: "bold" }}>:</Text>
        </View>
        <ScrollPicker
          dataSource={secondData}
          selectedIndex={secondSelectedIndex || 29}
          onValueChange={(data: string, selectedIndex: number) => {
            setSeconds(Number.parseInt(data));
          }}
          wrapperHeight={90}
          wrapperWidth={50}
          wrapperBackground={"#FFFFFF"}
          itemHeight={30}
          highlightColor={"#d8d8d8"}
          highlightBorderWidth={1}
          activeItemColor={"black"}
          itemColor={"#B4B4B4"}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  timeSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default TimeSelector;
