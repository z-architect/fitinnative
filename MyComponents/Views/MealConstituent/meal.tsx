import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Activity = () => {
    return (
        <TouchableOpacity style={styles.SessionCard}>
            <View style={styles.gif}>

            </View>
            <Text>ActivityName</Text>
            <View style={styles.sessioncardimage}>
                <Text>Something</Text>
            </View>

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