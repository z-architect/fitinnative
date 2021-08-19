import axios from "axios";
import messaging from "@react-native-firebase/messaging";
import iid from "@react-native-firebase/iid";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import GoogleServicesKey from "../android/app/google-services.json";

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

export async function getFCMToken() {
  try {
    return await messaging().getToken(); // TODO save to local storage before this
  } catch (err) {
    return null;
  }
}

export async function getInstallationId() {
  try {
    return await iid().get();
  } catch (err) {
    return null;
  }
}
