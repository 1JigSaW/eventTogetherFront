import {API} from './API';

export class LanguageApi {
  static async searchLanguages(query: string) {
    try {
      const {data} = await API.get(`/api/languages/search/?query=${query}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
