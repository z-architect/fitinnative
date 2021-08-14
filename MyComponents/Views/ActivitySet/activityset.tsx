import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';

import { useEffect } from 'react';
import NumericInput from 'react-native-numeric-input';
import { Modal, Button, Switch } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import Activity from './activity';
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;
const ActivitySet = () => {
  const [showModal, setShowModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)

  return (
    <>
      <Modal isOpen={showActivityModal} onClose={() => setShowActivityModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.gif, { marginRight: 15 }]}>

            </View>
            Create Activity</Modal.Header>
          <Modal.Body>

            <TextInput placeholder="Activity name ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />

            <TextInput placeholder="Description ?" placeholderTextColor="black" style={{ color: "black", borderBottomWidth: 1, marginVertical: 10 }} />

            <TouchableOpacity style={styles.button}  >
              <Text style={{ color: "white" }}>Add a GIF</Text>
            </TouchableOpacity>

          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>

              <Button
                onPress={() => {
                  setShowActivityModal(false)
                }}
              >
                Create
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Activities</Modal.Header>
          <Modal.Body>
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />
            <Activity />

          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>

              <Button
                onPress={() => {
                  setShowActivityModal(true)
                }}
              >
                + New Activity
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <View style={styles.container}>
        <View style={styles.card}>



          <View style={styles.head}>
            <View style={styles.gif}>
              <Text> GIF</Text>
            </View>
            <View style={styles.input}>
              <TouchableOpacity onPress={() => { setShowModal(true) }}>
                <TextInput placeholder="select something" editable={false} placeholderTextColor="black" style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey", color: "black" }} onChangeText={() => { }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyleft}>
              <View>
                <NumericInput
                  type='up-down'
                  onChange={value => console.log(value)}
                  rounded
                  upDownButtonsBackgroundColor="rgb(50,71,85)"
                  iconStyle={{ color: "white" }}
                />
                <Text>Duration in Minutes</Text>
              </View>

              <View>
                <NumericInput
                  type='up-down'
                  onChange={value => console.log(value)}
                  rounded
                  upDownButtonsBackgroundColor="rgb(50,71,85)"
                  iconStyle={{ color: "white" }}
                />
                <Text>Repetition</Text>
              </View>

            </View>

            <View style={styles.bodyright}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }} >Tempo</Text>
                <View style={{ flexDirection: "row", marginBottom: 5, alignItems: "center" }}>
                  <Text style={{ marginRight: 5 }}>Intense</Text>
                  <Switch size="lg" trackColor={{ true: 'rgb(50,71,85)', false: "grey" }} />
                  <Text style={{ marginLeft: 5 }}>Chill</Text>
                </View>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>METs</Text>
                <NumericInput type='plus-minus'
                  onChange={value => console.log(value)}
                  textColor="black"
                  iconStyle={{ color: "white" }}
                  rounded
                  rightButtonBackgroundColor='rgb(50,71,85)'
                  leftButtonBackgroundColor='rgb(50,71,85)' />
                <Text>Calories Burn Rate</Text>
              </View>

            </View>



            {/* <View style={styles.plusminus}>
            
             

            </View>
            <View style={styles.switch}>
              <View style={styles.duration}><Text>SOmething</Text></View>
              <View style={styles.rest}><Text>Again</Text></View>
            </View> */}

          </View>

          <View style={styles.foot}>
            <Feather name="edit" size={22} color="lightblue" />
            <TextInput placeholder="Description" placeholderTextColor="black" style={{ marginHorizontal: 10, fontSize: 16, color: "black" }} />
          </View>


        </View>

        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.button}><Text style={{ fontSize: 28, color: "white" }}>Create Set </Text></TouchableOpacity>

      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(217,125,84)",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    height: y * 0.5,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between"
  },
  head: {
    flexDirection: "row",
    height: "15%"
  },
  body: {
    height: "65%",
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    // backgroundColor: "pink"
    // alignItems: "center"
  },
  bodyleft: {
    justifyContent: "space-between",
    borderRightWidth: 1,
    borderRightColor: "lightgrey",
    // backgroundColor: "pink",
    padding: 20,
    marginVertical: 5,
  },
  bodyright: {
    justifyContent: "space-between",
    padding: 20,
    marginLeft: 10,
    marginVertical: 5,
  },
  foot: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // borderRadius: 10
  },
  footinput: {
    // border
  },
  gif: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    justifyContent: "center",
    padding: 10,
    // backgroundColor: "pink",
    flexGrow: 1,
    color: "black"
  },
  plusminus: {
    flexDirection: "row"
  },
  duration: {
    width: "100%",
    backgroundColor: "lightblue",
    margin: 4,
    borderRadius: 6
  },
  rest: {
    width: "100%",
    backgroundColor: "yellow",
    margin: 4,
    borderRadius: 6
  },
  switch: {
    width: "80%"
  },
  met: {

  },
  button: {
    // position: "absolute",
    // bottom: 50,
    width: "60%",
    marginTop: 20,
    marginHorizontal: "20%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    backgroundColor: "rgb(50,71,85)"
  }
})

export default ActivitySet;