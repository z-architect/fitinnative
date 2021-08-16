import { instance, refreshAuth, signoutOfFirebase } from "../config";
import {
  SigninResponseSpec,
  SignupRequestSpec,
  SignupResponseSpec,
  UpdateFCMTokenRequestSpec,
  UpdateInstanceIdRequestSpec,
} from "../Spec/AccessSpec";
import { SuccessData } from "../Spec/CommonSpec";

class Access {
  static async signup(
    data: SignupRequestSpec
  ): Promise<SuccessData<SignupResponseSpec> | null> {
    try {
      const res = await instance.post(
        `${instance.defaults.baseURL}/access/signup`,
        data
      );

      if (res.data && res.data.data) return res.data;

      return null;
    } catch (err) {
      return null;
    }
  }

  static async signin(): Promise<SuccessData<SigninResponseSpec> | null> {
    try {
      const res = await instance.put(
        `${instance.defaults.baseURL}/access/signin`
      );

      if (res.data && res.data.data) return res.data;

      return null;
    } catch (err) {
      return null;
    }
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

      return res.status === 204;
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
