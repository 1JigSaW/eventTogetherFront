import {useMutation, useQuery} from '@tanstack/react-query';
import {UserProfileApi, UserProfileData} from '../api/userprofile';

export const USER_PROFILE_UPDATE_QUERY_KEY = 'user_profile_update';
export const USER_PROFILE_DETAIL_QUERY_KEY = 'user_profile_detail';

interface AxiosError extends Error {
  response?: {
    message?: string;
    status: number;
    data: any;
  };
}

export const useUpdateUserProfile = () => {
  return useMutation<
    {user_profile_id: number; data: UserProfileData},
    AxiosError,
    UserProfileData
  >(
    (userProfileData: UserProfileData) =>
      UserProfileApi.updateUserProfile(userProfileData),
    {
      onError: error => {
        if (error.response && error.response.status === 400) {
          console.error(error.response.data);
        } else {
          console.error(error);
        }
      },
    },
  );
};
export const useUserProfileDetail = (userId: number | null) => {
  return useQuery<UserProfileData, AxiosError>(
    [USER_PROFILE_DETAIL_QUERY_KEY, userId],
    () => UserProfileApi.getUserProfileDetail(userId),
    {
      retry: 0,
    },
  );
};

