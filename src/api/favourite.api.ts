import {API} from './API';

export interface UserFavourite {
  user: number;
  favourite_event: number;
}

export class UserFavouriteApi {
  static async addUserFavourite(
    favouriteData: UserFavourite,
  ): Promise<UserFavourite> {
    try {
      const {data} = await API.post('/favourites/add/', favouriteData);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserFavourites(): Promise<UserFavourite[]> {
    try {
      const {data} = await API.get('/favourites/');
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
