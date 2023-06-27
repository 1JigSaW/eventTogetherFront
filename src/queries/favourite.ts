import {useMutation, useQuery} from '@tanstack/react-query';
import {UserFavourite, UserFavouriteApi} from '../api/favourite.api';

export const ADD_USER_FAVOURITE_QUERY_KEY = 'add_user_favourite';
export const GET_USER_FAVOURITES_QUERY_KEY = 'get_user_favourites';

export const useAddUserFavourite = () => {
  return useMutation<UserFavourite, Error, UserFavourite>(
    (favouriteData: UserFavourite) =>
      UserFavouriteApi.addUserFavourite(favouriteData),
    {
      onError: (error: any) => {
        console.error(error);
      },
    },
  );
};

export const useGetUserFavourites = (userId: number | null) => {
  return useQuery<UserFavourite[], Error>(
    [GET_USER_FAVOURITES_QUERY_KEY, userId],
    () => UserFavouriteApi.getUserFavourites(userId),
    {
      onError: (error: any) => {
        console.error(error);
      },
    },
  );
};

export const useRemoveUserFavourite = () => {
  return useMutation<void, Error, UserFavourite>(
    (favouriteData: UserFavourite) =>
      UserFavouriteApi.removeUserFavourite(favouriteData),
    {
      onError: (error: any) => {
        console.error(error);
      },
    },
  );
};

