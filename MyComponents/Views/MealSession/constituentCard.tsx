import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SetCard = (props: any) => {
    return (
        <View style={styles.SetCard} >
            <TouchableOpacity style={styles.SetCardData} onPress={() => {
                //  props.setSelected(props.SetMeta.id) 
            }}>
                <Text style={{ fontWeight: "bold" }}> -{props.order}-</Text>
                <View style={[styles.Setcardimage, { backgroundColor: props.setcolor }]}>

                </View>
                <Text>{props.data.name}</Text>
                <View >
                    <Text>{props.data.duration}</Text>
                </View>

            </TouchableOpacity>
            <View style={styles.SetCardIcons}>

                <TouchableOpacity onPress={() => {
                    props.deleteSet()
                }}>
                    <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View >

    )
}
const styles = StyleSheet.create({

    SetCard: {
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
    SetCardData: {
        width: "75%",
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    Setcardimage: {
        width: 60,
        height: 60,
        borderRadius: 30,


    },
    SetCardIcons: {
        width: "20%",
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "flex-end"
    }
})
export default SetCard;