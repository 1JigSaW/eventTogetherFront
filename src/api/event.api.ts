import {API} from './API';

export interface Attendee {
  id: number;
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
  attendees: Attendee[];
  awaiting_invite: any[];
}

export interface EventArray {
  count: number;
  next: string;
  previous: string;
  results: Event[];
}

export class EventApi {
  static async getEvents(page: number = 1): Promise<EventArray> {
    try {
      const {data} = await API.get(`/api/events/?page=${page}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
