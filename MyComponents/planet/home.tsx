import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Input } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Plans from '../planet/plans';
import Monitor from '../graphs';
import Tracking from './tracking';

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const Tabs = createBottomTabNavigator();
const Home = () => {
    return (




        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Plans') {
                        iconName = 'clone'
                        // : 'gitlab';
                    } else if (route.name === 'Monitor') {
                        iconName = 'line-chart'
                    }
                    else if (route.name === 'Track') {
                        iconName = 'clock-o'
                    }
                    else {
                        iconName = "left"
                    }

                    // You can return any component that you like here!
                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tabs.Screen name="Plans" component={Plans} />
            <Tabs.Screen name="Monitor" component={Monitor} />
            <Tabs.Screen name="Track" component={Tracking} />
            {/* <Tabs.Screen name="Plans" component={Plans } /> */}
        </Tabs.Navigator>


    )
}
const styles = StyleSheet.create({

})
export default Home;