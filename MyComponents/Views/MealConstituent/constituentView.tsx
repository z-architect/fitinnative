import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useEffect } from 'react';
import NumericInput from 'react-native-numeric-input';
import { Modal, Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import Meal from './meal';
import {
    GifSearch,
} from 'react-native-gif-search';
import { Props } from '../../types';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const MealConstituent = ({ navigation, route }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [showMealModal, setShowMealModal] = useState(false)
    const [showgifModal, SetShowgifModal] = useState(false)
    const [Visible, SetVisible] = useState(true);

    const [Description, SetDescription] = useState("this is a set intended to make you lots of pushups")
    const [Meal, SetMeal] = useState("PushUps");
    const [Repetition, SetRepitition] = useState(10);
    const [Duration, SetDuration] = useState(4);
    const [Tempo, SetTempo] = useState(true);
    const [Met, SetMet] = useState(18);
    return (
        <>

            <View style={styles.container}>

                <View style={styles.head}>
                    <TouchableOpacity onPress={() => {
                        // createPlan();
                    }}>
                        <AntDesign name="left" size={32} color="rgb(50,71,85)" />
                    </TouchableOpacity>



                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "30%" }}>
                        <TouchableOpacity onPress={() => {
                            //deletePlan();
                        }}>
                            <AntDesign name="delete" size={32} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("PlanEdit");
                        }}>
                            <AntDesign name="edit" size={32} color="rgb(217,125,84)" />
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={styles.card}>



                    <View style={styles.cardhead}>
                        <View style={styles.gif}>
                            <Text style={{ color: "rgb(217,125,84)" }}> GIF</Text>
                        </View>
                        <View style={styles.input}>
                            <TouchableOpacity onPress={() => { setShowModal(true) }}>
                                <TextInput placeholder="select something" value={Meal} editable={false} placeholderTextColor="black" style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey", color: "black" }} onChangeText={() => { }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.bodyleft}>
                            <View>
                                <View style={styles.numericinputcontainer}>
                                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{Duration}</Text>
                                </View>
                                <Text>Duration in Minutes</Text>
                            </View>

                            <View>
                                <View style={styles.numericinputcontainer}>
                                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{Repetition}</Text>
                                </View>
                                <Text>Repetition</Text>
                            </View>

                        </View>

                        <View style={styles.bodyright}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: "bold" }} >Tempo</Text>
                                <View style={{ flexDirection: "row", marginBottom: 5, alignItems: "center" }}>
                                    <Text style={{ marginRight: 5, color: "rgb(217,125,84)" }}>Intense</Text>
                                    <Switch value={Tempo} onValueChange={() => { SetTempo(!Tempo) }} disabled={true} trackColor={{ true: 'rgb(50,71,85)', false: "grey" }} />
                                    <Text style={{ marginLeft: 5, color: "rgb(50,71,85)" }}>Chill</Text>
                                </View>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: "bold" }}>METs</Text>
                                <View style={styles.numericinputcontainer}>
                                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{Met}</Text>
                                </View>
                                <Text style={{ color: "rgb(217,125,84)" }}>Calories Burn Rate</Text>
                            </View>

                        </View>



                        {/* <View style={styles.plusminus}>
            
             

            </View>
            <View style={styles.switch}>
              <View style={styles.duration}><Text>SOmething</Text></View>
              <View style={styles.rest}><Text>Again</Text></View>
            </View> */}

                    </View>

                    <View style={styles.foot}>
                        <Feather name="edit" size={22} color="lightblue" />
                        <TextInput placeholder="Description" value={Description} editable={false} onChangeText={(val) => { SetDescription(val) }} placeholderTextColor="black" style={{ marginHorizontal: 10, fontSize: 16, color: "black" }} />
                    </View>


                </View>

                <TouchableOpacity onPress={() => { }} style={styles.button}><Text style={{ fontSize: 28, color: "white" }}>Display Meal </Text></TouchableOpacity>

            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(110,140,160)", //"rgb(217,125,84)",
        alignItems: "center",
        justifyContent: "space-between"
    },
    card: {
        height: y * 0.5,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        justifyContent: "space-between"
    },
    cardhead: {
        flexDirection: "row",
        height: "15%"
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
    body: {
        height: "65%",
        width: "100%",
        padding: 20,
        flexDirection: "row",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        // backgroundColor: "pink"
        // alignItems: "center"
    },
    bodyleft: {
        justifyContent: "space-between",
        borderRightWidth: 1,
        borderRightColor: "lightgrey",
        // backgroundColor: "pink",
        padding: 20,
        marginVertical: 5,
    },
    bodyright: {
        justifyContent: "space-between",
        padding: 20,
        marginLeft: 10,
        marginVertical: 5,
    },
    foot: {
        height: "20%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 1,
        // borderRadius: 10
    },
    footinput: {
        // border
    },
    gif: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        justifyContent: "center",
        padding: 10,
        // backgroundColor: "pink",
        flexGrow: 1,
        color: "black"
    },
    plusminus: {
        flexDirection: "row"
    },
    duration: {
        width: "100%",
        backgroundColor: "lightblue",
        margin: 4,
        borderRadius: 6
    },
    rest: {
        width: "100%",
        backgroundColor: "yellow",
        margin: 4,
        borderRadius: 6
    },
    switch: {
        width: "80%"
    },
    met: {

    },
    button: {
        // position: "absolute",
        // bottom: 50,
        width: "60%",
        marginVertical: 20,
        marginHorizontal: "20%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
        borderColor: "white",
        borderWidth: 1,
        backgroundColor: "rgb(110,140,160)"//"rgb(50,71,85)"
    }
    , gifcontainerouter: {
        height: y * 0.5,
        alignItems: "center"
    },
    gifcontainer: {
        backgroundColor: "white",
        borderWidth: 3,
        width: "100%",
        borderColor: "rgb(50,71,85)",
        borderRadius: 20,
    },
    numericinputcontainer: {
        width: 150,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 15,
    }
})

export default MealConstituent;