

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Modal } from 'native-base';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const DeltetModal = (props: any) => {
    return (
        <>
            <Modal isOpen={props.DeleteModal} onClose={() => props.setDeleteModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <View style={styles.modaltophalf}>

                        <View style={styles.giantxcontainer}>
                            <AntDesign name="close" size={78} color="black" />
                        </View>
                        <Text style={{ fontSize: 34, fontWeight: "bold" }}>
                            Are you Sure?
                        </Text>
                    </View>
                    <View style={styles.modalbottomhalf}>
                        <View>
                            <Text> Do you really want to delete these records?</Text>
                            <Text>This action can not be undone!!!</Text>
                        </View>
                        <View style={styles.modlabuttoncontainer}>
                            <TouchableOpacity style={[styles.modalbutton, { backgroundColor: "rgb(110,140,160)" }]} onPress={() => props.setDeleteModal(false)}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.modalbutton, { backgroundColor: "rgba(217,125,84,0.9)" }]}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal.Content>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    modaltophalf: {
        height: y * 0.25,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    modalbottomhalf: {
        height: y * 0.25,
        width: "100%",
        justifyContent: "space-around",
        padding: 20
    },
    giantxcontainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 160,
        width: 160,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: "orange"
    },
    modlabuttoncontainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly"
    },
    modalbutton: {
        borderRadius: 10,
        height: 50,
        width: 140,
        justifyContent: "center",
        alignItems: "center",


    }

})
export default DeltetModal;
