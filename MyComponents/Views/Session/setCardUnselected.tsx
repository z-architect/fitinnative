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

                <View style={styles.gif}>

                </View>
                <Text> Name of Set</Text>
                <View >
                    <Text>Intensity</Text>
                </View>

            </TouchableOpacity>
            <View style={styles.SetCardIcons}>
                <TouchableOpacity onPress={() => {
                    // props.editSet()
                }}>

                    <AntDesign name="edit" size={24} color="lightblue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    //  props.deleteSet() 
                }}>
                    <AntDesign name="delete" size={24} color="orange" />
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
        height: 80,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 5

    },
    gif: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    SetCardData: {
        width: "75%",
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
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
        justifyContent: "space-between"
    }
})
export default SetCard;