import Onboarding from 'react-native-onboarding-swiper';
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, ImageBackground,
    StyleSheet, TextInput, Image, ScrollView, Dimensions, Alert
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base';
import { Props } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const OnBoarding = ({ navigation, route }: Props) => {
    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem('@hasOnboarded', JSON.stringify({
                hasOnboarded: true
            }));

        } catch (e) {
            Alert.alert(e.message)
        }
        navigation.navigate("Auth")

    }
    const skipOnboarding = async () => {

    }
    return (
        <Onboarding
            onDone={completeOnboarding}
            onSkip={completeOnboarding}
            pages={[
                {
                    backgroundColor: "rgb(217,125,84)",
                    image: <Image source={require('../../../MyAssets/pngtryout.png')} style={{ width: 180, height: 180 }} />,
                    title: 'Plans',
                    subtitle: 'Create Customized Workout Plans',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../../MyAssets/undraw.png')} style={{ width: 180, height: 180 }} />,
                    title: 'Tracking',
                    subtitle: 'Track your day tooday exercises in a way you see fit',
                }
            ]}
        />
    )
}
const styles = StyleSheet.create({

})
export default OnBoarding;