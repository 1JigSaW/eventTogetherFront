import {API} from './API';

export interface User {
  username: string;
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
}
