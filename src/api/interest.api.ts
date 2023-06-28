import {API} from './API';

export class InterestsApi {
  static async searchInterests(query: string) {
    try {
      const {data} = await API.get(`/api/interests/search/?query=${query}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
