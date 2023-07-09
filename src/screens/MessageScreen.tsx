import React, {useCallback, useContext, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {useUserChats} from '../queries/chat';
import {UserContext} from '../../App';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BACKGROUND_MAIN, BLACK_MAIN, BLUE_MAIN, WHITE_MAIN} from '../../colors';
import { Black, Bold, Regular, SemiBold } from "../../fonts";
import ProfileIcon from '../components/icons/ProfileIcon';

type Props = StackScreenProps<HomeStackParamList, 'MessageScreen'>;

function MessageScreen({navigation}: Props) {
  const {userProfile} = useContext(UserContext);
  const {data: messages, isLoading, error, refetch} = useUserChats(userProfile);

  const onScreenFocus = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', onScreenFocus);

    return unsubscribe;
  }, [navigation, onScreenFocus]);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.insideBlock}>
        {messages.map(message => (
          <Pressable
            style={styles.block}
            key={message.id}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                chat: message.chat.id,
              })
            }>
            <Text style={[styles.textEvent, {fontFamily: Black}]}>{message.chat.event.title}</Text>
            {message.chat.user1.id !== userProfile ? (
              <Text style={styles.textEvent}>
                To: {message.chat.user1.first_name}{' '}
                {message.chat.user1.last_name}
              </Text>
            ) : (
              <Text style={styles.textEvent}>
                To: {message.chat.user2.first_name}{' '}
                {message.chat.user2.last_name}
              </Text>
            )}
            <View style={styles.row}>
              <ProfileIcon size={100} />
              <View style={styles.messageBlock}>
                <Text style={styles.textName}>
                  {message.sender.first_name} {message.sender.last_name}
                </Text>
                <Text style={styles.textMessage}>{message.content}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_MAIN,
  },
  insideBlock: {
    marginHorizontal: 8,
  },
  block: {
    borderRadius: 15,
    backgroundColor: WHITE_MAIN,
    borderWidth: 1,
    marginTop: 8,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageBlock: {
    backgroundColor: BLUE_MAIN,
    width: '85%',
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  textName: {
    fontSize: 15,
    fontFamily: Bold,
    color: BLACK_MAIN,
  },
  textMessage: {
    fontFamily: Regular,
    fontSize: 15,
    color: BLACK_MAIN,
  },
  textEvent: {
    fontFamily: SemiBold,
    fontSize: 15,
    color: BLACK_MAIN,
  },
});

export default MessageScreen;
