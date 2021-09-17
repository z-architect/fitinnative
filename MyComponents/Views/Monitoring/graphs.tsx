import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { StyleSheet } from "react-native";
import FontAwesome1 from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Logo from "../../../MyAssets/splash_logo.svg";
import { Badge } from "react-native-elements";
import { changePlanType } from "../../Redux/globalsSlice";
import { PlanType } from "../../../api/spec";
import { Props } from "../../types";
import { Tracking } from "../../../api/interface/Tracking";
import { Measurement } from "../../../api/interface/Measurement";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { useAppSelector } from "../../Redux/hooks";
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

enum TimeScale {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ANNUALLY = "ANNUALLY",
}

enum MeasurementType {
  WEIGHT = "mass",
  HEIGHT = "height",
  BMI = "bmi",
  HEART_RATE = "heartRate",
  BODY_FAT = "bodyFat",
}

const labels = {
  [`${TimeScale.WEEKLY}`]: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  [`${TimeScale.MONTHLY}`]: ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"],
  [`${TimeScale.ANNUALLY}`]: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const Engagements = ({ navigation }: Props) => {
  const dailyGlassesOfWater = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user
        .dailyGlassesOfWater
  );
  const dailyHoursOfSleep = useAppSelector(
    (state) =>
      state.profiles.profiles[state.profiles.activeProfile].user
        .dailyHoursOfSleep
  );

  const [selectedTimeScale, setSelectedTimeScale] = useState(TimeScale.MONTHLY);
  const [selectedMeasurementType, setSelectedMeasurementType] = useState(
    MeasurementType.WEIGHT
  );
  const [engagements, setEngagements] = useState<any>([]);
  const [measurements, setMeasurements] = useState<any>([]);

  const [goalsData, setGoalsData] = useState({
    labels: ["WATER", "SLEEP"],
    data: [0, 0],
  });

  const [caloriesData, setCaloriesData] = useState({
    labels: labels[selectedTimeScale],
    datasets: [{ data: [...Array(labels[selectedTimeScale].length).fill(0)] }],
  });

  const [measurementData, setMeasurementData] = useState({
    labels: labels[selectedTimeScale],
    datasets: [{ data: [...Array(labels[selectedTimeScale].length).fill(0)] }],
  });

  function handleTimeScaleSelection(timeScale: TimeScale) {
    setSelectedTimeScale(timeScale);
  }

  function handleMeasurementTypeSelection(measurementType: MeasurementType) {
    setSelectedMeasurementType(measurementType);
  }

  async function fetchEngagementHistory() {
    const result = await Tracking.getEngagementHistory();
    if (!!result?.data) setEngagements([...result?.data]);
  }

  async function fetchMeasurementHistory() {
    const result = await Measurement.fetchMeasurementHistory({});
    if (!!result?.data) setMeasurements([...result?.data]);
  }

  useEffect(() => {
    void fetchEngagementHistory();
    void fetchMeasurementHistory();
  }, [selectedMeasurementType, selectedTimeScale]);

  useEffect(() => {
    const _goalsData = [0, 0];
    const totalWaterGoal =
      dailyGlassesOfWater *
      (selectedTimeScale === TimeScale.WEEKLY
        ? 7
        : selectedTimeScale === TimeScale.MONTHLY
        ? 30
        : 365);
    const totalSleepGoal =
      dailyHoursOfSleep *
      (selectedTimeScale === TimeScale.WEEKLY
        ? 7
        : selectedTimeScale === TimeScale.MONTHLY
        ? 30
        : 365);

    engagements.forEach((engagement: any) => {
      _goalsData[0] += engagement.glassesOfWater ?? 0;
      _goalsData[1] += engagement.hoursOfSleep ?? 0;
    });

    setGoalsData({
      ...goalsData,
      data: [_goalsData[0] / totalWaterGoal, _goalsData[1] / totalSleepGoal],
    });
  }, [engagements]);

  useEffect(() => {
    const _caloriesData: number[] = [];
    const dateFloor = new Date(
      Date.now() -
        (selectedTimeScale === TimeScale.WEEKLY
          ? 7
          : selectedTimeScale === TimeScale.MONTHLY
          ? 30
          : 365) *
          86400000
    );

    engagements.forEach((engagement: any) => {
      if (dateFloor <= new Date(engagement.createdAt)) {
        if (!!engagement.caloriesBurned)
          _caloriesData.push(engagement.caloriesBurned);
        else _caloriesData.push(0);
      } else _caloriesData.push(0);
    });

    while (_caloriesData.length <= labels[selectedTimeScale].length) {
      _caloriesData.push(0);
    }

    setCaloriesData({
      ...caloriesData,
      datasets: [{ data: _caloriesData }],
    });
  }, [engagements]);

  useEffect(() => {
    const _measurementsData: number[] = [];
    const dateFloor = new Date(
      Date.now() -
        (selectedTimeScale === TimeScale.WEEKLY
          ? 7
          : selectedTimeScale === TimeScale.MONTHLY
          ? 30
          : 365) *
          86400000
    );

    measurements.forEach((measurement: any) => {
      if (dateFloor <= new Date(measurement.createdAt)) {
        if (!!measurement[selectedMeasurementType])
          _measurementsData.push(measurement[selectedMeasurementType]);
        else _measurementsData.push(0);
      } else _measurementsData.push(0);
    });

    while (_measurementsData.length <= labels[selectedTimeScale].length) {
      _measurementsData.push(0);
    }

    setMeasurementData({
      ...measurementData,
      datasets: [{ data: _measurementsData }],
    });
  }, [measurements]);

  useEffect(() => {}, [engagements, measurements]);

  useEffect(() => {
    setCaloriesData({ ...caloriesData, labels: labels[selectedTimeScale] });
    setMeasurementData({
      ...measurementData,
      labels: labels[selectedTimeScale],
    });
  }, [selectedTimeScale]);

  useEffect(() => {
    // console.log({ measurementData });
  }, [measurementData]);

  useEffect(() => {
    // console.log({ caloriesData });
  }, [caloriesData]);

  useEffect(() => {
    // console.log({ goalsData });
  }, [goalsData]);

  return (
    <>
      <View style={styles.head}>
        <View style={{ justifyContent: "center", marginLeft: 20 }}>
          <Text style={{ fontSize: 22 }}>My Plans</Text>
        </View>

        {/*<View*/}
        {/*  style={{*/}
        {/*    flex: 1,*/}
        {/*    alignItems: "center",*/}
        {/*    // paddingTop: 17,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Logo width={80} />*/}
        {/*</View>*/}

        <View
          style={{ alignItems: "flex-end", justifyContent: "center", flex: 1 }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notifications");
            }}
          >
            <MaterialIcons name="notifications" size={28} color="black" />
            {![].length ? null : (
              <Badge
                badgeStyle={{
                  borderRadius: 9,
                  height: 10,
                  minWidth: 0,
                  width: 10,
                }}
                textStyle={{ fontSize: 10, paddingHorizontal: 0 }}
                // value={notifications.length}
                status="error"
                containerStyle={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.timeIndicatorButton,
            {
              borderColor:
                selectedTimeScale === TimeScale.WEEKLY ? "lightgreen" : "black",
            },
          ]}
          onPress={() => {
            handleTimeScaleSelection(TimeScale.WEEKLY);
          }}
        >
          <Text style={styles.timeIndicatorButtonContainer}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeIndicatorButton,
            {
              borderColor:
                selectedTimeScale === TimeScale.MONTHLY
                  ? "lightgreen"
                  : "black",
            },
          ]}
          onPress={() => {
            handleTimeScaleSelection(TimeScale.MONTHLY);
          }}
        >
          <Text style={styles.timeIndicatorButtonContainer}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeIndicatorButton,
            {
              borderColor:
                selectedTimeScale === TimeScale.ANNUALLY
                  ? "lightgreen"
                  : "black",
            },
          ]}
          onPress={() => {
            handleTimeScaleSelection(TimeScale.ANNUALLY);
          }}
        >
          <Text style={styles.timeIndicatorButtonContainer}>Annually</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentWrapper}
      >
        <View style={[styles.textContainer, { paddingBottom: 20 }]}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 20,
              color: "black",
            }}
          >
            Goal Progress
          </Text>
        </View>

        <ProgressChart
          data={goalsData}
          width={x}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          hideLegend={false}
        />

        <View style={[styles.textContainer, { paddingVertical: 20 }]}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 20,
              color: "black",
            }}
          >
            Calories Burned
          </Text>
        </View>

        <BarChart
          data={caloriesData as ChartData}
          width={x}
          height={390}
          yAxisSuffix=" kcal"
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              paddingHorizontal: 10,
              width: "100%",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={70}
        />

        <View style={[styles.textContainer, { paddingVertical: 20 }]}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 20,
              color: "black",
            }}
          >
            Measurements
          </Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            justifyContent: "space-evenly",
            paddingBottom: 15,
            flexDirection: "row",
            elevation: 0,
            backgroundColor: "transparent",
          }}
          style={[{}]}
        >
          <TouchableOpacity
            style={[
              styles.timeIndicatorButton,
              {
                marginHorizontal: 10,
                borderColor:
                  selectedMeasurementType === MeasurementType.WEIGHT
                    ? "rgba(217,125,84,1)"
                    : "black",
              },
            ]}
            onPress={() => {
              handleMeasurementTypeSelection(MeasurementType.WEIGHT);
            }}
          >
            <Text style={styles.timeIndicatorButtonContainer}>Weight</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeIndicatorButton,
              {
                marginHorizontal: 10,
                borderColor:
                  selectedMeasurementType === MeasurementType.HEIGHT
                    ? "rgba(217,125,84,1)"
                    : "black",
              },
            ]}
            onPress={() => {
              handleMeasurementTypeSelection(MeasurementType.HEIGHT);
            }}
          >
            <Text style={styles.timeIndicatorButtonContainer}>Height</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeIndicatorButton,
              {
                marginHorizontal: 10,
                borderColor:
                  selectedMeasurementType === MeasurementType.BMI
                    ? "rgba(217,125,84,1)"
                    : "black",
              },
            ]}
            onPress={() => {
              handleMeasurementTypeSelection(MeasurementType.BMI);
            }}
          >
            <Text style={styles.timeIndicatorButtonContainer}>BMI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeIndicatorButton,
              {
                marginHorizontal: 10,
                borderColor:
                  selectedMeasurementType === MeasurementType.HEART_RATE
                    ? "rgba(217,125,84,1)"
                    : "black",
              },
            ]}
            onPress={() => {
              handleMeasurementTypeSelection(MeasurementType.HEART_RATE);
            }}
          >
            <Text style={styles.timeIndicatorButtonContainer}>Heart Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeIndicatorButton,
              {
                marginHorizontal: 10,
                borderColor:
                  selectedMeasurementType === MeasurementType.BODY_FAT
                    ? "rgba(217,125,84,1)"
                    : "black",
              },
            ]}
            onPress={() => {
              handleMeasurementTypeSelection(MeasurementType.BODY_FAT);
            }}
          >
            <Text style={styles.timeIndicatorButtonContainer}>Body Fat</Text>
          </TouchableOpacity>
        </ScrollView>

        <LineChart
          data={measurementData as LineChartData}
          width={Dimensions.get("window").width} // from react-native
          height={390}
          yAxisLabel="kcal"
          // yAxisSuffix="kcal"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={70}
        />

        {/**
         * Do not touch the following empty view or you will be fired
         */}
        <View style={{ height: 35 }} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentWrapper: { paddingTop: 10, paddingBottom: 60 },
  timeIndicatorButton: {
    borderWidth: 1,
    borderRadius: 17,
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  timeIndicatorButtonContainer: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(255, 253,253,1)",
    elevation: 5,
  },
  head: {
    height: y * 0.085,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingRight: 20,
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textContainer: {
    paddingHorizontal: 17,
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default Engagements;
