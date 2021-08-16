

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions } from "react-native";
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Input } from 'native-base';
// const x = Dimensions.get("window").width;
// const y = Dimensions.get("window").height;

// const Auth = () => {
//     return (
//         <View>

//         </View>
//     )
// }
// const styles = StyleSheet.create({

// })
// export default Auth;






// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, Dimensions, Alert } from "react-native";
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import { Input } from 'native-base';

// const x = Dimensions.get("window").width;
// const y = Dimensions.get("window").height;

// const MealModal = () => {
//     const [Modal, SetModal] = useState(true);
//     return (
//         <View style={styles.container}>
//             <View style={styles.big}>
//                 <Text>Hellow world</Text>
//                 <TouchableOpacity onPress={() => { SetModal(true) }}>
//                     <Text>Something</Text>
//                 </TouchableOpacity>
//             </View>

//             {

//                 Modal ?
//                     <>
//                         <View style={styles.overlay}>
//                             <View style={styles.iconContainer}>

//                             </View >
//                             <View style={styles.buttonsContainer}>
//                                 <TouchableOpacity>

//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </>
//                     :
//                     <></>
//             }
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         position: "relative"
//     },
//     overlay: {
//         position: "absolute",
//         top: 0,
//         bottom: 0,
//         right: 0,
//         left: 0,
//         backgroundColor: 'rgba(100,100,100,0.6)',
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     iconContainer: {},
//     buttonsContainer: {},
//     big: {
//         height: "100%",
//         backgroundColor: "pink",
//         justifyContent: "flex-end"
//     },
// })
// export default MealModal;




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

  // const [Client, setClient] = useState<firebase.app.App>({} as firebase.app.App);
  // const [InstanceId, setInstanceId] = useState("");



  // useEffect(()=>{
  //        ourFunc();

  //         // on installation




  //     },[])
  //     useEffect(()=>{

  //})






//  import {
//    Colors,
//    DebugInstructions,
//    Header,
//    LearnMoreLinks,
//    ReloadInstructions,
//  } from 'react-native/Libraries/NewAppScreen';

//  const Section: React.FC<{
//    title: string;
//  }> = ({children, title}) => {
//    const isDarkMode = useColorScheme() === 'dark';
//    return (
//      <View style={styles.sectionContainer}>
//        <Text
//          style={[
//            styles.sectionTitle,
//            {
//              color: isDarkMode ? Colors.white : Colors.black,
//            },
//          ]}>
//          {title}
//        </Text>
//        <Text
//          style={[
//            styles.sectionDescription,
//            {
//              color: isDarkMode ? Colors.light : Colors.dark,
//            },
//          ]}>
//          {children}
//        </Text>
//      </View>
//    );
//  };

//  const App = () => {
//    const isDarkMode = useColorScheme() === 'dark';

//    const backgroundStyle = {
//      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//    };

//    return (
//      <SafeAreaView style={backgroundStyle}>
//        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//        <ScrollView
//          contentInsetAdjustmentBehavior="automatic"
//          style={backgroundStyle}>
//          <Header />
//          <View
//            style={{
//              backgroundColor: isDarkMode ? Colors.black : Colors.white,
//            }}>
//            <Section title="Step One">
//              Edit <Text style={styles.highlight}>App.js</Text> to change this
//              screen and then come back to see your edits.
//            </Section>
//            <Section title="See Your Changes">
//              <ReloadInstructions />
//            </Section>
//            <Section title="Debug">
//              <DebugInstructions />
//            </Section>
//            <Section title="Learn More">
//              Read the docs to discover what to do next:
//            </Section>
//            <LearnMoreLinks />
//          </View>
//        </ScrollView>
//      </SafeAreaView>
//    );
//  };

//  const styles = StyleSheet.create({
//    sectionContainer: {
//      marginTop: 32,
//      paddingHorizontal: 24,
//    },
//    sectionTitle: {
//      fontSize: 24,
//      fontWeight: '600',
//    },
//    sectionDescription: {
//      marginTop: 8,
//      fontSize: 18,
//      fontWeight: '400',
//    },
//    highlight: {
//      fontWeight: '700',
//    },
//  });
