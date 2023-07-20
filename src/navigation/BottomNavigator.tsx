import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import {BLACK, GRAY_1, WHITE} from '../../colors';
import HomeIcon from '../components/icons/HomeIcon';
import ChatIcon from '../components/icons/ChatIcon';
import ChatStackNavigator from './ChatStackNavigator';
import ProfileIcon from '../components/icons/ProfileIcon';
import AccountStackNavigator from './AccountStackNavigator';

export type BottomNavigatorParamsList = {
  HomeTab: undefined;
  ChatTab: undefined;
  ProfileTab: undefined;
};

const BottomTab = createBottomTabNavigator<BottomNavigatorParamsList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: GRAY_1,
        tabBarStyle: {
          backgroundColor: BLACK,
          paddingBottom: 2,
          height: 54,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <HomeIcon size={30} color={focused ? WHITE : GRAY_1} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ChatTab"
        component={ChatStackNavigator}
        options={{
          title: 'Chat',
          tabBarIcon: ({focused}) => (
            <ChatIcon size={30} color={focused ? WHITE : GRAY_1} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={AccountStackNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <ProfileIcon size={30} color={focused ? WHITE : GRAY_1} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
export default BottomTabNavigator;
