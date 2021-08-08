import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base';
import { borderRadius } from 'styled-system';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Plans = () => {
    const [Meal, setMeal] = useState(true);
    return (
        <View style={styles.container}>
            <View style={styles.buttonscontainer}>
                <TouchableOpacity style={[styles.mealbutton, { borderBottomWidth: Meal ? 3 : 0, width: Meal ? "55%" : "45%" }]} onPress={() => { setMeal(true) }}>
                    <Text style={styles.buttontext}>
                        Meal
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activitybutton, { borderBottomWidth: Meal ? 0 : 3, width: Meal ? "45%" : "55%" }]} onPress={() => { setMeal(false) }}>
                    <Text style={styles.buttontext}>
                        Activity
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textcontainer}>
                <Text style={{ padding: 10 }}>
                    Featured Plans
                </Text>
                <Text>
                    See All Plans <AntDesign name="right" color="grey" size={28} />
                </Text>
            </View>

            <ScrollView style={{ width: x, height: 350, backgroundColor: "yellow" }} horizontal={true}>
                <ImageBackground source={require('../../MyAssets/undraw.png')} style={{ width: x * 0.8, height: 250, backgroundColor: "pink", margin: 20 }} imageStyle={{ borderRadius: 10 }}>
                    <Text>Hello</Text>
                </ImageBackground>
                <ImageBackground source={require('../../MyAssets/undraw.png')} style={{ width: x * 0.8, height: 250, backgroundColor: "pink", margin: 20 }} imageStyle={{ borderRadius: 10 }}>
                    <Text>Hello</Text>
                </ImageBackground>
                <ImageBackground source={require('../../MyAssets/undraw.png')} style={{ width: x * 0.8, height: 250, backgroundColor: "pink", margin: 20 }} imageStyle={{ borderRadius: 10 }}>
                    <Text>Hello</Text>
                </ImageBackground>
            </ScrollView>
            <Text>Current Plan</Text>
            <View>
                <ImageBackground source={require('../../MyAssets/undraw.png')} style={{ width: x * 0.8, height: 250, backgroundColor: "pink", margin: 20 }} imageStyle={{ borderRadius: 10 }}>
                    <Text>Hello</Text>
                </ImageBackground>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: x,
        height: y,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "white"
    },
    buttonscontainer: {
        height: "10%",
        flexDirection: "row",

    },
    textcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttontext: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    mealbutton: {

        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "rgb(217,125,84)",
    },
    activitybutton: {

        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "rgb(217,125,84)",

    },
})
export default Plans;