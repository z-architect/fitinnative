import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Props } from "../../types";

const y = Dimensions.get("window").height;

function Notifications({ navigation }: Props) {
    const [plans, setPlans] = useState([]);

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <MaterialIcons name="navigate-before" size={40} color="black" />
                </TouchableOpacity>
                <View style={{ justifyContent: "center", marginLeft: 20 }}>
                    <Text style={{ fontSize: 22 }}>Notifications</Text>
                </View>
            </View>
            {!!plans.length ? (
                <ScrollView />
            ) : (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ fontSize: 16 }}>You don't have any notifications.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "rgba(110,140,160,0.1)",
    },
    head: {
        height: y * 0.085,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingRight: 20,
        elevation: 5,
    },
});

export default Notifications;
