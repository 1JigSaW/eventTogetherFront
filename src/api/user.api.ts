import {API} from './API';

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class UserApi {
  static async registerUser(userData: User): Promise<User> {
    try {
      const {data} = await API.post('/api/register/', userData);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(loginData: LoginData): Promise<any> {
    try {
      const {data} = await API.post('/api/auth/', loginData);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
