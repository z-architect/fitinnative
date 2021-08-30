import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import React from "react";
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
const pieData = [
  {
    name: "Carbs",
    population: 215,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Protein",
    population: 220,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Fats",
    population: 52,
    color: "pink",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Nutrients",
    population: 85,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Fiber",
    population: 119,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};
const pdata = {
  labels: ["Sleep", "Water", "Meal"], // optional
  data: [0.4, 0.6, 0.8],
};
const Comp = ({ navigation }) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ paddingRight: 1 }}
            onPress={() => navigation.pop()}
          >
            <AntDesign name={"left"} size={32} color={"grey"} />
          </TouchableOpacity>
          <Text style={{ ...styles.title }}>Engagements</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <ProgressChart
          data={pdata}
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

        <Text> Amount of callories Burned in total per month</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="kcal"
          // yAxisSuffix="kcal"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
        />

        <Text>Activities</Text>
        <BarChart
          //style={graphStyle}
          data={data}
          width={x}
          height={220}
          yAxisLabel="$"
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
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={30}
        />

        <Text>Nutirion</Text>

        <PieChart
          data={pieData}
          width={x}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
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
    width: x,
    height: y,
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    marginVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
export default Comp;
