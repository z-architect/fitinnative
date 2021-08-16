import { instance } from "../config";
import {
  ProfileGetOwnResponseSpec,
  ProfilesGetRequestSpec,
  ProfilesGetResponseSpec,
  ProfileUpdateRequestSpec,
} from "../Spec/ProfileSpec";
import { SuccessData } from "../Spec/CommonSpec";

class Profile {
  static async getProfiles(
    params: ProfilesGetRequestSpec
  ): Promise<SuccessData<ProfilesGetResponseSpec[]> | null> {
    try {
      const res = await instance.get(`${instance.defaults.baseURL}/profile`, {
        params,
      });

      if (res.data && res.data.data) return res.data;

      return null;
    } catch (err) {
      return null;
    }
  }

  static async updateProfile(data: ProfileUpdateRequestSpec): Promise<boolean> {
    try {
      const res = await instance.put(
        `${instance.defaults.baseURL}/profile`,
        data
      );

      return res.status === 204;
    } catch (err) {
      return false;
    }
  }

  static async removeProfile(): Promise<boolean> {
    try {
      const res = await instance.delete(`${instance.defaults.baseURL}/profile`);

      return res.status === 204;
    } catch (err) {
      return false;
    }
  }

  static async getOwnProfile(): Promise<SuccessData<ProfileGetOwnResponseSpec> | null> {
    try {
      const res = await instance.get(`${instance.defaults.baseURL}/profile/me`);

      if (res.data && res.data.data) return res.data;

      return null;
    } catch (err) {
      return null;
    }
  }

  static async getProfile(
    profileID: string
  ): Promise<SuccessData<ProfileGetOwnResponseSpec> | null> {
    try {
      const res = await instance.get(
        `${instance.defaults.baseURL}/profile/${profileID}`
      );

      if (res.data && res.data.data) return res.data;

      return null;
    } catch (err) {
      return null;
    }
  }
}
