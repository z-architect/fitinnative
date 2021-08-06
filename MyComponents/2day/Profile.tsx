import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import { Input, Icon } from 'native-base';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
// console.log(x,"X",y)
const Profile = () => {
    return (

        <ScrollView style={styles.container} contentContainerStyle={{}} >

            <View style={styles.titlecontainer}>
                <Text style={styles.title} >Profile Setup</Text>
            </View>

            <View style={styles.profileconatainer} >
                <View style={styles.profilecontainerleft}>
                    <TouchableOpacity style={styles.profilecontainercircle} >
                        <AntDesign name="camera" size={60} color="rgb(217,125,84)" />
                    </TouchableOpacity>
                </View>

                <View style={styles.profilecontianerright}>
                    <View style={styles.inputline}><Text style={{ width: "40%" }}>UserName : </Text><View style={{ width: "60%" }}><Input placeholder="" /></View></View>
                    <View style={styles.inputline}><Text style={{ width: "40%" }}>Role : </Text><View style={{ width: "60%" }}><Input placeholder="" /></View></View>
                    <View style={styles.inputline}><Text style={{ width: "40%" }}>Level : </Text><View style={{ width: "80%" }}><Input placeholder="" /></View></View>
                </View>
            </View>


            <View style={styles.datacontainer}>
                <View style={styles.datacontainerinside}>


                    <View style={styles.inputline}>

                        <Input placeholder="Dob"
                            InputLeftElement={
                                <Icon
                                    as={<FontAwesome name="birthday-cake" size={35} color="grey" />}
                                    _light={{ color: "grey" }}
                                    size="sm"

                                />
                            }
                        //   as={<MaterialIcons name="phone" />}
                        //   size="md"
                        //   m={2}
                        //   _light={{
                        //     color: "black",
                        //   }}
                        //   _dark={{
                        //     color: "gray.300",
                        // }} 
                        />

                    </View>
                    <View style={styles.inputline}>
                        <Text style={{ marginHorizontal: 5, fontSize: 18, width: "20%" }}>Sex :</Text>
                        <Input
                            placeholder="Sex"
                            style={{ width: "60%", }}

                        />
                        <View style={{ width: "20%", alignItems: "center", }}>
                            <FontAwesome name="transgender" size={25} /></View>
                    </View>
                    <View style={styles.inputline}>
                        <Text style={{ width: "20%" }}>Weight</Text>
                        <View style={{ width: "80%" }}>
                            <Input placeholder=""

                                InputRightElement={
                                    <Icon
                                        as={<FontAwesome name="weight" color="grey" />}
                                        _light={{ color: "grey" }}
                                        size="sm"
                                        m={2}

                                    />
                                }
                            />
                        </View>

                    </View>
                    <View style={styles.inputline}>

                        <Input placeholder="Height"
                            InputLeftElement={
                                <Icon
                                    as={<Entypo name="ruler" size={35} color="grey" />}
                                    _light={{ color: "grey" }}
                                    size="sm"

                                />
                            } />
                    </View>
                </View>
            </View>

            <View style={styles.activitycontainer}>
                <Text style={styles.activitycontainertext}>Activity Level</Text>
                <View style={styles.circlescontainer}>
                    <TouchableOpacity style={styles.activityboxes}>
                        <View style={styles.circles}>
                            <FontAwesome name="couch" size={40} color="grey" />
                        </View>
                        <Text>Sedentery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.activityboxes}>
                        <View style={styles.circles}>
                            <FontAwesome name="walking" size={40} color="grey" />
                        </View>
                        <Text>Average</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.activityboxes}>
                        <View style={styles.circles}>
                            <FontAwesome name="running" size={40} color="grey" />
                        </View>
                        <Text>Active</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <TouchableOpacity style={styles.nextbutton}>
                <Text style={{ color: "white", fontSize: 24 }}>Next</Text>
            </TouchableOpacity>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: y,
        // borderWidth: 2,
        //  borderColor:"pink",
        backgroundColor: "rgb(241,243,245)"
    },
    titlecontainer: {
        height: y * 0.08,
        justifyContent: "center",

    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 30
    },
    inputline: {
        flexDirection: "row",
        // justifyContent: "space-between",
        // marginHorizontal: 10,
        // width: "80%",
        //backgroundColor: "pink",
        paddingHorizontal: 20,
        alignItems: "center"
    },
    profileconatainer: {
        shadowColor: "grey",
        backgroundColor: "white",
        margin: 10,
        flexDirection: "row",
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
        borderRadius: 10,
        height: y * 0.2,
        // alignItems: "center"
    },
    profilecontainerleft: {
        width: "35%",

        justifyContent: "center",
        alignItems: "center",
    },
    profilecontainercircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    profilecontianerright: {
        // alignItems: "baseline"
        // backgroundColor: "pink",
        width: "65%"
    },
    datacontainer: {
        shadowColor: "grey",
        backgroundColor: "white",
        margin: 10,
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
        borderRadius: 10,
        height: y * 0.3,

    },
    datacontainerinside: {
        width: "80%",
        marginHorizontal: "10%",
        // borderWidth: 1
    },
    activitycontainer: {
        shadowColor: "grey",
        backgroundColor: "white",
        margin: 10,
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
        borderRadius: 10,
        height: y * 0.25,
        padding: 10
    },
    circlescontainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
    },
    circles: {
        borderRadius: 40,
        width: 80,
        height: 80,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 40
    },
    nextbutton: {
        width: "60%",
        marginHorizontal: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        height: y * 0.07,
        borderRadius: 30,
        margin: 20,
        backgroundColor: "rgb(50,71,85)",
    },
    activitycontainertext: {
        fontSize: 23,
        paddingLeft: 30,
        fontWeight: "bold"

    },
    activityboxes: {},
    activityboxestitle: {}
});
export default Profile;