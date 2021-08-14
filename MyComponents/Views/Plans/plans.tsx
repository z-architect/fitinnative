import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base';

import { Props } from '../../types'
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Plans = ({ navigation, route }: Props) => {
    const [Meal, setMeal] = useState(true);
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.containerinner}>
            <View style={styles.buttonscontainer}>
                <TouchableOpacity style={[styles.mealbutton, { borderBottomWidth: Meal ? 3 : 0, width: Meal ? "55%" : "45%" }]} onPress={() => { setMeal(true) }}>
                    <Text style={styles.buttontext}>
                        Meal
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activitybutton, { borderBottomWidth: Meal ? 0 : 3, width: Meal ? "45%" : "55%" }]} onPress={() => { setMeal(false) }}>
                    <Text style={styles.buttontext}>
                        Activity
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textcontainer}>
                <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
                    Featured Plans
                </Text>
                <TouchableOpacity>
                    <Text>
                        See All Plans <AntDesign name="right" color="grey" size={28} />
                    </Text>

                </TouchableOpacity>
            </View>

            <ScrollView style={{ width: x, height: 330 }} horizontal={true}>

                <TouchableOpacity style={styles.cardsfeatured}>
                    <ImageBackground source={require('../../../MyAssets/undraw.png')} style={styles.cardsfeaturedimage} imageStyle={{ borderRadius: 20 }}>

                    </ImageBackground>

                    <View style={styles.featuredText}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}> Pilipino Curry</Text>
                        <Text> 380 Kcal</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.cardsfeatured}>
                    <ImageBackground source={require('../../../MyAssets/undraw.png')} style={styles.cardsfeaturedimage} imageStyle={{ borderRadius: 20 }}>

                    </ImageBackground>

                    <View style={styles.featuredText}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}> Pilipino Curry</Text>
                        <Text> 380 Kcal</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardsfeatured}>
                    <ImageBackground source={require('../../../MyAssets/undraw.png')} style={styles.cardsfeaturedimage} imageStyle={{ borderRadius: 20 }}>

                    </ImageBackground>

                    <View style={styles.featuredText}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}> Pilipino Curry</Text>
                        <Text> 380 Kcal</Text>
                    </View>
                </TouchableOpacity>


            </ScrollView>
            <Text style={styles.textheader}>Current Plan</Text>
            <TouchableOpacity style={styles.cardsplancontainer} onPress={() => { navigation.navigate("Current") }}>
                <ImageBackground source={require('../../../MyAssets/undraw.png')} style={styles.cardsplan} imageStyle={styles.cardimage}>
                    <View style={styles.cardsplantext}>
                        <Text style={{ fontSize: 26, fontWeight: "bold", color: "black" }}> Pilipino Curry</Text>
                        <Text> 380 Kcal</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

            <Text style={styles.textheader}>Saved Plans</Text>

            <TouchableOpacity style={styles.cardsplancontainer}>
                <ImageBackground source={require('../../../MyAssets/undraw.png')} style={styles.cardsplan} imageStyle={styles.cardimage}>
                    <View style={styles.cardsplantext}>
                        <Text style={{ fontSize: 26, fontWeight: "bold", color: "black" }}> Pilipino Curry</Text>
                        <Text> 380 Kcal</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: x,
        height: y,


        backgroundColor: "white"
    },
    containerinner: {
        // justifyContent: "center",
        alignItems: "center",
    },
    buttonscontainer: {
        height: y * 0.1,
        flexDirection: "row",

    },
    textcontainer: {
        width: x,
        height: y * 0.05,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textheader: {
        margin: 10,
        padding: 10,
        fontSize: 18,
        fontWeight: "bold"
    },
    buttontext: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    mealbutton: {

        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "rgb(217,125,84)",
    },
    activitybutton: {

        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "rgb(217,125,84)",

    },
    cardsplan: {
        width: x * 0.8,
        height: 250,
        justifyContent: "flex-end",
    },
    cardsplancontainer: {
        width: x * 0.8,
        height: 250,
        margin: 20,
        shadowColor: "black",
        shadowRadius: 5.0,
        shadowOpacity: 0.5,
        elevation: 6,
        borderRadius: 30
    },

    cardsplantext: {
        margin: 70
    },
    cardsfeatured: {
        width: x * 0.4,
        height: 250,
        margin: 20,
        shadowColor: "black",
        shadowRadius: 5.0,
        shadowOpacity: 0.5,
        elevation: 6,
        backgroundColor: "white",
        borderRadius: 30,
        justifyContent: "space-between",

    },
    cardsfeaturedimage: {
        width: x * 0.4,
        height: 130,
        borderRadius: 30
    },
    cardimage: { borderRadius: 30 },
    featuredText: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "yellow"
    }
})
export default Plans;