import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert, TextInput, ScrollView, Dimensions, Touchable } from "react-native";
import FontAwesome1 from 'react-native-vector-icons/FontAwesome';
import { Input } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Plans from '../Plans/planshome';
import Monitor from '../Monitoring/graphs';
import Tracking from '../Tracking/tracking';
import Meal from '../Tracking/meal';
import Daily from '../DailyGoals/dailygoal';
import Vitals from '../Tracking/vitals';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Props } from '../../types';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const Tabs = createBottomTabNavigator();
const Home = ({ navigation, route }: Props) => {
    const [Modal, SetModal] = useState(false);
    return (
        <View style={styles.container}>




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
                            iconName = 'plus'
                        }
                        else if (route.name === 'Meal') {
                            iconName = 'leaf'
                        }
                        else if (route.name === 'Vitals') {
                            iconName = 'heart'
                        }
                        else {
                            iconName = "left"
                        }

                        // You can return any component that you like here!
                        // <TouchableOpacity style={{route.name === }}>
                        return <FontAwesome1 name={iconName} size={size} color={color} />;
                        //   </TouchableOpacity>
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tabs.Screen name="Plans" component={Plans} />
                <Tabs.Screen name="Monitor" component={Monitor} />
                <Tabs.Screen name="Track"

                    options={{
                        tabBarIconStyle: { color: "white" },
                        tabBarButton: props =>
                            <TouchableOpacity  {...props} style={styles.maincircle} />

                    }}
                    listeners={{
                        tabPress: e => {
                            // Prevent default action
                            e.preventDefault();
                            // Alert.alert("tabpressed");
                            if (Modal === false)
                                SetModal(true)
                            else if (Modal === true)
                                SetModal(false)
                        },
                    }}


                    component={Tracking} />
                <Tabs.Screen name="Meal"

                    component={Daily} />
                <Tabs.Screen name="Vitals" component={Vitals} />
                {/* <Tabs.Screen name="Plans" component={Plans } /> */}
            </Tabs.Navigator>
            {

                Modal ?
                    <>
                        <View style={styles.overlay}>
                            <Text>Hello im the modal</Text>
                        </View>


                        <TouchableOpacity style={[styles.circle, styles.circle1]} onPress={() => {
                            SetModal(false);
                            navigation.navigate("Meal")
                        }}>
                            <Text> <MaterialCommunityIcons name="food" color="black" size={34} /> </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.circle, styles.circle2]}>
                            <Text> <MaterialCommunityIcons name="pulse" color="black" size={34} /> </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.circle, styles.circle3]}>
                            <Text> <FontAwesome name="weight" color="black" size={34} /> </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.circle, styles.circlex]} onPress={() => { SetModal(false) }}>
                            <Text> <AntDesign name="close" color="white" size={34} /> </Text>
                        </TouchableOpacity>

                    </>


                    :
                    <>
                    </>

            }
        </View>
    )
}
const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(100,100,100,0.6)',
        justifyContent: "center",
        alignItems: "center"

    },
    container: {
        height: y,
        width: x,
        position: "relative"
    },
    maincircle: {
        position: "absolute",
        zIndex: 1,
        bottom: -10,
        left: (x - 80) / 2,
        height: 80,
        width: 80,
        marginBottom: 40,
        borderRadius: 40,
        backgroundColor: "rgb(217,125,84)",
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderColor: "white",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    circle1: {
        position: "absolute",
        bottom: 90,
        left: 55
    },
    circle2: {
        position: "absolute",
        bottom: 170,
        marginHorizontal: (x - 80) / 2
    },
    circle3: {
        position: "absolute",
        bottom: 90,
        right: 55
    },
    circlex: {
        position: "absolute",
        bottom: 30,
        marginHorizontal: (x - 80) / 2,
        backgroundColor: "rgba(217,125,84,0.8)",
        borderWidth: 0,
        shadowColor: "rgb(217,125,84)",
        shadowRadius: 3.0,
        shadowOpacity: 0.5,
        elevation: 6,

    }
})
export default Home;

// tabBarButton: () => (
//     <TouchableOpacity style={styles.maincircle} onPress={() => { SetModal(false) }}>
//         <Text>H</Text>
//     </TouchableOpacity>)

// }} 