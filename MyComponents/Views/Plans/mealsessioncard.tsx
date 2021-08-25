import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { flexDirection } from 'styled-system';
const SessionCard = (props: any) => {
    return (
        <View style={styles.SessionCard} >
            <TouchableOpacity style={styles.SessionCardData} onPress={() => {
                // props.setSelected(props.sessionMeta.id) 
            }}>
                <View style={styles.sessioncardimage}>

                </View>
                <Text>{
                    // props.sessionMeta.name
                    "Food1"
                }</Text>
                <View >
                    <Text>Something</Text>
                </View>

            </TouchableOpacity>
            <Text>
                7:40
            </Text>
            <TouchableOpacity onPress={() => {
                // props.deleteSession() 
            }}>
                <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>

        </View >

    )
}
const styles = StyleSheet.create({

    SessionCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 10

    },
    SessionCardData: {
        width: "75%",
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    sessioncardimage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "rgb(50,71,85)"

    },
    SessionCardIcons: {
        width: "20%",
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})
export default SessionCard;