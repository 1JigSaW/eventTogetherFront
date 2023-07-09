import {API} from './API';
import {UserProfileData} from './userprofile';

export interface Chat {
  sender: any;
  id: number;
  event: Event;
  user1: UserProfileData;
  user2: UserProfileData;
}

export interface Sender {
  id: number;
  age: number;
  description: string;
  first_name: string;
  interests: number[];
  language: number[];
  last_name: string;
  user: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  city: string;
  place: string;
  type: string;
  price_low: number;
  price_high: number;
  attendees: number[];
  awaiting_invite: number[];
}

export interface MessageData {
  recipient: any;
  id?: number;
  chat: Chat;
  content: string;
  sender: Sender;
  timestamp: string;
  event: Event;
}

export class ChatApi {
  static async sendMessage(messageData: any): Promise<MessageData> {
    try {
      const {data} = await API.post('/api/message/create/', messageData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getChatMessages(chatId: number): Promise<MessageData[]> {
    try {
      const {data} = await API.get(`/api/chat/${chatId}/messages/`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserChats(userId: number | null): Promise<MessageData[]> {
    try {
      const {data} = await API.get(`/api/chat/${userId}/`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async createChat(chatData: {
    sender: number;
    recipient: number;
    event: number;
  }): Promise<any> {
    try {
      const {data} = await API.post('/api/chat/create/', {
        senderUserId: chatData.sender,
        recipientUserId: chatData.recipient,
        eventId: chatData.event,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getChatId(
    sender: number,
    recipient: number,
    event: number,
  ): Promise<number> {
    try {
      const {data} = await API.get('/api/get_chat_id/', {
        params: {
          senderUserId: sender,
          recipientUserId: recipient,
          eventId: event,
        },
      });
      return data.chat_id;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw error;
      }
      throw error;
    }
  }
}
