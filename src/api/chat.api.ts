import {API} from './API';

export interface Chat {
  id: number;
  event: Event;
  user1: number;
  user2: number;
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

  static async getChatMessages(chatId: number | null): Promise<MessageData[]> {
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

  static async createChat(recipientUserId: number): Promise<any> {
    try {
      const {data} = await API.post('/api/chat/create/', {
        recipientUserId: recipientUserId,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
