import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions, Alert } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base';
import {
    GifSearch,
} from 'react-native-gif-search';



const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const GifTest = () => {
    const [Visible, SetVisible] = useState(true)
    return (
        <View style={styles.container}>
            <Text>ITS wokring i guess</Text>


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
                    placeholderText={'Search an exercise gif that fits your activity'}

                    textInputStyle={{ fontWeight: 'bold', color: 'black' }}
                    onBackPressed={() => { SetVisible(false) }}
                    noGifsFoundText={"No Gifs found :("}
                    noGifsFoundTextStyle={{ fontWeight: 'bold' }}
                    onError={(error) => { Alert.alert(error) }}

                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: y,
        width: x,
        backgroundColor: "white"
    },
    gifcontainerouter: {
        height: y * 0.5,
    },
    gifcontainer: {
        backgroundColor: "white",
        borderWidth: 3,
        borderRadius: 10,



    }
})
export default GifTest;

