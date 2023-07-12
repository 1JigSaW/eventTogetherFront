import {API} from './API';

export interface MatchUserData {
  id: number;
  first_name: string;
  // and so on for all user properties
}

export class MatchUserApi {
  static async getMatchedUsers(
    user_id: number | null,
    event_id: number,
  ): Promise<MatchUserData[]> {
    try {
      const {data} = await API.get(`/api/match-users/${user_id}/${event_id}/`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
