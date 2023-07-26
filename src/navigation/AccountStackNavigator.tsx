import {createStackNavigator} from '@react-navigation/stack';
import MessageScreen from '../screens/MessageScreen';
import { BACKGROUND_MAIN, BLACK, WHITE } from "../../colors";
import {Pressable, StyleSheet, View} from 'react-native';
import FavouritesIcon from '../components/icons/FavouritesIcon';
import ChatScreen from '../screens/ChatScreen';
import MessagesIcon from '../components/icons/MessagesIcon';
import React from 'react';
import AccountScreen from '../screens/AccountScreen';
import LogoutIcon from "../components/icons/LogoutIcon";

const AccountStackNavigator = createStackNavigator<AccountStackParamList>();

export type AccountStackParamList = {
  AccountScreen: undefined;
};

function ChatStack() {
  return (
    <AccountStackNavigator.Navigator>
      <AccountStackNavigator.Screen
        name={'AccountScreen'}
        component={AccountScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerStyle: {
            backgroundColor: BLACK,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            textAlign: 'center',
          },
          headerRight: () => (
            <View style={styles.headerRight}>
              <LogoutIcon size={25} color={WHITE} />
            </View>
          ),
        })}
      />
    </AccountStackNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 12,
  },
  headerRightOne: {
    marginRight: 12,
  },
});

export default ChatStack;
