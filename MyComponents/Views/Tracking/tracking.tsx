import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions, Alert } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'native-base';

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;


const Tracking = () => {
    const [Modal, SetModal] = useState(true);
    return (



        <View style={styles.container}>


            <View style={styles.big}>
                <Text>Hellow world</Text>
                <TouchableOpacity onPress={() => { SetModal(true) }}>
                    <Text>Something</Text>
                </TouchableOpacity>
            </View>

            {

                Modal ?
                    <>
                        <View style={styles.overlay}>
                            <Text>Hello im the modal</Text>
                        </View>


                        <TouchableOpacity style={[styles.circle, styles.circle1]}>
                            <Text> <MaterialCommunityIcons name="food" color="black" size={34} /> </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.circle, styles.circle2]}>
                            <Text> <MaterialCommunityIcons name="pulse" color="black" size={34} /> </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.circle, styles.circle3]}>
                            <Text> <FontAwesome name="weight" color="black" size={34} /> </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.circle, styles.circlex]} onPress={() => { SetModal(false) }}>
                            <Text> <AntDesign name="close" color="white" size={34} /> </Text>
                        </TouchableOpacity>

                    </>


                    :
                    <>
                    </>

            }

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(100,100,100,0.6)',
        justifyContent: "center",
        alignItems: "center"

    },
    big: {
        height: "100%",
        backgroundColor: "pink",
        justifyContent: "flex-end"
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.8)",
        justifyContent: "center",
        alignItems: "center",

    },
    circle1: {
        position: "absolute",
        bottom: 80,
        left: 50
    },
    circle2: {
        position: "absolute",
        bottom: 160,
        marginHorizontal: (x - 80) / 2
    },
    circle3: {
        position: "absolute",
        bottom: 80,
        right: 50
    },
    circlex: {
        position: "absolute",
        bottom: 40,
        marginHorizontal: (x - 80) / 2,
        backgroundColor: "rgba(217,125,84,0.8)",
    }
})
export default Tracking;