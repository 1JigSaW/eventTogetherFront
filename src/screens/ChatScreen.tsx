import React, {useEffect, useContext, useState} from 'react';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import {queryClient, UserContext} from '../../App';
import {
  CHAT_MESSAGES_QUERY_KEY,
  useChatMessages,
  useCreateChat, useGetChatId,
  useSendMessage
} from "../queries/chat";
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MessageData} from '../api/chat.api';

type Props = StackScreenProps<HomeStackParamList, 'ChatScreen'>;

type PostMessage = {
  _id?: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    // other user properties like name, avatar
  };
  sent: boolean;
  received: boolean;
};

const ChatScreen = ({route}: Props) => {
  const {chat, user: tempUser, event} = route.params;
  const {userProfile} = useContext(UserContext);
  const socket = SocketIOClient('http://localhost:3000'); // Replace with your server address
  const sendMessageMutation = useSendMessage();
  const createChatMutation = useCreateChat();

  const [messages, setMessages] = useState<PostMessage[]>([]);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [chatId, setChatId] = useState<any>(chat); // Initialize chatId with initialChat

  const {
    data: chatIdData,
    isLoading: chatIdLoading,
    isError: chatIdError,
  } = useGetChatId(userProfile, tempUser, event);

  useEffect(() => {
    if (chatIdData) {
      setChatId(chatIdData);
    }
  }, [chatIdData]);

  const {data: messagesData, isLoading, isError} = useChatMessages(chatId);

  // useEffect(() => {
  //   if (!chatId) {
  //     createChatMutation.mutate(
  //       {sender: userProfile, recipient: tempUser, event: event},
  //       {
  //         onSuccess: data => {
  //           if (Array.isArray(data)) {
  //             // If server returned messages, it means the chat already exists
  //             setChatId(data[0].chat); // Update chatId with the existing chat's id
  //           } else {
  //             // If server returned a new chat
  //             setChatId(data.id); // Update chatId with the new chat's id
  //           }
  //         },
  //       },
  //     );
  //   }
  // }, [chatId, createChatMutation, event, tempUser, userProfile]);

  useEffect(() => {
    if (messagesData) {
      const formattedMessages = messagesData
        .map((m: MessageData) => ({
          _id: m.id,
          text: m.content,
          createdAt: new Date(m.timestamp),
          user: {
            _id: m.sender.id,
            // other user properties like name, avatar
          },
          sent: m.sender.id === userProfile,
          received: m.sender.id !== userProfile,
        }))
        .reverse();
      setMessages(formattedMessages);
    }
  }, [messagesData, setMessages, userProfile]);

  const onSend = (messages: {text: string}[] = []) => {
    if (isFirstMessage && !chat) {
      createChatMutation.mutate(
        {sender: userProfile, recipient: tempUser, event: event},
        {
          onSuccess: data => {
            const chatId = data.id; // Получаем chat.id из результата

            const messageData = {
              chat: chatId,
              sender: userProfile,
              content: messages[0].text,
              timestamp: new Date().toISOString(),
            };

            sendAndAppendMessage(messageData);
            setIsFirstMessage(false);
          },
        },
      );
    } else {
      const messageData = {
        chat: route.params.chat,
        sender: userProfile,
        content: messages[0].text,
        timestamp: new Date().toISOString(),
      };

      sendAndAppendMessage(messageData);
    }
  };

  // This is a helper function to send and append messages
  const sendAndAppendMessage = messageData => {
    const newMessage: any = {
      _id: Math.random().toString(),
      text: messageData.content,
      createdAt: new Date(messageData.timestamp),
      user: {
        _id: messageData.sender,
        // other user properties like name, avatar
      },
      sent: true,
      received: false,
    };

    setMessages((previousMessages): any =>
      GiftedChat.append(previousMessages, newMessage),
    );

    sendMessageMutation.mutate(messageData, {
      onSuccess: data => {
        setMessages(previousMessages =>
          previousMessages.map(message =>
            message._id === newMessage._id
              ? {...message, _id: data.id as number}
              : message,
          ),
        );
      },
    });
  };

  useEffect(() => {
    socket.on('message', () => {
      queryClient.invalidateQueries([CHAT_MESSAGES_QUERY_KEY, chat]);
    });
  }, [chat, socket]);

  return (
    <GiftedChat
      messages={
        messages.map((message: PostMessage) => ({
          _id: message?._id?.toString(),
          text: message.text,
          createdAt: message.createdAt,
          user: message.user,
          sent: message.sent,
          received: message.received,
        })) as IMessage[]
      }
      onSend={messages => onSend(messages)}
      user={{_id: userProfile}}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#f0f0f0', // background color for received messages
            },
            right: {
              backgroundColor: '#0099ff', // background color for sent messages
            },
          }}
        />
      )}
    />
  );
};

export default ChatScreen;
