import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Input } from 'native-base';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Signin = () => {
    const [authType, setauthType] = useState(true);
    return (
        <View style={styles.container}>

            <View style={styles.tophalfcontainer}>
                <View style={styles.logocontainer}>
                    <View style={{
                        transform: [{ rotate: "45deg" }]
                    }}>
                        <AntDesign name="closesquareo" color="white" size={60} />
                    </View>
                    <Text style={styles.logotext}>Fit in</Text>
                </View>
                <View style={styles.lowertextcontainer}>
                    <View style={styles.innerlowertextcontainer}>
                        <Text style={styles.bigtext}>Create a New Account</Text>
                        <Text style={{ color: "white", fontSize: 32 }}>___</Text>
                        <Text style={styles.smalltext}>For the best experience with fitin</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonscontainer}>
                <TouchableOpacity style={[styles.signupbutton, { borderBottomWidth: authType ? 3 : 0, width: authType ? "55%" : "45%" }]} onPress={() => { setauthType(true) }}>
                    <Text style={styles.buttontext}>
                        SignUp
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.signinbutton, { borderBottomWidth: authType ? 0 : 3, width: authType ? "45%" : "55%" }]} onPress={() => { setauthType(false) }}>
                    <Text style={styles.buttontext}>
                        SignIn
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomhalfcontainer}>
                <TouchableOpacity style={styles.emailbutton}>
                    <Fontisto name="email" color="black" size={28} />
                    <Text style={{ color: "black", marginHorizontal: 10 }} >
                        {
                            authType ?
                                "SIGN UP WITH EMAIL" :
                                "LOGIN WITH EMAIL"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googlebutton}>
                    <AntDesign name="googleplus" color="white" size={28} />
                    <Text style={{ color: "white", marginHorizontal: 10 }}>
                        {
                            authType ?
                                "SIGN UP WITH GOOGLE" :
                                "LOGIN WITH GOOGLE"}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(50,71,85)"
        // , borderWidth: 2,
        // borderColor: "red"

    },
    tophalfcontainer: {
        height: "60%",
        justifyContent: "space-between",
        padding: 40
        // , borderWidth: 2,
        // borderColor: "red"
    },
    bottomhalfcontainer: {
        height: "30%",
        justifyContent: "space-evenly"
        // , borderWidth: 2,
        // borderColor: "red"


    },
    logocontainer: {
        height: "40%",
        justifyContent: "center",
        alignItems: "center"
        // , borderWidth: 2,
        // borderColor: "red"
    },
    logotext: {
        fontSize: 50,
        color: "white"
    },
    bigtext: {
        fontSize: 34,
        color: "white",
        fontWeight: "bold"

    },
    smalltext: {
        fontSize: 18,
        color: "white"
    },
    lowertextcontainer: {
        height: "50%",
        paddingHorizontal: "15%",
        justifyContent: "center",
        alignItems: "center"
        // , borderWidth: 2,
        // borderColor: "red"
    },
    innerlowertextcontainer: {
        // justifyContent: "space-evenly"
    },
    buttonscontainer: {
        height: "10%",
        flexDirection: "row",

    },
    signupbutton: {

        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "rgb(217,125,84)",
    },
    signinbutton: {

        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "rgb(217,125,84)",

    },
    buttontext: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    emailbutton: {
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: "25%",
        marginHorizontal: "10%",
        borderRadius: 50

    },
    googlebutton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "25%",
        borderColor: "white",
        borderWidth: 2,
        marginHorizontal: "10%",
        borderRadius: 50
    }

})
export default Signin;