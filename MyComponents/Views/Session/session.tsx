import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Props } from '../../types';
import SetCard from './setcard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Modal, Button, Switch } from 'native-base';
import Setz from './setCardUnselected';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const Session = ({ navigation, route }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [Session, SetSession] = useState({
        type: "",
        image: "",
        category: "",
        difficulty: "",
        title: "",
        description: "",
        private: true
    });
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
                        <AntDesign name="check" size={32} color="rgb(50,71,85)" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="close" size={32} color="rgb(50,71,85)" />
                    </TouchableOpacity>
                </View>

                <View style={styles.Sessionimage}>
                    {
                        (Session.image === "") ?
                            (
                                <View style={[styles.image, { backgroundColor: "lightgrey", justifyContent: "flex-start", alignItems: "center" }]}>
                                    <TouchableOpacity style={{ width: "100%", height: "60%", justifyContent: "center", alignItems: "center" }}>
                                        <AntDesign name="picture" size={62} color="white" />
                                    </TouchableOpacity>
                                    <View style={{ height: "40%", width: "80%" }}>
                                        <TextInput placeholder="Title" placeholderTextColor="white" style={[styles.input, { fontWeight: "bold" }]} />
                                        <TextInput placeholder="Description" placeholderTextColor="white" style={styles.input} />
                                    </View>
                                </View>
                            ) :
                            (
                                <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.image}>
                                    <Text style={styles.imagetext}>
                                        Cardio
                                    </Text>
                                </ImageBackground>
                            )



                    }

                </View>
                <ScrollView style={styles.sessionContainer}>
                    <SetCard setcolor="orange" />
                    <SetCard setcolor="green" />
                    <SetCard setcolor="red" />
                    <SetCard setcolor="blue" />
                    <SetCard setcolor="red" />
                    <SetCard setcolor="orange" />
                    <SetCard setcolor="purple" />
                    <SetCard setcolor="yellow" />



                </ScrollView >
                <TouchableOpacity style={styles.addbutton} onPress={() => { setShowModal(true) }}>
                    <View>
                        <Text> Add Set</Text>
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
        borderBottomWidth: 1,
        borderBottomColor: "white",
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
export default Session;