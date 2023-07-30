import {createStackNavigator} from '@react-navigation/stack';
import { BACKGROUND_MAIN, BLACK, BLUE } from "../../colors";
import {Pressable, StyleSheet, View} from 'react-native';
import MessagesIcon from '../components/icons/MessagesIcon';
import FavouritesIcon from '../components/icons/FavouritesIcon';
import MessageScreen from '../screens/MessageScreen';
import ChatScreen from '../screens/ChatScreen';
import React, { useContext } from "react";
import LeftIcon from '../components/icons/LeftIcon';
import { UserContext } from "../../App";

const ChatStackNavigator = createStackNavigator<ChatStackParamList>();

export type ChatStackParamList = {
  MessageScreen: undefined;
  ChatScreen: {
    chat?: number;
    user?: number | null;
    event?: number;
  };
};

function ChatStack() {
  const {userProfileExist} = useContext(UserContext);
  return (
    <ChatStackNavigator.Navigator>
      <ChatStackNavigator.Screen
        name={'MessageScreen'}
        component={MessageScreen}
        options={({navigation}) => ({
          headerTitle: 'Chats',
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
        })}
      />
      <ChatStackNavigator.Screen
        name={'ChatScreen'}
        component={ChatScreen}
        options={({navigation}) => ({
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
              onPress={() => {
                navigation.goBack();
              }}
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
    </ChatStackNavigator.Navigator>
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

export default ChatStack;
