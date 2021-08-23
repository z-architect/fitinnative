

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { Input, Icon } from 'native-base';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Plansearch = () => {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => {
                    //  createPlan();
                }}>
                    <AntDesign name="check" size={32} color="rgb(50,71,85)" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    // navigation.goBack();
                }}>
                    <AntDesign name="close" size={32} color="rgb(50,71,85)" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchheader}>
                <View style={styles.bar}>

                    <Input placeholder="Dob" style={styles.searchBar} />
                    <TouchableOpacity style={styles.searchbutton}>
                        <FontAwesome name="search" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.resultscontainer} contentContainerStyle={styles.resultscontainerinner}>

                <View style={[styles.card]}>
                    <Text style={{ margin: 10 }}>
                        Some plan
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={{ margin: 10 }}>
                        Some plan
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={{ margin: 10 }}>
                        Some plan
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={{ margin: 10 }}>
                        Some plan
                    </Text>
                </View>


                <View style={styles.card}>
                    <Text style={{ margin: 10 }}>
                        Some plan
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={{ margin: 10 }}>
                        Some plan
                    </Text>
                </View>


                <View style={styles.card}>
                    <Text style={{ margin: 10 }}>
                        Some plan
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={{ margin: 10 }}>
                        Some plan
                    </Text>
                </View>

            </ScrollView>
        </View>
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
        paddingHorizontal: 15,
        // borderBottomWidth: 1,
        // borderBottomColor: "grey"
    },
    searchheader: {
        borderBottomColor: "grey",
        borderBottomWidth: 1
    },
    bar: {
        flexDirection: "row",
        marginHorizontal: x * 0.1,
        marginVertical: 15,

    },
    searchbutton: {
        backgroundColor: "orange",
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    },
    searchBar: {
        borderWidth: 1,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        width: "80%"
    },
    resultscontainer: {

        flex: 1,
        width: x,
        // backgroundColor: "pink"
    },
    card: {
        width: x * 0.4,
        justifyContent: "flex-end",
        backgroundColor: "yellow",
        height: 250,
        borderRadius: 18,
        marginTop: 30,
        marginHorizontal: x * 0.025

    },
    resultscontainerinner: {
        paddingHorizontal: x * 0.05,
        flexDirection: "row",
        flexWrap: "wrap",

    }
})
export default Plansearch;

// InputRightElement={
//     <Icon
//         as={<FontAwesome name="birthday-cake" size={35} color="grey" />}
//         _light={{ color: "grey" }}
//         size="sm"

//     />
// }