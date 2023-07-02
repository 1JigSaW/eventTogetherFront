import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {EventApi, EventArray} from '../api/event.api';
import { API } from "../api/API";

export const EVENT_QUERY_KEY = 'events';
export const EVENT_ADD_USER_QUERY_KEY = 'event_add_user';

interface AxiosError extends Error {
  response?: {
    message?: string;
    status: number;
    data: any;
  };
}

type RemoveUserFromEventInput = {
  eventId: number;
  userId: number | null;
};

export const useEvents = (page: number) => {
  return useInfiniteQuery<EventArray, AxiosError>(
    [EVENT_QUERY_KEY],
    ({pageParam = 1}) => EventApi.getEvents(pageParam),
    {
      getNextPageParam: lastPage => {
        const urlComponents = lastPage.next ? lastPage.next.split('=') : null;
        const nextPageNumber = urlComponents
          ? Number(urlComponents[1])
          : undefined;
        return nextPageNumber;
      },
      onError: error => {
        if (error.response && error.response.status >= 400) {
          console.error(error.response.data.message);
        } else {
          console.error(error);
        }
      },
    },
  );
};



export function useAddUserToEvent() {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: {eventId: number; userId: number | null}) =>
      EventApi.addUserToEvent(payload.eventId, payload.userId),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['event', variables.eventId]);
      },
    },
  );
}

export function useRemoveUserFromEvent() {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: {eventId: number; userId: number | null}) =>
      EventApi.removeUserFromEvent(payload.eventId, payload.userId),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['event', variables.eventId]);
      },
    },
  );
}
