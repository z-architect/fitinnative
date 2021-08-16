import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const SessionCard = (props: any) => {
    return (
        <TouchableOpacity style={styles.SessionCard} onPress={() => { props.setSelected(props.sessionMeta.id) }}>
            <Text>{props.sessionMeta.name}</Text>
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
        height: 100,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 5.0,
        elevation: 3,
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 10

    },
    sessioncardimage: {}
})
export default SessionCard;