import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Modal } from 'native-base';

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
    const [EnteryModal, SetEnteryModal] = useState(true);
    return (
        <>
            <Modal isOpen={EnteryModal} onClose={() => SetEnteryModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <View style={styles.modaltophalf}>

                        <View style={styles.giantxcontainer}>
                            <AntDesign name="heart" size={78} color="black" />
                        </View>
                        <Text style={{ fontSize: 34, fontWeight: "bold" }}>
                            Heart Rate
                        </Text>
                    </View>
                    <View style={styles.modalbottomhalf}>
                        <View style={styles.inputcontainer}>
                            <Text style={{ padding: 10 }}> Input Heart reate</Text>
                            <TextInput keyboardType="numeric" placeholder="heartbeat" style={styles.ztextinput} />
                        </View>
                        <View style={styles.modlabuttoncontainer}>
                            <TouchableOpacity style={[styles.modalbutton, { backgroundColor: "rgb(110,140,160)" }]} onPress={() => { }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.modalbutton, { backgroundColor: "rgba(217,125,84,0.9)" }]}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Record</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal.Content>
            </Modal>
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
                            <TouchableOpacity style={styles.button} onPress={() => { SetEnteryModal(true) }}>
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
                            <TouchableOpacity style={styles.button} onPress={() => { SetEnteryModal(true) }}>
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
                            <TouchableOpacity style={styles.button} onPress={() => { SetEnteryModal(true) }}>
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
                            <TouchableOpacity style={styles.button} onPress={() => { SetEnteryModal(true) }}>
                                <Text>
                                    Record
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </View>
        </>
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

    },
    modaltophalf: {
        height: y * 0.25,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    modalbottomhalf: {
        height: y * 0.25,
        width: "100%",
        justifyContent: "space-around",
        padding: 20
    },
    giantxcontainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 160,
        width: 160,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: "orange"
    },
    modlabuttoncontainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly"
    },
    modalbutton: {
        borderRadius: 10,
        height: 50,
        width: 140,
        justifyContent: "center",
        alignItems: "center",


    },
    inputcontainer: {
        flexDirection: "row",
    },
    ztextinput: {
        borderWidth: 1,
        backgroundColor: "lightgrey",
        width: "50%"
    }
})
export default Vitals;

