import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  EmailAndPasswordAccessCred,
  FirebaseAccessMethod,
  SuccessData,
} from "./spec";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AxiosRequestConfig } from "axios";
import { getFCMToken, getInstallationId, instance } from "./config";

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

/**
 * Request create
 */
export async function requestCreate<T, H>(
  route: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<SuccessData<H> | null> {
  try {
    const res = await instance.post(
      `${instance.defaults.baseURL}${route}`,
      data,
      config
    );

    if (res.data && res.data.data && res.status === 201) return res.data;

    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Request fetch
 */
export async function requestFetch<T>(
  route: string,
  config?: AxiosRequestConfig
): Promise<SuccessData<T> | null> {
  try {
    const res = await instance.get(
      `${instance.defaults.baseURL}${route}`,
      config
    );

    if (res.data && res.data.data && res.status === 200) return res.data;

    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Request update
 */
export async function requestUpdate<T>(
  route: string,
  data?: T,
  config?: AxiosRequestConfig
): Promise<boolean> {
  try {
    const res = await instance.put(
      `${instance.defaults.baseURL}${route}`,
      data,
      config
    );

    return res.status === 204;
  } catch (err) {
    return false;
  }
}

/**
 * Request update with return
 */
export async function requestUpdateWithReturn<T, H>(
  route: string,
  data?: T,
  config?: AxiosRequestConfig
): Promise<H | null> {
  try {
    const res = await instance.put(
      `${instance.defaults.baseURL}${route}`,
      data,
      config
    );

    if (res.data && res.data.data && res.status === 200) return res.data;

    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Request delete
 */
export async function requestDelete(
  route: string,
  config?: AxiosRequestConfig
): Promise<boolean> {
  try {
    const res = await instance.delete(
      `${instance.defaults.baseURL}${route}`,
      config
    );

    return res.status === 204;
  } catch (err) {
    return false;
  }
}

/**
 * Request delete with return
 */
export async function requestDeleteWithReturn<T>(
  route: string,
  config?: AxiosRequestConfig
): Promise<T | null> {
  try {
    const res = await instance.delete(
      `${instance.defaults.baseURL}${route}`,
      config
    );

    if (res.data && res.data.data && res.status === 200) return res.data;

    return null;
  } catch (err) {
    return null;
  }
}
