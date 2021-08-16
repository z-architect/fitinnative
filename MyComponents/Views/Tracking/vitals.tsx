import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const Card = () => {
    return (
        <View style={styles.card}>
            <View style={styles.textcontainer}>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
                    <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
                    <Text style={{ marginHorizontal: 10 }}>Heart Rate</Text>
                </View>
                <View style={{ flexDirection: "row", }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}> 0 </Text>
                    <Text style={{ fontSize: 16 }}>bpm</Text>
                </View>
            </View>
            <View style={styles.buttoncontainer}>
                <TouchableOpacity style={styles.button}>
                    <Text>
                        Record
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const Vitals = () => {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity>
                    <AntDesign name="check" size={32} color="rgb(50,71,85)" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="close" size={32} color="rgb(50,71,85)" />
                </TouchableOpacity>
            </View>
            <View style={styles.cardcontainer}>
                <View style={styles.card}>
                    <View style={styles.textcontainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
                            <AntDesign name="heart" size={52} color="rgb(50,71,85)" />
                            <Text style={{ marginHorizontal: 10 }}>Heart Rate</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}> 0 </Text>
                            <Text style={{ fontSize: 16 }}>bpm</Text>
                        </View>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text>
                                Record
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.textcontainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
                            <AntDesign name="clockcircle" size={52} color="rgb(50,71,85)" />
                            <Text style={{ marginHorizontal: 10 }}>Heart Rate</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}> 0 </Text>
                            <Text style={{ fontSize: 16 }}>bpm</Text>
                        </View>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text>
                                Record
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.textcontainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
                            <AntDesign name="user" size={52} color="rgb(50,71,85)" />
                            <Text style={{ marginHorizontal: 10 }}>Heart Rate</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}> 0 </Text>
                            <Text style={{ fontSize: 16 }}>bpm</Text>
                        </View>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text>
                                Record
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.textcontainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
                            <AntDesign name="sharealt" size={52} color="rgb(50,71,85)" />
                            <Text style={{ marginHorizontal: 10 }}>Heart Rate</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}> 0 </Text>
                            <Text style={{ fontSize: 16 }}>bpm</Text>
                        </View>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text>
                                Record
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: y,
        width: x,
    },
    head: {
        height: y * 0.1,
        width: x,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingHorizontal: 15
    },
    cardcontainer: {
        backgroundColor: "#C8D1D3",
        height: y * 0.9,
        width: x,
        alignItems: "center",


    },
    card: {
        width: x * 0.9,
        height: 140,
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: 15,
        // padding:10,
        justifyContent: "space-between",
        borderRadius: 20
    },
    textcontainer: {
        justifyContent: "space-between",
        alignItems: "center",
        width: "60%",
        // backgroundColor: "pink"
    },
    buttoncontainer: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "pink"
    },
    button: {
        height: 30,
        width: "60%",
        borderWidth: 1,
        borderColor: "#6E8CA0",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"

    }
})
export default Vitals;

