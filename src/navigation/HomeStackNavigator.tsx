import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import React, {useContext, useEffect, useState} from 'react';
import {Animated, Image, Pressable, StyleSheet} from 'react-native';
import View = Animated.View;
import ProfileIcon from '../components/icons/ProfileIcon';
import MessagesIcon from '../components/icons/MessagesIcon';
import FavouritesIcon from '../components/icons/FavouritesIcon';
import {BACKGROUND_MAIN, BLACK, BLUE} from '../../colors';
import FavouritesScreen from '../screens/FavouritesScreen';
import AccountScreen from '../screens/AccountScreen';
import WaitingScreen from '../screens/WaitingScreen';
import MessageScreen from '../screens/MessageScreen';
import ChatScreen from '../screens/ChatScreen';
import EventScreen from '../screens/EventScreen';
import FindSwipeScreen from '../screens/FindSwipeScreen';
import {useUserProfileDetail} from '../queries/userprofile';
import {UserContext} from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import LeftIcon from '../components/icons/LeftIcon';
import BookmarkAddIcon from '../components/icons/BookmarkAddIcon';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import UserCheckIcon from '../components/icons/UserCheckIcon';
import UserPlusIcon from '../components/icons/UserPlusIcon';

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

export type ChatScreenProps = {
  event: number; // Replace EventType with the actual type of your event
  receiver?: number; // receiver can be a number or undefined
};

export type HomeStackParamList = {
  SignUpScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  FavouritesScreen: undefined;
  AccountScreen: undefined;
  WaitingScreen: {
    event: number;
  };
  MessageScreen: undefined;
  ChatScreen: {
    chat?: number;
    user?: number | null;
    event?: number;
  };
  EventScreen: {
    event: number;
  };
  FindSwipeScreen: {
    event: number;
    item: any;
  };
};

function HomeStack() {
  const [isFavourite, setIsFavourite] = useState(false);
  const [awaitingInvite, setAwaitingInvite] = useState<boolean>(false);

  return (
    <HomeStackNavigator.Navigator>
      {/*<HomeStackNavigator.Screen*/}
      {/*  name={'SignUpScreen'}*/}
      {/*  component={SignUpScreen}*/}
      {/*  options={{*/}
      {/*    headerShown: false,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<HomeStackNavigator.Screen*/}
      {/*  name={'SignInScreen'}*/}
      {/*  component={SignInScreen}*/}
      {/*  options={{*/}
      {/*    headerShown: false,*/}
      {/*  }}*/}
      {/*/>*/}
      <HomeStackNavigator.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
        // options={({navigation}) => ({
        //   headerTitle: '',
        //   headerStyle: {
        //     backgroundColor: BACKGROUND_MAIN,
        //     borderBottomWidth: 0,
        //     elevation: 0,
        //     shadowOpacity: 0,
        //   },
        //   headerRight: () => (
        //     <View style={styles.headerRight}>
        //       <Pressable onPress={() => navigation.navigate('MessageScreen')}>
        //         <MessagesIcon size={100} style={styles.headerRightOne} />
        //       </Pressable>
        //       <Pressable
        //         onPress={() => navigation.navigate('FavouritesScreen')}>
        //         <FavouritesIcon size={100} />
        //       </Pressable>
        //     </View>
        //   ),
        // })}
      />
      <HomeStackNavigator.Screen
        name={'FavouritesScreen'}
        component={FavouritesScreen}
        options={({navigation}) => ({
          headerTitle: 'Favourites',
          headerStyle: {
            backgroundColor: BACKGROUND_MAIN,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            textAlign: 'center',
          },
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable onPress={() => navigation.navigate('MessageScreen')}>
                <MessagesIcon size={100} style={styles.headerRightOne} />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('FavouritesScreen')}>
                <FavouritesIcon size={100} />
              </Pressable>
            </View>
          ),
        })}
      />
      <HomeStackNavigator.Screen
        name={'WaitingScreen'}
        component={WaitingScreen}
        options={({navigation}) => ({
          headerTitle: 'Waiting list',
          headerStyle: {
            backgroundColor: BACKGROUND_MAIN,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            textAlign: 'center',
          },
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable onPress={() => navigation.navigate('MessageScreen')}>
                <MessagesIcon size={100} style={styles.headerRightOne} />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('FavouritesScreen')}>
                <FavouritesIcon size={100} />
              </Pressable>
            </View>
          ),
        })}
      />
      <HomeStackNavigator.Screen
        name={'EventScreen'}
        component={EventScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            textAlign: 'center',
          },
        })}
      />
      <HomeStackNavigator.Screen
        name={'FindSwipeScreen'}
        component={FindSwipeScreen}
        options={() => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: BACKGROUND_MAIN,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            textAlign: 'center',
          },
        })}
      />
    </HomeStackNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 15,
    marginTop: 5,
    borderRadius: 35,
    padding: 5,
    backgroundColor: BLUE,
  },
  headerRightOne: {
    marginRight: 12,
  },
  iconBackground: {
    backgroundColor: BLUE,
    borderRadius: 15,
    padding: 5,
    marginLeft: 7,
    marginTop: 5,
    marginRight: 6,
  },
  bookmarkIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5,
  },
});

export default HomeStack;
