import {createStackNavigator} from '@react-navigation/stack';
import {BACKGROUND_MAIN} from '../../colors';
import {Pressable, StyleSheet, View} from 'react-native';
import MessagesIcon from '../components/icons/MessagesIcon';
import FavouritesIcon from '../components/icons/FavouritesIcon';
import MessageScreen from '../screens/MessageScreen';
import ChatScreen from '../screens/ChatScreen';
import React from 'react';

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
  return (
    <ChatStackNavigator.Navigator>
      <ChatStackNavigator.Screen
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
      <ChatStackNavigator.Screen
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
