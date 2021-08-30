import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Activity = (props: any) => {
    return (
        <TouchableOpacity style={styles.SessionCard} onPress={() => { props.onPress() }}>
            <View style={styles.gif}>

            </View>
            <Text>{props.data.name}</Text>
            <View style={styles.sessioncardimage}>
                <Text>Custom</Text>
            </View>
            {
                // props.data?.custom === 
                true ?
                    (<TouchableOpacity onPress={() => { props.onDeleteButtonPress() }}>
                        <AntDesign name="delete" size={32} color="red" />
                    </TouchableOpacity>) :
                    (<>

                    </>)
            }

        </TouchableOpacity >

    )
}
const styles = StyleSheet.create({

    SessionCard: {
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
    sessioncardimage: {}
})
export default Activity;