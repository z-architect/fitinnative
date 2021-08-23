import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Props } from "../../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LandingPage = ({ navigation, route }: Props) => {

    const getData = async () => {
        navigation.navigate("Onboarding")
        // try {
        //     const value = await AsyncStorage.getItem('@hasOnboarded')
        //     if (value !== null) {
        //         // value previously stored
        //         navigation.navigate("Auth")
        //     }
        //     else {
        //         navigation.navigate("Onboarding")
        //     }
        // } catch (e) {
        //     Alert.alert("somthn wong")
        //     // error reading value
        // }
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={getData}>
                <View style={styles.landingimage}>
                    <ImageBackground source={require("../../../MyAssets/colton.jpg")} resizeMode="cover" style={styles.landingimagebackground}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60 }}>
                            <View style={{
                                transform: [{ rotate: "45deg" }]
                            }}>
                                <AntDesign name="closesquareo" color="white" size={70} />
                            </View>
                            <Text style={styles.landingimagetext}>
                                Fit In
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.lowertextcontainer}>
                    <View style={styles.innerlowertextcontainer}>
                        <Text style={styles.bigtext}>Track Your Active Life Style</Text>
                        <Text style={{ color: "white", fontSize: 40 }}>___</Text>
                        <Text style={styles.smalltext}>With a goal driven approach</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(50,71,85)"

    },
    landingimage: {
        height: "65%"
    },
    landingimagebackground: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    landingimagetext: {
        fontSize: 90,
        color: "white"
    },
    bigtext: {
        fontSize: 38,
        color: "white",
        fontWeight: "bold"

    },
    smalltext: {
        fontSize: 20,
        color: "white"
    },
    lowertextcontainer: {
        height: "35%",
        paddingHorizontal: "15%",
        justifyContent: "center",
        alignItems: "center",

    },
    innerlowertextcontainer: {
        // borderWidth: 2,
        // borderColor: "red"
    }
})
export default LandingPage;