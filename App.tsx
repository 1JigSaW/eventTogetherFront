import {NavigationContainer} from '@react-navigation/native';
import React, {createContext, useEffect, useState} from 'react';
import HomeStack from './src/navigation/HomeStackNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from './constants';
import {ActivityIndicator} from 'react-native';
import {UserProfileApi} from './src/api/userprofile';

export const queryClient = new QueryClient();

type UserContextProps = {
  user: number | null;
  setUser: (value: number | null) => void;
  userProfileExist: boolean;
  setUserProfileExist: (value: boolean) => void;
  userProfile: number | null;
  setUserProfile: (value: number | null) => void;
};

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser(): void {},
  userProfileExist: false,
  setUserProfileExist(): void {},
  userProfile: null,
  setUserProfile(): void {},
});

const App = () => {
  const [user, setUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfileExist, setUserProfileExist] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<number | null>(null);

  useEffect(() => {
    const getUserFromAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(USER);
        if (value !== null) {
          setUser(Number(value));
        }
        setLoading(false); // устанавливаем состояние загрузки в false, когда получены данные
      } catch (error) {
        console.error(error);
        setLoading(false); // устанавливаем состояние загрузки в false, даже если произошла ошибка
      }
    };

    getUserFromAsyncStorage();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user !== null) {
        try {
          const userProfile = await UserProfileApi.getUserProfileDetail(user);
          setUserProfileExist(true);
          if (userProfile.id) {
            setUserProfile(userProfile?.id);
          }
        } catch (error) {
          console.error(error);
          setUserProfileExist(false);
        }
        setLoading(false); // устанавливаем состояние загрузки в false, когда получены данные
      }
    };

    fetchUserProfile();
  }, [user]);


  if (loading) {
    return <ActivityIndicator size="large" />; // отображаем спиннер пока идет загрузка
  }
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          user,
          setUser,
          userProfileExist,
          setUserProfileExist,
          userProfile,
          setUserProfile,
        }}>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
