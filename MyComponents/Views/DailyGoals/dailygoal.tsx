import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Input } from 'native-base';

import NumericInput from 'react-native-numeric-input';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const DailyGoals = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                <View style={{ marginBottom: 20 }}>
                    <IonIcons name="water-outline" color="black" size={200} />
                    <View >
                        <Text style={{ color: "lightblue" }}>
                            Your Goals : 2 Glasses Per Day
                        </Text>
                    </View>

                </View>

                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Water
                        </Text>
                    </View>

                    <View style={styles.inputcontainer}>

                        <Text> Glass of Water</Text>
                        <NumericInput type='plus-minus'
                            onChange={value => console.log(value)}
                            textColor="black"
                            iconStyle={{ color: "white" }}
                            rounded
                            rightButtonBackgroundColor='rgb(50,71,85)'
                            leftButtonBackgroundColor='rgb(50,71,85)' />
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
        justifyContent: "center",
        alignItems: "center"
    },
    innercontainer: {
        height: 0.8 * y,
        width: "100%",
        alignItems: "center"
        //backgroundColor: "pink",
    },
    card: {
        height: y * 0.4,
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        justifyContent: "space-between"
    },
    header: {
        height: "20%",
        flexDirection: "row",
        justifyContent: "center"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 22
    },
    inputcontainer: {
        height: "80%",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default DailyGoals;