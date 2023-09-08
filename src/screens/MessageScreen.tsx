import React, {useCallback, useContext, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {useUserChats} from '../queries/chat';
import {UserContext} from '../../App';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLACK, BLUE, GRAY_1, GRAY_2, WHITE} from '../../colors';
import {Black, Bold, Regular, SemiBold} from '../../fonts';
import ProfileIcon from '../components/icons/ProfileIcon';
import PeopleOneIcon from '../components/icons/PeopleOneIcon';

type Props = StackScreenProps<HomeStackParamList, 'MessageScreen'>;

function MessageScreen({navigation}: Props) {
  const {userProfile} = useContext(UserContext);
  const {data: messages, isLoading, error, refetch} = useUserChats(userProfile);
  console.log(messages);

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
    <ScrollView style={styles.container}>
      <View style={styles.insideBlock}>
        {messages.length > 0 ? (
          messages.map(message => (
            <Pressable
              style={styles.block}
              key={message.id}
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  chat: message.chat.id,
                })
              }>
              <Text style={[styles.textEvent, {fontFamily: Black}]}>
                {message.chat.event.title}
              </Text>
              <Text style={[styles.textEvent, {fontFamily: Black}]}>
                {new Date(message.chat.event.date).toLocaleDateString()}
              </Text>
              {/*{message.chat.user1.id !== userProfile ? (*/}
              {/*  <Text style={styles.textEvent}>*/}
              {/*    To: {message.chat.user1.first_name}{' '}*/}
              {/*    {message.chat.user1.last_name}*/}
              {/*  </Text>*/}
              {/*) : (*/}
              {/*  <Text style={styles.textEvent}>*/}
              {/*    To: {message.chat.user2.first_name}{' '}*/}
              {/*    {message.chat.user2.last_name}*/}
              {/*  </Text>*/}
              {/*)}*/}
              <View style={styles.row}>
                {message.chat.user1.id === userProfile ? (
                  message.chat.user2.image ? (
                    <Image
                      source={{
                        uri: message.chat.user2.image?.replace('http://', 'https://').replace(
                          'image/upload/',
                          '',
                        ),
                      }}
                      style={{width: 40, height: 40, borderRadius: 125}}
                    />
                  ) : (
                    <View style={styles.iconBackground}>
                      <PeopleOneIcon size={20} />
                    </View>
                  )
                ) : message.chat.user1.image ? (
                  <Image
                    source={{
                      uri: message.chat.user1.image?.replace('http://', 'https://').replace(
                        'image/upload/',
                        '',
                      ),
                    }}
                    style={{width: 40, height: 40, borderRadius: 125}}
                  />
                ) : (
                  <View style={styles.iconBackground}>
                    <PeopleOneIcon size={20} />
                  </View>
                )}
                <View style={styles.messageBlock}>
                  <Text style={styles.textName}>
                    {message.sender.first_name} {message.sender.last_name}
                  </Text>
                  <Text style={styles.textMessage}>{message.content}</Text>
                </View>
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={styles.textMessage}>There are no dialogues yet</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  insideBlock: {
    marginHorizontal: 8,
  },
  block: {
    borderRadius: 15,
    backgroundColor: BLACK,
    marginTop: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: GRAY_1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  messageBlock: {
    backgroundColor: GRAY_2,
    borderWidth: 1,
    borderColor: GRAY_1,
    width: '85%',
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  textName: {
    fontSize: 15,
    fontFamily: Bold,
    color: WHITE,
  },
  textMessage: {
    fontFamily: Regular,
    fontSize: 15,
    color: WHITE,
  },
  textEvent: {
    fontFamily: SemiBold,
    fontSize: 15,
    color: WHITE,
  },
  iconBackground: {
    backgroundColor: BLUE,
    borderRadius: 30,
    padding: 11,
  },
});

export default MessageScreen;
