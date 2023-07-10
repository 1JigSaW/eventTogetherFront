import {API} from './API';

export interface MatchUserData {
  user_id: number | null;
  event_id: number;
  position: number;
}

export class MatchUserApi {
  static async getMatchedUser(
    user_id: number | null,
    event_id: number,
    position: number
  ): Promise<MatchUserData> {
    try {
      const {data} = await API.get(
        `/api/match-users/${user_id}/${event_id}/${position}/`,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
