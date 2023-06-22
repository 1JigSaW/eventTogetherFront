import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import React from 'react';
import { Animated, StyleSheet } from "react-native";
import View = Animated.View;
import ProfileIcon from '../components/icons/ProfileIcon';
import MessagesIcon from '../components/icons/MessagesIcon';
import FavouritesIcon from '../components/icons/FavouritesIcon';
import { BACKGROUND_MAIN } from "../../colors";

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

export type HomeStackParamList = {
  SignUpScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
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
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: BACKGROUND_MAIN,
          },
          headerLeft: () => (
            <ProfileIcon size={100} style={styles.headerLeft} />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <MessagesIcon size={100} style={styles.headerRightOne} />
              <FavouritesIcon size={100} />
            </View>
          ),
        }}
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
