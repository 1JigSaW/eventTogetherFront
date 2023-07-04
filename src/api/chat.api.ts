import {API} from './API';

export interface MessageData {
  id?: number;
  sender: number | null;
  receiver: number;
  content: string;
  event: number;
  timestamp: string;
}

export class ChatApi {
  static async sendMessage(messageData: MessageData): Promise<MessageData> {
    try {
      const {data} = await API.post('/api/message/create/', messageData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getEventMessages(
    eventId: number | null,
  ): Promise<MessageData[]> {
    try {
      const {data} = await API.get(`/api/message/event/${eventId}/`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserMessages(userId: number | null): Promise<MessageData[]> {
    try {
      const {data} = await API.get(`/api/messages/${userId}/`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
