import { View } from "react-native";
import React, { useEffect, useState } from "react";
// @ts-ignore
import ScrollPicker from "react-native-wheel-scroll-picker";

interface ScrollSelectorProps<T> {
  data: T[];
  onValueChange: (value: T) => void;
  focusIndex: number;
  width?: number;
}

function ScrollSelector<T>({
  data,
  onValueChange,
  focusIndex,
  width,
}: ScrollSelectorProps<T>) {
  const [pickerData, setPickerData] = useState<T[]>([]);

  useEffect(() => {
    setPickerData(data);
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: width || 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollPicker
          dataSource={pickerData}
          selectedIndex={focusIndex}
          onValueChange={(data: T, selectedIndex: number) => {
            onValueChange(data);
          }}
          wrapperHeight={90}
          wrapperWidth={width || 50}
          wrapperBackground={"#FFFFFF"}
          itemHeight={30}
          highlightColor={"#d8d8d8"}
          highlightBorderWidth={1}
          activeItemColor={"black"}
          itemColor={"#B4B4B4"}
        />
      </View>
    </View>
  );
}

export default ScrollSelector;
