import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Props } from '../../types';
import ConstituentCardVarient from './constituentCardVariant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Modal, Button, Switch } from 'native-base';
import Constituentz from './constituentUnselected';
import MyModal from '../Plans/deletemodal';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const SessionView = ({ navigation, route }: Props) => {
    const [showModal, setShowModal] = useState(false);

    const [Type, SetType] = useState("Meal");
    const [Image, SetImage] = useState("lkjh");
    const [Title, SetTitle] = useState("My session");
    const [Description, SetDescription] = useState("The best session one can ask for");
    const [CTB, SetCTB] = useState("897")
    const [DeleteModal, setDeleteModal] = useState(false)
    const [Sets, SetSets] = useState([
        {
            id: "1",
            name: "pushups",
            duration: "4 min"
        },
        {
            id: "2",
            name: "Situps",
            duration: "4 min"
        },
    ])


    useEffect(() => {

    }, [])

    return (
        <>
            <MyModal DeleteModal={DeleteModal} setDeleteModal={setDeleteModal} />

            <View style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <AntDesign name="left" size={32} color="rgb(50,71,85)" />
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "30%" }}>
                        <TouchableOpacity onPress={() => {
                            setDeleteModal(true);
                        }}>
                            <AntDesign name="delete" size={32} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("MealSessionEdit");
                        }}>
                            <AntDesign name="edit" size={32} color="rgb(217,125,84)" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.Sessionimage}>
                    {
                        (Image === "") ?
                            (
                                <View style={[styles.image, { backgroundColor: "lightgrey", justifyContent: "flex-end", alignItems: "center" }]}>
                                    <TouchableOpacity style={{ width: "100%", height: "40%", justifyContent: "center", alignItems: "center" }}>
                                        <AntDesign name="picture" size={62} color="white" />
                                    </TouchableOpacity>
                                    <View style={{ height: "60%", width: "100%" }}>
                                        <Text style={[styles.input, { fontWeight: "bold" }]}>{Title} </Text>
                                        <Text style={styles.input} > {Description}  </Text>
                                        <Text style={styles.input} > {CTB}  </Text>

                                    </View>
                                </View>
                            ) :
                            (
                                <ImageBackground source={require("../../../MyAssets/runninman.jpg")} resizeMode="cover" style={styles.image}>

                                    <View style={{ height: "60%", width: "80%", marginLeft: 20, marginBottom: 20 }}>
                                        <TextInput placeholder="Title" value={Title} onChangeText={(val) => { SetTitle(val) }} placeholderTextColor="white" style={[styles.input, { fontWeight: "bold" }]} />
                                        <TextInput placeholder="Description" value={Description} onChangeText={(val) => { SetDescription(val) }} placeholderTextColor="white" style={styles.input} />
                                        <TextInput placeholder="Calories to Burn" value={CTB} onChangeText={(val) => { SetCTB(val) }} placeholderTextColor="white" style={styles.input} />

                                    </View>
                                </ImageBackground>
                            )
                    }
                </View>
                <ScrollView style={styles.sessionContainer} contentContainerStyle={{ paddingBottom: 65 }}>
                    {
                        Sets.length === 0 ?
                            (
                                <Text>Sorry , you haven't added any sets yet</Text>
                            )
                            :
                            (
                                Sets.map((data, i) => (
                                    <ConstituentCardVarient key={i} data={data} onSelect={() => { navigation.navigate("SetView") }} setcolor="orange" />
                                ))
                            )
                    }
                </ScrollView >
            </View >
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        height: "100%",
        backgroundColor: "rgba(110,140,160,0.4)"
        //"rgb(240,243,244)"
    },
    Sessionimage: {
        height: 300,
    },
    image: {
        width: "100%",
        height: y * 0.3,
        backgroundColor: "yellow",
        justifyContent: "flex-end",
    },
    sessionContainer: {
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