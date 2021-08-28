import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';

import { useEffect } from 'react';
import NumericInput from 'react-native-numeric-input';
import { Modal, Button, Switch } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Meal from './meal';
import {
    GifSearch,
} from 'react-native-gif-search';
import { Props } from '../../types';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const MealConstituent = ({ navigation, route }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [showmealModal, setShowmealModal] = useState(false)
    const [showgifModal, SetShowgifModal] = useState(false)
    const [Visible, SetVisible] = useState(true)
    return (
        <>
            <Modal isOpen={showgifModal} onClose={() => { SetShowgifModal(false); SetVisible(false); }}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>GIF Selection</Modal.Header>
                    <Modal.Body>


                        <View style={styles.gifcontainerouter}>

                            <GifSearch
                                style={styles.gifcontainer}
                                giphyApiKey={"bEbcELv6yDBowe2xR9Yem24sMUQflMNR"}
                                onGifSelected={(gif_url) => { Alert.alert(gif_url) }}
                                horizontal={false}
                                gifsToLoad={10}
                                maxGifsToLoad={25}
                                visible={Visible}
                                numColumns={3}
                                loadingSpinnerColor={'blue'}
                                placeholderTextColor={'grey'}
                                placeholderText={'Search an exercise '}

                                textInputStyle={{ fontWeight: 'bold', color: 'black', borderBottomColor: "grey", borderBottomWidth: 1 }}
                                onBackPressed={() => { SetVisible(false); SetShowgifModal(false); }}
                                noGifsFoundText={"No Gifs found :("}
                                noGifsFoundTextStyle={{ fontWeight: 'bold' }}
                                onError={(error) => { if (Visible) { Alert.alert(error) } }}

                            />
                        </View>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <Modal isOpen={showmealModal} onClose={() => setShowmealModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={[styles.gif, { marginRight: 15 }]}>

                        </View>
                        Create Food Item</Modal.Header>
                    <Modal.Body>

                        <TextInput placeholder="meal name ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />

                        <TextInput placeholder="Description ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />

                        <TextInput placeholder="Carbohydrate Per Gram" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />

                        <TextInput placeholder="Fat ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />

                        <TextInput placeholder="Protein ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />

                        <TextInput placeholder="Sugar ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />
                        <TextInput placeholder="Carbs ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />
                        <TextInput placeholder="Fiber ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />

                        <TouchableOpacity style={styles.button} onPress={() => { SetShowgifModal(true); SetVisible(true); }}  >
                            <Text style={{ color: "white" }}>Add a GIF</Text>
                        </TouchableOpacity>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>

                            <Button
                                onPress={() => {
                                    setShowmealModal(false)
                                }}
                            >
                                Create
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Activities</Modal.Header>
                    <Modal.Body>
                        <Meal />
                        <Meal />
                        <Meal />
                        <Meal />
                        <Meal />
                        <Meal />
                        <Meal />
                        <Meal />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>

                            <Button
                                onPress={() => {
                                    setShowmealModal(true)
                                }}
                            >
                                + New meal
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>


            <View style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity onPress={() => {
                        //createPlan();
                    }}>
                        <AntDesign name="check" size={32} color="rgb(50,71,85)" />
                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <AntDesign name="close" size={32} color="red" />
                    </TouchableOpacity>


                </View>

                <View style={styles.card}>



                    <View style={styles.cardhead}>
                        <View style={styles.gif}>
                            <Text style={{ color: "rgb(217,125,84)" }}> GIF</Text>
                        </View>
                        <View style={styles.input}>
                            <TouchableOpacity onPress={() => { setShowModal(true) }}>
                                <TextInput placeholder="select something" editable={false} placeholderTextColor="black" style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey", color: "black" }} onChangeText={() => { }} />
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
        backgroundColor: "rgba(110,140,160,0.8)", //"rgb(217,125,84)",
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



    }
})

export default MealConstituent;