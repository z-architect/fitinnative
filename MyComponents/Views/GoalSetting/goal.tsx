import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'native-base';
import SessionCard from '../Plans/sessioncard';
import { Props } from '../../types';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Goal = ({ navigation, route }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.title}>
                    <Text style={{ fontSize: 28, fontWeight: "bold", paddingHorizontal: 20 }}>Goal Setting</Text>
                </View>
            </TouchableOpacity>


            <View style={styles.scrollwindow}>
                <ScrollView contentContainerStyle={styles.scroll}>



                    <TouchableOpacity style={styles.goalcard}>


                        <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.ImageBackground} imageStyle={{ borderRadius: 20 }}>

                            <Text style={styles.goaltext}>Bulking UP</Text>

                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.goalcard}>
                        <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.ImageBackground} imageStyle={{ borderRadius: 20 }}>
                            <Text style={styles.goaltext}>Losing Weight</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.goalcard}>
                        <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.ImageBackground} imageStyle={{ borderRadius: 20 }}>

                            <Text style={styles.goaltext}>Maintanance</Text>

                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.goalcard}>
                        <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.ImageBackground} imageStyle={{ borderRadius: 20 }}>

                            <Text style={styles.goaltext}>Athleticism</Text>

                        </ImageBackground>
                    </TouchableOpacity>

                </ScrollView>

            </View>
            <TouchableOpacity style={styles.getStarted} onPress={() => { navigation.navigate("Plan") }}>
                <View>
                    <Text style={{ fontSize: 30, color: "white" }}>Get Started </Text>
                </View>

                <AntDesign name="right" color="white" size={55} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        // height: y,
        // width: x
    },
    title: {
        // padding: 20,
        // margin: 10,
        height: y * 0.08,
        backgroundColor: "rgb(241,243,245)",
        justifyContent: "center",

    },
    scrollwindow: {
        height: y * 0.8,
        marginHorizontal: x * 0.05,
        // borderWidth: 1,


    },
    scroll: {
        alignItems: "center",
        // backgroundColor: "pink"
    },
    goalcard: {
        height: y * 0.25,
        width: x * 0.8,
        // borderWidth: 1,
        margin: 20,
        borderRadius: 20,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
    },
    getStarted: {
        backgroundColor: "rgb(217,125,84)",
        height: y * 0.08,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    goaltext: {
        color: "white",
        fontSize: 35,
        margin: 20
    },

    ImageBackground: {
        flex: 1,
        borderRadius: 10,
        justifyContent: "flex-end",

    }
})
export default Goal;