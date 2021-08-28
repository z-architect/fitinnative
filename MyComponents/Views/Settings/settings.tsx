import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Switch, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Settings = () => {
    //const [SelectedValue, SetSelectedValue] = useState("Dark")
    const [Val1, SetVal1] = useState(true);
    const [Val2, SetVal2] = useState(false);
    const [Val3, SetVal3] = useState(false);

    const [ValSec1, SetValSec1] = useState(true);
    const [ValSec2, SetValSec2] = useState(false);
    const [ValSec3, SetValSec3] = useState(false);

    const SetSelectedValue = (value: boolean, no: number, type: string) => {
        if (type === "theme") {
            if (value === true) {
                if (no === 1) {
                    SetVal1(true);
                    SetVal2(false);
                    SetVal3(false);
                }
                else if (no === 2) {
                    SetVal1(false);
                    SetVal2(true);
                    SetVal3(false);
                } else if (no === 3) {
                    SetVal1(false);
                    SetVal2(false);
                    SetVal3(true);
                }
            }
            else if (value === false) {

            }
        }
        else if (type === "lang") {
            if (value === true) {
                if (no === 1) {
                    SetValSec1(true);
                    SetValSec2(false);
                    SetValSec3(false);
                }
                else if (no === 2) {
                    SetValSec1(false);
                    SetValSec2(true);
                    SetValSec3(false);
                } else if (no === 3) {
                    SetValSec1(false);
                    SetValSec2(false);
                    SetValSec3(true);
                }
            }
            else if (value === false) {

            }


        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headertext}>Settings</Text>
            <View style={[styles.container1, styles.cardcontainer]}>
                <Text style={styles.cardheadertext}>Accesibility</Text>

                <View style={styles.optioncontainer}>
                    <Text style={styles.optiontext}>Dark Mode</Text>
                    <Switch onValueChange={(val) => { SetSelectedValue(val, 1, "theme") }} value={Val1} />
                </View>

                <View style={styles.optioncontainer}>
                    <Text style={styles.optiontext}>Dimmed Mode</Text>
                    <Switch onValueChange={(val) => { SetSelectedValue(val, 2, "theme") }} value={Val2} />
                </View>

                <View style={styles.optioncontainer}>
                    <Text style={styles.optiontext}>Light mode</Text>
                    <Switch onValueChange={(val) => { SetSelectedValue(val, 3, "theme") }} value={Val3} />
                </View>

            </View>
            <View style={[styles.container2, styles.cardcontainer]}>
                <Text style={styles.cardheadertext}>Language</Text>

                <View style={styles.optioncontainer}>
                    <Text style={styles.optiontext}>English</Text>
                    <Switch onValueChange={(val) => { SetSelectedValue(val, 1, "lang") }} value={ValSec1} />
                </View>

                <View style={styles.optioncontainer}>
                    <Text style={styles.optiontext}>Amharic</Text>
                    <Switch onValueChange={(val) => { SetSelectedValue(val, 2, "lang") }} value={ValSec2} />
                </View>

                <View style={styles.optioncontainer}>
                    <Text style={styles.optiontext}>French</Text>
                    <Switch onValueChange={(val) => { SetSelectedValue(val, 3, "lang") }} value={ValSec3} />
                </View>
            </View>
            <View style={[styles.container3,]}>
                <Text style={styles.cardheadertext}>About</Text>
                <View style={{ marginLeft: 20, marginTop: 10 }}>

                    <Text>
                        Property of Axe Software Developments
                    </Text>
                    <Text>
                        @All Rights Reserved
                    </Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    headertext: {
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 15,
        marginLeft: 30
    },
    container: {
        height: y,
        width: x
    },
    cardcontainer: {
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        width: x * 0.9,

        //backgroundColor: "pink",
        height: y * 0.27,
        shadowColor: "black",
        shadowOpacity: 0.5,
        //shadowRadius: 5,
        elevation: 4,
        backgroundColor: "white"

    },
    cardheadertext: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 15,
        marginTop: 10
    },
    container1: {

    },
    container2: {},
    container3: {
        marginLeft: 20,
        //borderRadius: 20,
        //marginHorizontal: 20,
        marginVertical: 10,
        width: x,

        //backgroundColor: "pink",
        height: y * 0.27,
        // shadowColor: "black",
        // shadowOpacity: 0.5,
        //shadowRadius: 5,
        // elevation: 4,
        //backgroundColor: "grey"
    },
    optioncontainer: {
        width: "100%",
        justifyContent: "space-between",
        marginTop: 10

    },
    optiontext: {
        fontSize: 16,
        marginHorizontal: 10
    }
})
export default Settings;

