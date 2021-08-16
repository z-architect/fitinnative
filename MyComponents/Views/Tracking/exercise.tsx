

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontawesom from 'react-native-vector-icons/FontAwesome'
import { Input } from 'native-base';


const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Exercise = () => {
    return (
        <ImageBackground source={require("../../../MyAssets/backgroundimage2.png")} resizeMode="cover" style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity>
                    <AntDesign name="left" size={32} color="white" />
                </TouchableOpacity>

                <Text style={{ color: "white" }}>CURRENT ACTIVITY</Text>

                <TouchableOpacity>
                    <AntDesign name="infocirlceo" size={32} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.contentconatainer}>
                <View style={styles.gifcircle}>
                </View>

                <View style={styles.sessionnamecontainer} >
                    <Text style={styles.sessionname}>Medicine-ball Push-up </Text>
                </View>

                <View style={styles.outercircle}>
                    <View style={styles.innercircle}>
                        <View style={styles.innermostcircle}>
                            <Text style={{ color: "white", fontSize: 50 }}>2:30</Text>
                            <Text style={{ color: "white", fontSize: 22 }}>__</Text>
                            <Text style={{ color: "white", fontSize: 20 }}>Minutes</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.upcomingcontainer}>
                    <Text style={{ color: "white", marginVertical: 5, fontSize: 18, fontWeight: "bold" }}> UP COMING </Text>
                    <Text style={{ color: "white", marginVertical: 5, fontSize: 22, fontWeight: "bold" }}> TRX Body-Row </Text>
                    <Text style={{ color: "white", marginVertical: 5, fontSize: 20 }}> Pistol Squats </Text>
                    <Text style={{ color: "white", marginVertical: 5, fontSize: 18 }}> Bicycles </Text>
                </View>
            </View>

            <View style={styles.buttonscontainer}>
                <TouchableOpacity>
                    <AntDesign name="left" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playpause}>
                    <Fontawesom name="pause" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="right" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        height: y,
        width: x,
        backgroundColor: "pink",
        justifyContent: "space-between"

    },
    head: {
        height: y * 0.1,
        width: x,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "white",
        paddingHorizontal: 15
    },
    sessionnamecontainer: {
        marginVertical: 15
    },
    contentconatainer: {
        alignItems: "center",

    },
    gifcircle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "white",

    },
    sessionname: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22
    },
    innermostcircle: {
        backgroundColor: "rgba(255,255,255,0.3)",
        justifyContent: "center",
        alignItems: "center",
        height: y * 0.23,
        width: y * 0.23,
        borderRadius: y * 0.23 * 0.5
    },
    innercircle: {
        justifyContent: "center",
        alignItems: "center",
        height: y * 0.26,
        width: y * 0.26,
        borderRadius: y * 0.26 * 0.5,
        borderWidth: 4,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderColor: "white"
    },
    outercircle: {
        justifyContent: "center",
        alignItems: "center",
        height: y * 0.29,
        width: y * 0.29,
        borderRadius: y * 0.29 * 0.5,
        borderWidth: 8,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: "orange"
    },
    upcomingcontainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 50
    },
    buttonscontainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    },
    playpause: {
        backgroundColor: "rgba(255,255,255,0.5)",
        height: 80,
        width: 80,
        borderRadius: 40,
        margin: 40,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default Exercise;
