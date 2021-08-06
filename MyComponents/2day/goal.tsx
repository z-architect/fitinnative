import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'native-base';

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Goal = () => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>Goal Setting</Text>
            </View>
            <View style={styles.scrollwindow}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.goalcard}>
                        <ImageBackground source={require("../../MyAssets/runninman.jpg")} resizeMode="cover">
                            <View style={{ justifyContent: "flex-end" }}>

                                <Text style={styles.goaltext}>
                                    Fit In
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.goalcard}>
                        <ImageBackground source={require("../../MyAssets/runninman.jpg")} resizeMode="cover" >
                            <View style={{ justifyContent: "flex-end" }}>

                                <Text style={styles.goaltext}>
                                    Fit In
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.goalcard}>
                        <ImageBackground source={require("../../MyAssets/runninman.jpg")} resizeMode="cover" >
                            <View style={{ justifyContent: "flex-end" }}>

                                <Text style={styles.goaltext}>
                                    Fit In
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.goalcard}>
                        <ImageBackground source={require("../../MyAssets/runninman.jpg")} resizeMode="cover">
                            <View style={{ justifyContent: "flex-end" }}>

                                <Text style={styles.goaltext}>
                                    Fit In
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.getStarted}>
                <View>
                    Get Started
                </View>
                <AntDesign name="left" color="white" size={26} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    title: {
        // padding: 20,
        // margin: 10,
        height: y * 0.1
    },
    scrollwindow: {
        height: y * 0.8
    },
    scroll: {

    },
    goalcard: {
        height: y * 0.25,
        width: x * 0.8,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
    },
    getStarted: {
        backgroundColor: "rgb(217,125,84)",
        height: y * 0.1
    },
    goaltext: {
        color: "white",
        fontSize: 35
    },
    image: {

    }
})
export default Goal;


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Input } from 'native-base';
// const x = Dimensions.get("window").width;
// const y = Dimensions.get("window").height;

// const Auth = () => {
//     return (
//         <View style={styles.}>

//         </View>
//     )
// }
// const styles = StyleSheet.create({

// })
// export default Auth;