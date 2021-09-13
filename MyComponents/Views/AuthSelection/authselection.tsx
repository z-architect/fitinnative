import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Props } from "../../types";
import { onAuthStateChanged } from "../../../api/utils";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Signin = ({ navigation, route }: Props) => {
  const [authType, setauthType] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // Handle user state changes
  async function _onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    console.log(user);

    await onAuthStateChanged(user);

    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    return Auth().onAuthStateChanged(_onAuthStateChanged); // unsubscribe on unmount
  }, []);

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = Auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return Auth().signInWithCredential(googleCredential);
  }
  if (initializing) return null;
  return (
    <View style={styles.container}>
      <View style={styles.tophalfcontainer}>
        <View style={styles.logoContainer}>
          <View
            style={{
              transform: [{ rotate: "45deg" }],
            }}
          >
            <AntDesign name="closesquareo" color="white" size={60} />
          </View>
          <Text style={styles.logoText}>Fit in</Text>
        </View>
        <View style={styles.lowerTextContainer}>
          <View style={styles.innerLowerTextContainer}>
            <Text style={styles.bigText}>Create a New Account</Text>
            <Text style={{ color: "white", fontSize: 32 }}>___</Text>
            <Text style={styles.smallText}>
              For the best experience with fitin
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.signupbutton,
            {
              borderBottomWidth: authType ? 3 : 0,
              width: authType ? "55%" : "45%",
            },
          ]}
          onPress={() => {
            setauthType(true);
          }}
        >
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.signinbutton,
            {
              borderBottomWidth: authType ? 0 : 3,
              width: authType ? "45%" : "55%",
            },
          ]}
          onPress={() => {
            setauthType(false);
          }}
        >
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomhalfcontainer}>
        <TouchableOpacity
          style={styles.emailbutton}
          onPress={() => {
            navigation.navigate(authType ? "Signup" : "Login");
          }}
        >
          <Fontisto name="email" color="black" size={28} />
          <Text style={{ color: "black", marginHorizontal: 10 }}>
            {authType ? "SIGN UP WITH EMAIL" : "LOGIN WITH EMAIL"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googlebutton}
          onPress={() => {
            onGoogleButtonPress().then(() =>
              console.log("Signed in with Google!")
            );
          }}
        >
          <AntDesign name="googleplus" color="white" size={28} />
          <Text style={{ color: "white", marginHorizontal: 10 }}>
            {authType ? "SIGN UP WITH GOOGLE" : "LOGIN WITH GOOGLE"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(50,71,85)",
    // , borderWidth: 2,
    // borderColor: "red"
  },
  tophalfcontainer: {
    height: "60%",
    justifyContent: "space-between",
    padding: 40,
    // , borderWidth: 2,
    // borderColor: "red"
  },
  bottomhalfcontainer: {
    height: "30%",
    justifyContent: "space-evenly",
    // , borderWidth: 2,
    // borderColor: "red"
  },
  logoContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    // , borderWidth: 2,
    // borderColor: "red"
  },
  logoText: {
    fontSize: 50,
    color: "white",
  },
  bigText: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 18,
    color: "white",
  },
  lowerTextContainer: {
    height: "50%",
    paddingHorizontal: "15%",
    justifyContent: "center",
    alignItems: "center",
    // , borderWidth: 2,
    // borderColor: "red"
  },
  innerLowerTextContainer: {
    // justifyContent: "space-evenly"
  },
  buttonsContainer: {
    height: "10%",
    flexDirection: "row",
  },
  signupbutton: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "rgb(217,125,84)",
  },
  signinbutton: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "rgb(217,125,84)",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  emailbutton: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
    marginHorizontal: "10%",
    borderRadius: 50,
  },
  googlebutton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
    borderColor: "white",
    borderWidth: 2,
    marginHorizontal: "10%",
    borderRadius: 50,
  },
});
export default Signin;
