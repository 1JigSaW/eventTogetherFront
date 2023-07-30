import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AuthStackNavigator = createStackNavigator<AuthStackParamList>();

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

function AuthStack() {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <AuthStackNavigator.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </AuthStackNavigator.Navigator>
  );
}

export default AuthStack;
