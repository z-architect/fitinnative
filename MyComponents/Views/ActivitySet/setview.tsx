import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';

import { useEffect } from 'react';
import NumericInput from 'react-native-numeric-input';
import { Modal, Button, Switch } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import Activity from './activity';
import {
    GifSearch,
} from 'react-native-gif-search';
import { Props } from '../../types';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const ActivitySet = ({ navigation, route }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [showActivityModal, setShowActivityModal] = useState(false)
    const [showgifModal, SetShowgifModal] = useState(false)
    const [Visible, SetVisible] = useState(true);

    const [Activity, SetActivity] = useState("PushUps");
    return (
        <>

            <View style={styles.container}>
                <View style={styles.card}>



                    <View style={styles.head}>
                        <View style={styles.gif}>
                            <Text style={{ color: "rgb(217,125,84)" }}> GIF</Text>
                        </View>
                        <View style={styles.input}>
                            <TouchableOpacity onPress={() => { setShowModal(true) }}>
                                <TextInput placeholder="select something" value={Activity} editable={false} placeholderTextColor="black" style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey", color: "black" }} onChangeText={() => { }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.bodyleft}>
                            <View>
                                <NumericInput
                                    type='up-down'
                                    onChange={value => console.log(value)}
                                    rounded
                                    upDownButtonsBackgroundColor="rgb(50,71,85)"
                                    iconStyle={{ color: "white" }}
                                />
                                <Text>Duration in Minutes</Text>
                            </View>

                            <View>
                                <NumericInput
                                    type='up-down'
                                    onChange={value => console.log(value)}
                                    rounded
                                    upDownButtonsBackgroundColor="rgb(50,71,85)"
                                    iconStyle={{ color: "white" }}
                                />
                                <Text>Repetition</Text>
                            </View>

                        </View>

                        <View style={styles.bodyright}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: "bold" }} >Tempo</Text>
                                <View style={{ flexDirection: "row", marginBottom: 5, alignItems: "center" }}>
                                    <Text style={{ marginRight: 5 }}>Intense</Text>
                                    <Switch size="lg" trackColor={{ true: 'rgb(50,71,85)', false: "grey" }} />
                                    <Text style={{ marginLeft: 5 }}>Chill</Text>
                                </View>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontWeight: "bold" }}>METs</Text>
                                <NumericInput type='plus-minus'
                                    onChange={value => console.log(value)}
                                    textColor="black"
                                    iconStyle={{ color: "white" }}
                                    rounded
                                    rightButtonBackgroundColor='rgb(50,71,85)'
                                    leftButtonBackgroundColor='rgb(50,71,85)' />
                                <Text>Calories Burn Rate</Text>
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
                        <TextInput placeholder="Description" placeholderTextColor="black" style={{ marginHorizontal: 10, fontSize: 16, color: "black" }} />
                    </View>


                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}><Text style={{ fontSize: 28, color: "white" }}>Create Set </Text></TouchableOpacity>

            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(110,140,160)", //"rgb(217,125,84)",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        height: y * 0.5,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        justifyContent: "space-between"
    },
    head: {
        flexDirection: "row",
        height: "15%"
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
        marginTop: 20,
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



    }
})

export default ActivitySet;