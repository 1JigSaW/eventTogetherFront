import {useMutation} from '@tanstack/react-query';
import {LoginData, Password, User, UserApi} from '../api/user.api';

export const USER_QUERY_KEY = 'user_register';
export const USER_LOGIN_QUERY_KEY = 'user_login';

interface AxiosError extends Error {
  response?: {
    message?: string;
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

export const useLoginUser = () => {
  return useMutation<any, AxiosError, LoginData>(
    (loginData: LoginData) => UserApi.loginUser(loginData),
    {
      onError: error => {
        if (error.response && error.response.status === 401) {
          console.error(error.response.data.message);
        } else {
          console.error(error);
        }
      },
    },
  );
};

export const useChangePassword = () => {
  return useMutation<any, AxiosError, Password>(
    (pass: Password) => UserApi.changePassword(pass),
    {
      onError: error => {
        console.error(error);
      },
      onSuccess: data => {
        console.log(data);
      },
    },
  );
};
