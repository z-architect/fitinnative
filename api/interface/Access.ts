import {
  refreshAuth,
  requestCreate,
  requestUpdateWithReturn,
  signoutOfFirebase,
} from "../utils";
import {
  SigninResponseSpec,
  SignupRequestSpec,
  SignupResponseSpec,
  UpdateFCMTokenRequestSpec,
  UpdateInstanceIdRequestSpec,
} from "../spec";
import { instance } from "../config";

export class Access {
  static async signup(data: SignupRequestSpec) {
    return requestCreate<SignupRequestSpec, SignupResponseSpec>(
      "/access/signup",
      data
    );
  }

  static async signin() {
    return requestUpdateWithReturn<any, SigninResponseSpec>("/access/signin");
  }

  static async updateFCMToken(
    data: UpdateFCMTokenRequestSpec
  ): Promise<boolean> {
    try {
      await refreshAuth();
      const res = await instance.put(
        `${instance.defaults.baseURL}/access/updateFCMToken`,
        data
      );

      if (res.status === 204) {
        // TODO change the token in local store
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  static async updateInstanceId(
    data: UpdateInstanceIdRequestSpec
  ): Promise<boolean> {
    try {
      await refreshAuth();
      const res = await instance.put(
        `${instance.defaults.baseURL}/access/updateInstanceId`,
        data
      );

      return res.status === 204;
    } catch (err) {
      return false;
    }
  }

  static async signOut(): Promise<boolean> {
    try {
      // sign out of fitin
      const res = await instance.put(
        `${instance.defaults.baseURL}/access/signout`
      );

      // sign out of firebase
      if (res.status === 204) {
        await signoutOfFirebase();
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }
}
