import {
  ProfileGetOwnResponseSpec,
  ProfileGetResponseSpec,
  ProfilesGetRequestSpec,
  ProfilesGetResponseSpec,
  ProfileUpdateRequestSpec,
} from "../spec";
import { requestDelete, requestFetch, requestUpdate } from "../utils";

export class Profile {
  static async getProfiles(params: ProfilesGetRequestSpec) {
    return requestFetch<ProfilesGetResponseSpec[]>("/profile", { params });
  }

  static async updateProfile(data: ProfileUpdateRequestSpec) {
    return requestUpdate<ProfileUpdateRequestSpec>("/profile", data);
  }

  static async removeProfile(): Promise<boolean> {
    return requestDelete("/profile");
  }

  static async getOwnProfile() {
    return requestFetch<ProfileGetOwnResponseSpec>("/profile/me");
  }

  static async getProfile(profileID: string) {
    return requestFetch<ProfileGetResponseSpec>(`/profile/${profileID}`);
  }
}
