import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import React, {useState} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import View = Animated.View;
import MessagesIcon from '../components/icons/MessagesIcon';
import FavouritesIcon from '../components/icons/FavouritesIcon';
import {BACKGROUND_MAIN, BLACK, BLUE} from '../../colors';
import FavouritesScreen from '../screens/FavouritesScreen';
import WaitingScreen from '../screens/WaitingScreen';
import EventScreen from '../screens/EventScreen';
import FindSwipeScreen from '../screens/FindSwipeScreen';
import LeftIcon from '../components/icons/LeftIcon';

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
      />
      <HomeStackNavigator.Screen
        name={'FavouritesScreen'}
        component={FavouritesScreen}
        options={({navigation}) => ({
          headerTitle: 'Favourites',
          headerStyle: {
            backgroundColor: BLACK,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            textAlign: 'center',
            color: BLUE,
          },
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                marginLeft: 15,
                marginTop: 2,
                borderRadius: 35,
                padding: 5,
                backgroundColor: BLUE,
              }}>
              <LeftIcon size={15} color={BLACK} />
            </Pressable>
          ),
        })}
      />
      <HomeStackNavigator.Screen
        name={'WaitingScreen'}
        component={WaitingScreen}
        options={({navigation}) => ({
          headerTitle: 'Waiting list',
          headerStyle: {
            backgroundColor: BLACK,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            textAlign: 'center',
            color: BLUE,
          },
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                marginLeft: 15,
                marginTop: 2,
                borderRadius: 35,
                padding: 5,
                backgroundColor: BLUE,
              }}>
              <LeftIcon size={15} color={BLACK} />
            </Pressable>
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
