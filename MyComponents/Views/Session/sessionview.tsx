import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Props } from '../../types';
import SetCard from './setcardvariant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Modal, Button, Switch } from 'native-base';
import Setz from './setCardUnselected';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const SessionView = ({ navigation, route }: Props) => {
    const [showModal, setShowModal] = useState(false);

    const [Type, SetType] = useState("Meal");
    const [Image, SetImage] = useState("");
    const [Title, SetTitle] = useState("My session");
    const [Description, SetDescription] = useState("The best session one can ask for");
    const [OrderTable, SetOrderTable] = useState([
        {
            sessionId: "34",
            orderNumber: 1
        }

    ]);
    useEffect(() => {
        SetOrderTable([
            { sessionId: "45", orderNumber: 1 },
            { sessionId: "44", orderNumber: 2 },
            { sessionId: "42", orderNumber: 3 },
            { sessionId: "34", orderNumber: 4 },
            { sessionId: "75", orderNumber: 5 },
            { sessionId: "35", orderNumber: 6 },
            { sessionId: "12", orderNumber: 7 }
        ])

    }, [])
    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Sets</Modal.Header>
                    <Modal.Body>
                        <Setz />
                        <Setz />
                        <Setz />
                        <Setz />
                        <Setz />
                        <Setz />
                        <Setz />
                        <Setz />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>

                            <Button
                                onPress={() => {
                                    navigation.navigate("Set")
                                }}
                            >
                                + New Set
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <View style={styles.container}>
                {/* <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.image}>
                    <View >
                        <Text style={{ fontSize: 26, fontWeight: "bold", color: "black" }}> Pilipino Curry</Text>
                        <Text> 380 Kcal</Text>
                    </View>
                </ImageBackground> */}
                <View style={styles.head}>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <AntDesign name="left" size={32} color="rgb(50,71,85)" />
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "30%" }}>
                        <TouchableOpacity onPress={() => {

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

                <View style={styles.Sessionimage}>
                    {
                        (Image === "") ?
                            (
                                <View style={[styles.image, { backgroundColor: "lightgrey", justifyContent: "flex-start", alignItems: "center" }]}>
                                    <TouchableOpacity style={{ width: "100%", height: "60%", justifyContent: "center", alignItems: "center" }}>
                                        <AntDesign name="picture" size={62} color="white" />
                                    </TouchableOpacity>
                                    <View style={{ height: "40%", width: "100%" }}>
                                        <Text style={[styles.input, { fontWeight: "bold" }]}>{Title} </Text>
                                        <Text style={styles.input} > {Description}  </Text>
                                    </View>
                                </View>
                            ) :
                            (
                                <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.image}>
                                    <Text style={styles.imagetext}>
                                        {Title}
                                    </Text>
                                </ImageBackground>
                            )
                    }

                </View>
                <ScrollView style={styles.sessionContainer}>
                    <SetCard no={1} setcolor="orange" />
                    <SetCard no={2} setcolor="green" />
                    <SetCard no={3} setcolor="red" />
                    <SetCard no={4} setcolor="blue" />
                    <SetCard no={5} setcolor="red" />
                    <SetCard no={6} setcolor="orange" />
                    <SetCard no={7} setcolor="purple" />
                    <SetCard no={8} setcolor="yellow" />

                </ScrollView >
                {/* <TouchableOpacity style={styles.addbutton} onPress={() => { setShowModal(true) }}>
                    <View>
                        <Text> Add Set</Text>
                    </View>

                </TouchableOpacity> */}

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
    Sessionimage: {
        height: 300,
        //backgroundColor:"yellow"
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
    input: {
        // borderBottomWidth: 1,
        // borderBottomColor: "white",
        color: "white",
        fontSize: 22
    },
    imagetext: {
        color: "white",
        fontSize: 38,
        margin: 20
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

})
export default SessionView;