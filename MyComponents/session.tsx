import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Dimensions } from 'react-native';
import { Props } from './types';
import SessionCard from './sessioncard';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const Session = ({ navigation, route }: Props) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.image}>

                </View >
                <ScrollView style={styles.sessionContainer}>
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />



                </ScrollView >
                <TouchableOpacity style={styles.addbutton} onPress={() => { navigation.navigate("Set") }}>
                    <View>
                        <Text> Add Session</Text>
                    </View>

                </TouchableOpacity>

            </View >
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        height: "100%",

        backgroundColor: "rgb(240,243,244)"

    },
    image: {
        width: "100%",
        height: y * 0.3,
        backgroundColor: "yellow"
    },
    sessionContainer: {
        // borderWidth: 1,
        margin: 20,
    },

    addbutton: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",

        bottom: 30,
        width: "50%",
        height: 60,
        marginHorizontal: "25%",
        borderRadius: 32,
        backgroundColor: "rgb(110,140,160)"


    },

})
export default Session;