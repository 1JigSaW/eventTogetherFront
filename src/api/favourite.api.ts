import {API} from './API';

export interface UserFavourite {
  user: number | null;
  favourite_event: number;
}

export class UserFavouriteApi {
  static async addUserFavourite(
    favouriteData: UserFavourite,
  ): Promise<UserFavourite> {
    try {
      const {data} = await API.post('/api/favourites/add/', favouriteData);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async removeUserFavourite(
    favouriteData: UserFavourite,
  ): Promise<void> {
    try {
      await API.delete('/api/favourites/remove/', {data: favouriteData});
    } catch (error) {
      throw error;
    }
  }

  static async getUserFavourites(
    userId: number | null,
  ): Promise<UserFavourite[]> {
    try {
      const {data} = await API.get(`/api/favourites/${userId}/`);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
