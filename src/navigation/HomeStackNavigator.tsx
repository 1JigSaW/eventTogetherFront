import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';

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
      <HomeStackNavigator.Screen name={'HomeScreen'} component={HomeScreen} />
    </HomeStackNavigator.Navigator>
  );
}

export default HomeStack;
