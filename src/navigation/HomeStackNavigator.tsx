import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import React from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import View = Animated.View;
import ProfileIcon from '../components/icons/ProfileIcon';
import MessagesIcon from '../components/icons/MessagesIcon';
import FavouritesIcon from '../components/icons/FavouritesIcon';
import {BACKGROUND_MAIN} from '../../colors';
import FavouritesScreen from '../screens/FavouritesScreen';
import AccountScreen from '../screens/AccountScreen';
import WaitingScreen from '../screens/WaitingScreen';
import MessageScreen from '../screens/MessageScreen';
import ChatScreen from '../screens/ChatScreen';
import EventScreen from '../screens/EventScreen';
import FindSwipeScreen from "../screens/FindSwipeScreen";

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
  };
};

function HomeStack() {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name={'SignUpScreen'}
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name={'SignInScreen'}
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: BACKGROUND_MAIN,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate('AccountScreen')}>
              <ProfileIcon size={100} style={styles.headerLeft} />
            </Pressable>
          ),
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
        name={'AccountScreen'}
        component={AccountScreen}
        options={({navigation}) => ({
          headerTitle: 'Account',
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
        name={'MessageScreen'}
        component={MessageScreen}
        options={({navigation}) => ({
          headerTitle: 'Messages',
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
              <Pressable
                onPress={() => navigation.navigate('FavouritesScreen')}>
                <FavouritesIcon size={100} />
              </Pressable>
            </View>
          ),
        })}
      />
      <HomeStackNavigator.Screen
        name={'ChatScreen'}
        component={ChatScreen}
        options={({navigation}) => ({
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
        name={'FindSwipeScreen'}
        component={FindSwipeScreen}
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
    marginRight: 8,
  },
  headerRightOne: {
    marginRight: 12,
  },
});

export default HomeStack;
