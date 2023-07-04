import React, {useState, useEffect, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import {UserContext} from '../../App';
import {
  MESSAGE_SEND_QUERY_KEY,
  useEventMessages,
  useSendMessage,
} from '../queries/chat';
import {useQueryClient} from '@tanstack/react-query';
import { ChatScreenProps, HomeStackParamList } from "../navigation/HomeStackNavigator";
import {Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<HomeStackParamList, 'ChatScreen'>;

const ChatScreen = ({route}: Props) => {
  const {event, receiver} = route.params;
  const {userProfile} = useContext(UserContext);
  const socket = SocketIOClient('http://localhost:3000'); // Replace with your server address
  const {data: messages, isLoading, isError} = useEventMessages(event);
  const sendMessageMutation = useSendMessage();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('message', message => {
      queryClient.invalidateQueries([MESSAGE_SEND_QUERY_KEY, event]);
    });
  }, [event, queryClient, socket]);

  const onSend = (messages = []) => {
    sendMessageMutation.mutate({
      id: 0,
      event: event,
      sender: userProfile,
      receiver: receiver,
      content: messages[0].text,
      timestamp: new Date().getTime(),
    });
  };

  const formattedMessages = messages?.map(
    (m: {
      id?: any;
      content: any;
      timestamp: string | number | Date;
      sender: any;
    }) => ({
      _id: m.id,
      text: m.content,
      createdAt: new Date(m.timestamp),
      user: {
        _id: m.sender,
        // other user properties like name, avatar
      },
    }),
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error loading messages</Text>;
  }

  return (
    <GiftedChat
      messages={formattedMessages}
      onSend={messages => onSend(messages)}
      user={{_id: userProfile}}
    />
  );
};

export default ChatScreen;
