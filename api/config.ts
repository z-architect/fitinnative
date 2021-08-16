import axios from "axios";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import iid from "@react-native-firebase/iid";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import GoogleServicesKey from "../android/app/google-services.json";
import {
  EmailAndPasswordAccessCred,
  FirebaseAccessMethod,
} from "./Spec/CommonSpec";

// initialize axios
export const instance = axios.create({
  baseURL: "http://127.0.0.1:44032/v1",
  headers: {
    common: {
      ["X-Instance-Id"]: getInstallationId(),
      ["X-FCM-Token"]: getFCMToken(),
    },
  },
});

// initialize Google SDK
GoogleSignin.configure({
  webClientId: GoogleServicesKey.client[0].oauth_client[0].client_id,
});

async function getFCMToken() {
  try {
    return await messaging().getToken(); // TODO save to local storage before this
  } catch (err) {
    return null;
  }
}

async function getInstallationId() {
  try {
    return await iid().get();
  } catch (err) {
    return null;
  }
}

/**
 * Refreshes all the default auth headers, ***instance id*** and ***fcm token***, in axios.
 * It will also update the ***authorization header*** if a ***token*** is provided.
 */
export async function refreshAuth(token?: string) {
  const installationId = await getInstallationId();
  const fcmToken = await getFCMToken();

  if (installationId)
    instance.defaults.headers.common["X-Instance-Id"] = installationId;
  if (fcmToken) instance.defaults.headers.common["X-FCM-Token"] = fcmToken;

  if (token) instance.defaults.headers.common["Authorization"] = token;
}

/**
 * To be called on every initialization of the app. // TODO DON'T FORGET TO USE THIS
 * **Give as *callback* on *auth().onAuthStateChanged(callback)*.**
 */
export async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
  try {
    const idToken = await user?.getIdToken();
    if (idToken) await refreshAuth(idToken);
  } catch (err) {}
}

/**
 * Links the phone number of a user with firebase
 */
export async function linkPhoneNumber(verificationId: string, code: string) {
  const credential = auth.PhoneAuthProvider.credential(verificationId, code);
  await auth().currentUser?.linkWithCredential(credential);
}

/**
 * Verify phone number.
 */
export async function verifyPhoneNumber(phoneNumber: string) {
  return auth().verifyPhoneNumber(phoneNumber);
}

/**
 * Authenticate user for firebase access if they are not
 * using email and password authentication.
 */
export async function authenticateForFirebase(
  method: FirebaseAccessMethod,
  phoneNumber?: string
) {
  if (method === FirebaseAccessMethod.GOOGLE) {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } else if (method === FirebaseAccessMethod.PHONE) {
    return await auth().signInWithPhoneNumber(phoneNumber || "", true);
  }
}

/**
 * Sign in to firebase. // TODO Use this on sign in before calling the signin api interface
 */
export async function signinToFirebase(
  method: FirebaseAccessMethod,
  cred?: EmailAndPasswordAccessCred,
  phoneNumber?: string
) {
  if (
    method === FirebaseAccessMethod.GOOGLE ||
    method === FirebaseAccessMethod.PHONE
  ) {
    return authenticateForFirebase(method, phoneNumber);
  } else if (method === FirebaseAccessMethod.EMAIL_AND_PASSWORD) {
    if (cred)
      return await auth().signInWithEmailAndPassword(cred.email, cred.password);
  }
}

/**
 * Sign up to firebase. // TODO uUe this on sign up before calling the signup api interface
 */
export async function signupToFirebase(
  method: FirebaseAccessMethod,
  cred?: EmailAndPasswordAccessCred,
  phoneNumber?: string
) {
  if (
    method === FirebaseAccessMethod.GOOGLE ||
    method === FirebaseAccessMethod.PHONE
  ) {
    return authenticateForFirebase(method, phoneNumber);
  } else if (method === FirebaseAccessMethod.EMAIL_AND_PASSWORD) {
    if (cred)
      return await auth().createUserWithEmailAndPassword(
        cred.email,
        cred.password
      );
  }
}

/**
 * Sign out of firebase.
 */
export async function signoutOfFirebase() {
  return auth().signOut();
}
