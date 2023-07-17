import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import {BLACK, GRAY_1, WHITE} from '../../colors';
import HomeIcon from '../components/icons/HomeIcon';

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
        headerShown: false,
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: GRAY_1,
        tabBarStyle: {
          backgroundColor: BLACK,
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
          tabBarIcon: () => <HomeIcon size={100} color={WHITE} />,
        }}
      />
      <BottomTab.Screen
        name="ChatTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => <HomeIcon size={100} color={WHITE} />,
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => <HomeIcon size={100} color={WHITE} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
export default BottomTabNavigator;
