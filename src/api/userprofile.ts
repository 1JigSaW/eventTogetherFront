import {API} from './API';

export interface UserProfileData {
  id?: number;
  user: number | null;
  first_name: string;
  last_name: string;
  age: number;
  language: string[];
  interests: string[];
  description?: string;
  image?: string | null;
}

export class UserProfileApi {
  static async updateUserProfile(
    userProfileData: UserProfileData,
  ): Promise<{user_profile_id: number; data: UserProfileData}> {
    try {
      const {data} = await API.put(
        `/api/userprofile/update/${userProfileData.user}/`,
        userProfileData,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserProfileDetail(
    userId: number | null,
  ): Promise<UserProfileData> {
    try {
      const {data} = await API.get(`/api/userprofile/${userId}/`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserProfilePicture(
    userProfileId: number | null,
    picture: string | undefined,
  ): Promise<{success: boolean}> {
    try {
      const {data} = await API.put(
        `/api/userprofile/${userProfileId}/update_picture/`,
        {picture},
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
