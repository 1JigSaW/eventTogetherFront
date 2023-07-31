import {API} from './API';

export class CountryApi {
  static async getUniqueCountries() {
    try {
      const {data} = await API.get(`/api/unique-countries/`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
