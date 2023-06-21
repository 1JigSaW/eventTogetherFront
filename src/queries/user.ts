import {useMutation} from '@tanstack/react-query';
import {User, UserApi} from '../api/user.api';

export const USER_QUERY_KEY = 'user_register';

interface AxiosError extends Error {
  response?: {
    status: number;
    data: any;
  };
}

export const useCreateUser = () => {
  return useMutation<User, AxiosError, User>(
    (userData: User) => UserApi.registerUser(userData),
    {
      onError: error => {
        if (error.response && error.response.status === 400) {
          console.error(error.response.data.email);
        } else {
          console.error(error);
        }
      },
    },
  );
};
