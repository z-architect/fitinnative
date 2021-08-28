import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'native-base';

import NumericInput from 'react-native-numeric-input';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const DailyGoals = () => {
    const [Water, SetWater] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                <View style={{ marginBottom: 20 }}>

                    <IonIcons name={Water ? "water-outline" : "bed-outline"} color="black" size={200} />
                    <View >
                        <Text style={{ color: "lightblue" }}>
                            Your Goals : {Water ? "2 Glasses Per Day" : "8 hours of rest"}
                        </Text>
                    </View>

                </View>

                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {Water ? "Glasses of Water" : "Hours of Sleep"}
                        </Text>
                    </View>
                    {/* <View>
                        <FontAwesome5 name="glass-whiskey" color="color" size={40} />
                    </View> */}
                    <View style={styles.inputcontainer}>

                        {/* <Text> Glass of Water</Text> */}
                        <NumericInput type='plus-minus'
                            onChange={
                                value => console.log(value)
                            }
                            totalWidth={210}
                            totalHeight={80}
                            textColor="black"
                            iconStyle={{ color: "white" }}
                            minValue={0}
                            maxValue={16}
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
        //height: y * 0.4,
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
    header: {
        height: 80,
        flexDirection: "row",
        justifyContent: "center"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 22
    },
    inputcontainer: {
        //height: "50%",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default DailyGoals;