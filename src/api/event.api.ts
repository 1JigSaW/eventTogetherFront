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

  static async addUserToEvent(
    eventId: number,
    userId: number | null,
  ): Promise<void> {
    try {
      await API.post(`/api/events/${eventId}/add_user/`, {user_id: userId});
    } catch (error) {
      throw error;
    }
  }

  static async removeUserFromEvent(
    eventId: number,
    userId: number | null,
  ): Promise<void> {
    try {
      await API.delete(`/api/remove-user-from-event/${eventId}/${userId}/`);
    } catch (error) {
      throw error;
    }
  }
}
