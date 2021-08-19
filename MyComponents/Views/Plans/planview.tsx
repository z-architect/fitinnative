import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import SessionCard from './sessioncard';
import { Props } from '../../types';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const mydays = new Array(30).fill(false);

const Calander = () => {
    const [Days, setDays] = useState(mydays);
    const setDay = (no: number) => {
        setDays((Days) => {
            let newdays = [...Days]
            if (newdays[no]) {
                newdays[no] = false;
            }
            else {
                newdays[no] = true;
            }

            return [...newdays]
        })
    }
    return (
        <View style={styles.calander}>
            <View style={styles.calanderheader}>
                <AntDesign name="left" size={24} color="white" />
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}> Augest </Text>
                <AntDesign name="right" size={24} color="white" />
            </View>
            <View style={styles.calanderheadertwo}>
                <MaterialCommunityIcons name="calendar-today" size={30} color="black" />
                <Text>Today</Text>
                <Entypo name="plus" size={30} color="black" />
            </View>
            <View style={styles.calanderbody}>
                {
                    myarray.map((item, i) => (
                        <TouchableOpacity key={i} style={[styles.day, { backgroundColor: Days[i] ? "grey" : "white" }]} onPress={() => { setDay(i) }} >
                            <View >
                                <Text style={{ color: Days[i] ? "white" : "black" }}>{i + 1}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}


const myarray = new Array(30).fill(7);
const Plan = ({ navigation, route }: Props) => {
    return (
        <ScrollView style={styles.container} >
            <View style={styles.head}>
                <TouchableOpacity>
                    <AntDesign name="check" size={32} color="rgb(50,71,85)" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="close" size={32} color="rgb(50,71,85)" />
                </TouchableOpacity>
            </View>
            <View style={styles.planimage}>
                <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.image}>
                    <Text style={styles.imagetext}>
                        Cardio
                    </Text>
                </ImageBackground>
            </View>

            <View style={styles.sessioncontainerheader}><Text style={{ fontSize: 26 }}>Plan Sessions</Text></View>
            <View style={styles.sessioncontainerwindow}>


                <ScrollView style={styles.sessioncontainer} contentContainerStyle={styles.sessioncontainerinner} nestedScrollEnabled={true}>
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />
                    <SessionCard />

                </ScrollView>
            </View>
            <TouchableOpacity style={styles.sessionbutton} onPress={() => { navigation.navigate("Session") }}>
                <View>
                    <Text>Add session</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.calandertitle}><Text style={{ fontSize: 26 }}>Plan Calander</Text></View>
            <Calander />

        </ScrollView>

    )
}
const styles = StyleSheet.create({
    main: {

        // justifyContent:"space-between",

    },
    head: {
        height: y * 0.1,
        width: x,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    container: {
        // flex:1,
        backgroundColor: "rgb(242,243,244)",
        borderWidth: 2

    },
    planimage: {
        height: 300,
        //backgroundColor:"yellow"
    },
    imagetext: {
        color: "white",
        fontSize: 38,
        margin: 20
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",

    },

    sessioncontainer: {
        marginHorizontal: 20,
        height: 250,
        borderRadius: 15,
        // borderWidth:1
    },
    sessioncontainerinner: {
        // backgroundColor:"pink"
    },
    sessioncontainerheader: {
        // backgroundColor:"pink",
        padding: 10,
        margin: 10,
    },
    sessioncontainerwindow: {
        height: 400
    },
    calandertitle: {
        //backgroundColor:"pink",
        padding: 10,

        margin: 10,
    },
    calanderheader: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgb(50,71,85)",
        height: 60,
        alignItems: "center"
    },
    calanderheadertwo: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        height: 60,
        alignItems: "center",
        borderBottomWidth: 1
    },
    calanderbody: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "98%",
        marginHorizontal: "1%"
    },
    calander: {
        height: 420,


    },
    day: {
        height: 60,
        width: "14%",
        padding: 5,
        backgroundColor: "rgb(200,200,200)",
        justifyContent: "center",
        alignItems: "center"
    },
    sessionbutton: {
        width: "50%",
        height: 60,
        marginHorizontal: "25%",
        marginVertical: 10,
        borderRadius: 32,
        backgroundColor: "rgb(110,140,160)",
        justifyContent: "center",
        alignItems: "center"
    }

});
export default Plan;