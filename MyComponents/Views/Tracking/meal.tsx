import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions, Alert, Touchable } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'native-base';

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const MealModal = () => {
    const [Modal, SetModal] = useState(true);
    const [Tracking, SetTracking] = useState("Vitals")
    return (
        <View style={styles.container}>
            <View style={styles.big}>
                <Text>Hellow world</Text>
                <TouchableOpacity onPress={() => { SetModal(true) }}>
                    <Text>Something</Text>
                </TouchableOpacity>
            </View>

            {

                Modal ?
                    <>
                        <View style={styles.overlay}>
                            <View style={styles.backbuttonContainer}>
                                <TouchableOpacity onPress={() => { SetModal(false) }}>
                                    <AntDesign name="left" size={32} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconContainer}>
                                <AntDesign name={(Tracking === "Meal") ? "frown" : (Tracking === "Sleep") ? "frown" : "frown"} size={142} color="white" />
                            </View >
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.buttons} onPress={() => { }}>
                                    <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}> {(Tracking === "Meal") ? "Meal" : (Tracking === "Sleep") ? "Sleep" : "Vitals"} </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttons}>
                                    <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}> {(Tracking === "Meal") ? "Snack" : (Tracking === "Sleep") ? "Cardio" : "Weights"} </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttons}>
                                    <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>{(Tracking === "Meal") ? "Drink" : (Tracking === "Sleep") ? "Lift" : "Girth"} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                    :
                    <></>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(100,100,100,0.6)',
        justifyContent: "center",
        alignItems: "center"
    },
    backbuttonContainer: {
        flexDirection: "row",
        height: y * 0.05,
        width: x,
        paddingLeft: 20

    },
    iconContainer: {
        height: y * 0.30,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "pink"
    },
    buttonsContainer: {
        height: y * 0.5,
        width: x,
        // backgroundColor: "yellow"
    },
    big: {
        height: "100%",
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "rgba(0,0,0,0)",
        borderRadius: 5,
        width: "70%",
        height: 80,
        marginHorizontal: "15%",
        marginVertical: 25,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default MealModal;
//{ (Tracking === "Meal")? "" : (Tracking === "Sleep")? "" : ""}