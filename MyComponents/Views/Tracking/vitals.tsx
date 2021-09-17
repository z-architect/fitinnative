import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import VitalsCard from "./Cards/VitalsCard";
import { Props } from "../../types";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { updateFirstTimeToMeasurements } from "../../Redux/profilesSlice";
import { updateMeasurements } from "../../Redux/measurementsSlice";
import { v4 as uuidv4 } from "uuid";
import { Measurement } from "../../../api/interface";

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;


import strings from "./strings";
import { Language } from "../../Redux/profilesSlice";


const Vitals = ({ navigation }: Props) => {
  const profiles = useAppSelector((state) => state.profiles);
  const measurements = useAppSelector((state) => state.measurements);
  const dispatch = useAppDispatch();
  const language = useAppSelector(state => state.profiles.profiles[state.profiles.activeProfile]?.settings?.language);
  const [firstTimeToMeasurements] = useState(
    profiles.profiles[profiles.activeProfile].firstTimeToMeasurements
  );
  const [editMode, setEditMode] = useState(
    firstTimeToMeasurements ? firstTimeToMeasurements : false
  );

  const [height, setHeight] = useState(
    `${measurements.measurements[measurements.currentMeasurement].height}`
  );
  const [mass, setMass] = useState(
    `${measurements.measurements[measurements.currentMeasurement].mass}`
  );
  const [bmi, setBMI] = useState(
    `${measurements.measurements[measurements.currentMeasurement].bmi}`
  );
  const [heartRate, setHeartRate] = useState(
    `${measurements.measurements[measurements.currentMeasurement].heartRate}`
  );
  const [bloodPressure, setBloodPressure] = useState(
    `${measurements.measurements[measurements.currentMeasurement].bloodPressure
    }`
  );
  const [waistSize, setWaistSize] = useState(
    `${measurements.measurements[measurements.currentMeasurement].waistSize}`
  );
  const [hipSize, setHipSize] = useState(
    `${measurements.measurements[measurements.currentMeasurement].hipSize}`
  );
  const [shoulderSize, setShoulderSize] = useState(
    `${measurements.measurements[measurements.currentMeasurement].shoulderSize}`
  );
  const [armSize, setArmSize] = useState(
    `${measurements.measurements[measurements.currentMeasurement].armSize}`
  );
  const [bloodGlucose, setBloodGlucose] = useState(
    `${measurements.measurements[measurements.currentMeasurement].bloodGlucose}`
  );
  const [bodyFat, setBodyFat] = useState(
    `${measurements.measurements[measurements.currentMeasurement].bodyFat}`
  );
  const [leanMass, setLeanMass] = useState(
    `${measurements.measurements[measurements.currentMeasurement].leanMass}`
  );
  const [bmr, setBMR] = useState(
    `${measurements.measurements[measurements.currentMeasurement].bmr}`
  );
  const [tdee, setTDEE] = useState(
    `${measurements.measurements[measurements.currentMeasurement].tdee}`
  );

  useEffect(() => {
    calculateBMI();
  }, [height, mass]);

  function getVitalsData() {
    return {
      id: uuidv4(),
      height: Number.parseFloat(height),
      mass: Number.parseFloat(mass),
      bmi: Number.parseFloat(bmi),
      heartRate: Number.parseFloat(heartRate),
      bloodPressure: Number.parseFloat(bloodPressure),
      waistSize: Number.parseFloat(waistSize),
      hipSize: Number.parseFloat(hipSize),
      shoulderSize: Number.parseFloat(shoulderSize),
      armSize: Number.parseFloat(armSize),
      bloodGlucose: Number.parseFloat(bloodGlucose),
      bodyFat: Number.parseFloat(bodyFat),
      leanMass: Number.parseFloat(leanMass),
      bmr: Number.parseFloat(bmr),
      tdee: Number.parseFloat(tdee),
      latest: true,
      user: profiles.activeProfile,
    };
  }

  async function updateVitals() {
    const measurements = getVitalsData();
    const result = await Measurement.recordMeasurement(getVitalsData());

    if (!!result?.data) {
      dispatch(updateMeasurements(measurements));
      return true;
    } else return false;
  }

  async function handleVitalsUpdate() {
    await updateVitals();
    setEditMode(false);
  }

  async function handleFirstTimeVitalsSetting() {
    await updateVitals();
    dispatch(updateFirstTimeToMeasurements());
    navigation.navigate("Home");
  }

  function calculateBMI() {
    try {
      const _weight = Number.parseFloat(mass);
      const _height = Number.parseFloat(height);

      if (isNaN(_height) || _height == 0) setBMI("0");
      else setBMI((_weight / (_height * _height)).toFixed(2));
    } catch (e) { }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ ...styles.title }}>
            {firstTimeToMeasurements ? "Body Metrics" :
              strings[language].measurments
            }
          </Text>
          {!firstTimeToMeasurements ? (
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
                    navigation.navigate("Home");
                  }}
                >
                  <Text style={{ color: "cornflowerblue", fontSize: 20 }}>
                    {strings[language].skip}
                  </Text>
                </TouchableOpacity>
              </>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          scrollEnabled={!firstTimeToMeasurements}
          contentContainerStyle={styles.cardContainer}
        >
          {!firstTimeToMeasurements ? (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              {strings[language].basic}
            </Text>
          ) : null}

          <VitalsCard
            measurement={strings[language].height}
            editMode={editMode}
            value={height}
            staticValue={height}
            unit="m"
            descriptor={strings[language].height}
            onRecord={(value) => {
              setHeight(value);
            }}
          >
            <MaterialCommunity name="human-male-height" size={52} color="rgb(50,71,85)" />
          </VitalsCard>
          <VitalsCard
            measurement={strings[language].weight}
            editMode={editMode}
            value={mass}
            staticValue={mass}
            unit="Kg"
            descriptor={strings[language].weight}
            onRecord={(value) => {
              setMass(value);
            }}
          >
            <FontAwesome5 name="weight" size={52} color="rgb(50,71,85)" />
          </VitalsCard>

          {!editMode ? (
            <VitalsCard
              measurement={strings[language].BMI}
              editMode={editMode}
              value={bmi}
              staticValue={bmi}
              unit="Kg/m²"
              descriptor={strings[language].BMI}
              onRecord={setMass}
            >
              <FontAwesome5 name="tape" size={52} color="rgb(50,71,85)" />
            </VitalsCard>
          ) : null}

          {!firstTimeToMeasurements ? (
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
                {strings[language].internal}
              </Text>

              <VitalsCard
                measurement={strings[language].heartrate}
                editMode={editMode}
                value={heartRate}
                staticValue={heartRate}
                unit="bpm"
                descriptor={strings[language].heartrate}
                onRecord={setHeartRate}
              >
                <Fontisto name="heart" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement={strings[language].bloodpressure}
                editMode={editMode}
                value={bloodPressure}
                staticValue={bloodPressure}
                unit="Pa"
                descriptor={strings[language].bloodpressure}
                onRecord={setBloodPressure}
              >
                <MaterialCommunity name="blood-bag" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement={strings[language].bloodglucose}
                editMode={editMode}
                value={bloodGlucose}
                staticValue={bloodGlucose}
                unit="m"
                descriptor={strings[language].bloodglucose}
                onRecord={setBloodGlucose}
              >
                <Fontisto name="blood-test" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement={strings[language].bodyfat}
                editMode={editMode}
                value={bodyFat}
                staticValue={bodyFat}
                unit="m"
                descriptor={strings[language].bodyfat}
                onRecord={setBodyFat}
              >
                <MaterialCommunity name="food-steak" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement={strings[language].leanmass}
                editMode={editMode}
                value={leanMass}
                staticValue={leanMass}
                unit="m"
                descriptor={strings[language].leanmass}
                onRecord={setLeanMass}
              >
                <MaterialCommunity name="food-drumstick-outline" size={52} color="rgb(50,71,85)" />
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
                {strings[language].bodyfigure}
              </Text>

              <VitalsCard
                measurement={strings[language].waistsize}
                editMode={editMode}
                value={waistSize}
                staticValue={waistSize}
                unit="m"
                descriptor={strings[language].waistsize}
                onRecord={setWaistSize}
              >
                <Fontisto name="arrow-resize" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement={strings[language].hipsize}
                editMode={editMode}
                value={hipSize}
                staticValue={hipSize}
                unit="m"
                descriptor={strings[language].hipsize}
                onRecord={setHipSize}
              >
                <MaterialCommunity name="move-resize-variant" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement={strings[language].armsize}
                editMode={editMode}
                value={armSize}
                staticValue={armSize}
                unit="m"
                descriptor={strings[language].armsize}
                onRecord={setArmSize}
              >
                <MaterialCommunity name="arm-flex" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement={strings[language].shouldersize}
                editMode={editMode}
                value={shoulderSize}
                staticValue={shoulderSize}
                unit="m"
                descriptor={strings[language].shouldersize}
                onRecord={setShoulderSize}
              >
                <Ionicons name="body" size={52} color="rgb(50,71,85)" />
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
                {strings[language].advanced}
              </Text>

              <VitalsCard
                measurement={strings[language].bmr}
                editMode={editMode}
                value={bmr}
                staticValue={bmr}
                unit="m"
                descriptor={strings[language].bmr}
                onRecord={setBMR}
              >
                <MaterialCommunity name="ballot-recount" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              <VitalsCard
                measurement={strings[language].tdee}
                editMode={editMode}
                value={tdee}
                staticValue={tdee}
                unit="m"
                descriptor={strings[language].tdee}
                onRecord={setTDEE}
              >
                <MaterialCommunity name="state-machine" size={52} color="rgb(50,71,85)" />
              </VitalsCard>
              {/**
               * Do not touch the following empty view or you will be fired
               */}
              <View style={{ height: 100 }} />
            </>
          ) : null}
        </ScrollView>
        {firstTimeToMeasurements ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleFirstTimeVitalsSetting}
          >
            <Text style={{ color: "white", fontSize: 24 }}>{strings[language].next}</Text>
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
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
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
