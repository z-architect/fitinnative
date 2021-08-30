import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import VitalsCard from "./Cards/VitalsCard";
import { Props } from "../../types";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Vitals = ({ navigation }: Props) => {
  const [firstTimeToVitals, setFirstTimeToVitals] = useState(false);
  const [editMode, setEditMode] = useState(
    firstTimeToVitals ? firstTimeToVitals : false
  );

  const [height, setHeight] = useState("0");
  const [mass, setMass] = useState("0");
  const [bmi, setBMI] = useState("0");
  const [heartRate, setHeartRate] = useState("0");
  const [bloodPressure, setBloodPressure] = useState("0");
  const [waistSize, setWaistSize] = useState("0");
  const [hipSize, setHipSize] = useState("0");
  const [shoulderSize, setShoulderSize] = useState("0");
  const [armSize, setArmSize] = useState("0");
  const [bloodGlucose, setBloodGlucose] = useState("0");
  const [bodyFat, setBodyFat] = useState("0");
  const [leanMass, setLeanMass] = useState("0");
  const [bmr, setBMR] = useState("0");
  const [tdee, setTDEE] = useState("0");

  async function handleVitalsUpdate() {
    // TODO get elements
    setEditMode(false);
  }

  function calculateBMI() {
    try {
      const _weight = Number.parseFloat(mass);
      const _height = Number.parseFloat(height);
      setBMI((_weight / (_height * _height)).toPrecision(1));
    } catch (e) {}
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ ...styles.title }}>
            {firstTimeToVitals ? "Body Metrics" : "Measurements"}
          </Text>
          {!firstTimeToVitals ? (
            <>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {editMode ? (
                  <>
                    <TouchableOpacity onPress={() => setEditMode(false)}>
                      <AntDesign color="red" size={32} name="close" />
                    </TouchableOpacity>
                    <View style={{ width: 30 }} />
                    <TouchableOpacity onPress={handleVitalsUpdate}>
                      <AntDesign color="green" size={32} name="check" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity onPress={() => setEditMode(true)}>
                    <AntDesign size={32} name="edit" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <>
                <TouchableOpacity
                  onPress={() => {
                    // todo handle skip
                    navigation.navigate("Home");
                  }}
                >
                  <Text style={{ color: "cornflowerblue", fontSize: 20 }}>
                    Skip
                  </Text>
                </TouchableOpacity>
              </>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          scrollEnabled={!firstTimeToVitals}
          contentContainerStyle={styles.cardContainer}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            Basic
          </Text>

          <VitalsCard
            measurement="Height"
            editMode={editMode}
            value={height}
            staticValue={height}
            unit="m"
            descriptor="Height"
            onRecord={(value) => {
              setHeight(value);
              calculateBMI();
            }}
          >
            <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
          </VitalsCard>
          <VitalsCard
            measurement="Weight"
            editMode={editMode}
            value={mass}
            staticValue={mass}
            unit="Kg"
            descriptor="Weight"
            onRecord={(value) => {
              setMass(value);
              calculateBMI();
            }}
          >
            <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
          </VitalsCard>

          {!editMode ? (
            <VitalsCard
              measurement="BMI"
              editMode={editMode}
              value={bmi}
              staticValue={bmi}
              unit="Kg/m²"
              descriptor=""
              onRecord={setMass}
            >
              <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
            </VitalsCard>
          ) : null}

          {!firstTimeToVitals ? (
            <>
              <Text
                style={{
                  marginTop: 7.5,
                  fontSize: 20,
                  fontWeight: "bold",
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                Internal
              </Text>

              <VitalsCard
                measurement="Heart Rate"
                editMode={editMode}
                value={heartRate}
                staticValue={heartRate}
                unit="bpm"
                descriptor="Resting heart rate"
                onRecord={setHeartRate}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement="Blood Pressure"
                editMode={editMode}
                value={bloodPressure}
                staticValue={bloodPressure}
                unit="Pa"
                descriptor="Blood pressure"
                onRecord={setBloodPressure}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement="Blood Glucose"
                editMode={editMode}
                value={bloodGlucose}
                staticValue={bloodGlucose}
                unit="m"
                descriptor="Blood Glucose"
                onRecord={setBloodGlucose}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement="Body Fat"
                editMode={editMode}
                value={bodyFat}
                staticValue={bodyFat}
                unit="m"
                descriptor="Body Fat"
                onRecord={setBodyFat}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement="Lean Mass"
                editMode={editMode}
                value={leanMass}
                staticValue={leanMass}
                unit="m"
                descriptor="Lean Mass"
                onRecord={setLeanMass}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>

              <Text
                style={{
                  marginTop: 7.5,
                  fontSize: 20,
                  fontWeight: "bold",
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                Body figure
              </Text>

              <VitalsCard
                measurement="Waist Size"
                editMode={editMode}
                value={waistSize}
                staticValue={waistSize}
                unit="m"
                descriptor="Waist Size"
                onRecord={setWaistSize}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement="Hip Size"
                editMode={editMode}
                value={hipSize}
                staticValue={hipSize}
                unit="m"
                descriptor="Hip Size"
                onRecord={setHipSize}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement="Arm Size"
                editMode={editMode}
                value={armSize}
                staticValue={armSize}
                unit="m"
                descriptor="Arm Size"
                onRecord={setArmSize}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement="Shoulder Size"
                editMode={editMode}
                value={shoulderSize}
                staticValue={shoulderSize}
                unit="m"
                descriptor="Shoulder Size"
                onRecord={setShoulderSize}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>

              <Text
                style={{
                  marginTop: 7.5,
                  fontSize: 20,
                  fontWeight: "bold",
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                Advanced
              </Text>

              <VitalsCard
                measurement="BMR"
                editMode={editMode}
                value={bmr}
                staticValue={bmr}
                unit="m"
                descriptor="BMR"
                onRecord={setBMR}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement="TDEE"
                editMode={editMode}
                value={tdee}
                staticValue={tdee}
                unit="m"
                descriptor="TDEE"
                onRecord={setTDEE}
              >
                <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              {/**
               * Do not touch the following empty view or you will be fired
               */}
              <View style={{ height: 100 }} />
            </>
          ) : null}
        </ScrollView>
        {firstTimeToVitals ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate("Home");
              // todo handle
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>Next</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: y,
    width: x,
    backgroundColor: "#C8D1D3",
  },
  head: {
    height: y * 0.1,
    width: x,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 15,
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
  cardContainer: {
    minHeight: y,
    width: "100%",
    paddingVertical: 7.5,
    alignItems: "center",
  },
  nextButton: {
    width: "60%",
    marginHorizontal: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    height: y * 0.07,
    borderRadius: 30,
    margin: 20,
    backgroundColor: "rgb(50,71,85)",
  },
});
export default Vitals;
