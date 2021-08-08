import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { useEffect } from 'react';
import NumericInput from 'react-native-numeric-input';
import { Modal, Button } from 'native-base';

import Axios from 'axios';
// import firebase from 'firebase';
// import "firebase/messaging";
// import "firebase/installations"
// import ourKey from '../vapidKey.json';
// import config from '../google-services.json';

// let client:any;
// let instanceId;
// let fcmToken;
// let firebaseUser;
// let authClient;

// const ourFunc = async ()=>{
//     client =  firebase.initializeApp(config);
//     client.auth().useEmulator('http://192.168.30.136:9099');
//     // instanceId = await client.installations().getId();
//     // fcmToken = await client.messaging().getToken(ourKey); 

//     firebaseUser =( await firebase.auth().createUserWithEmailAndPassword("davidog242@gmail.com","kebe")).user
//     console.log(firebaseUser?.getIdToken);
// }
const ActivitySet = () => {
  const [showModal, setShowModal] = useState(false)
  // const [Client, setClient] = useState<firebase.app.App>({} as firebase.app.App);
  // const [InstanceId, setInstanceId] = useState("");



  // useEffect(()=>{
  //        ourFunc();

  //         // on installation




  //     },[])
  //     useEffect(()=>{

  //})
  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Modal Title</Modal.Header>
          <Modal.Body>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna
            exercitation reprehenderit magna aute tempor cupidatat consequat

          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button>LEARN MORE</Button>
              <Button
                onPress={() => {
                  setShowModal(false)
                }}
              >
                ACCEPT
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
                <TextInput placeholder="select something" editable={false} onChangeText={() => { }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.plusminus}>
              <NumericInput type='up-down' onChange={value => console.log(value)} />
              <NumericInput type='plus-minus' onChange={value => console.log(value)} />

            </View>
            <View style={styles.switch}>
              <View style={styles.duration}><Text>SOmething</Text></View>
              <View style={styles.rest}><Text>Again</Text></View>
            </View>
          </View>

          <View style={styles.foot}>
            <View style={styles.met}><Text>MET</Text></View>
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.button}><Text style={{ fontSize: 28, color: "white" }}>Button </Text></TouchableOpacity>
          </View>


        </View>
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
    height: "50%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between"
  },
  head: {
    flexDirection: "row",
    height: "35%"
  },
  body: {
    height: "45%",
    width: "100%",
    padding: 20,
    alignItems: "center"
  },
  foot: {
    height: "20%",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10
  },
  gif: {
    width: "40%",
    borderWidth: 1
  },
  input: {
    justifyContent: "center",
    padding: 10
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

    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    backgroundColor: "rgb(110,140,160)"
  }
})

export default ActivitySet;