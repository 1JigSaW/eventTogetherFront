import {useMutation, useQuery} from '@tanstack/react-query';
import {ChatApi, MessageData} from '../api/chat.api';
import {AxiosError} from 'axios';

export const MESSAGE_SEND_QUERY_KEY = 'message_send';
export const EVENT_MESSAGES_QUERY_KEY = 'event_messages';
export const CHAT_MESSAGES_QUERY_KEY = 'chat_messages';

export const useSendMessage = () => {
  return useMutation<MessageData, AxiosError, MessageData>(
    (messageData: MessageData) => ChatApi.sendMessage(messageData),
    {
      onError: error => {
        if (error.response && error.response.status === 400) {
          console.error(error.response.data);
        } else {
          console.error(error);
        }
      },
    },
  );
};

export const useChatMessages = (chatId: number | null) => {
  return useQuery<MessageData[], AxiosError>(
    [CHAT_MESSAGES_QUERY_KEY, chatId],
    () => ChatApi.getChatMessages(chatId),
    {
      retry: 0,
    },
  );
};


export const useUserChats = (userId: number | null) => {
  return useQuery<MessageData[], AxiosError>(
    [EVENT_MESSAGES_QUERY_KEY, userId],
    () => ChatApi.getUserChats(userId),
    {
      retry: 0,
    },
  );
};


export const useCreateChat = () => {
  return useMutation<any, AxiosError, number>(
    (recipientUserId: number) => ChatApi.createChat(recipientUserId),
    {
      onError: error => {
        console.error(error);
      },
    },
  );
};
