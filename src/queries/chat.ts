import {useMutation, useQuery} from '@tanstack/react-query';
import {ChatApi, MessageData} from '../api/chat.api';
import {AxiosError} from 'axios';

export const MESSAGE_SEND_QUERY_KEY = 'message_send';
export const EVENT_MESSAGES_QUERY_KEY = 'event_messages';

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

export const useEventMessages = (eventId: number | null) => {
  return useQuery<MessageData[], AxiosError>(
    [EVENT_MESSAGES_QUERY_KEY, eventId],
    () => ChatApi.getEventMessages(eventId),
    {
      retry: 0,
    },
  );
};

export const USER_MESSAGES_QUERY_KEY = 'user_messages';

export const useUserMessages = (userId: number | null) => {
  return useQuery<MessageData[], AxiosError>(
    [USER_MESSAGES_QUERY_KEY, userId],
    () => ChatApi.getUserMessages(userId),
    {
      retry: 0,
    },
  );
};
