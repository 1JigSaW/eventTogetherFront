import {useInfiniteQuery} from '@tanstack/react-query';
import {EventApi, EventArray} from '../api/event.api';

export const EVENT_QUERY_KEY = 'events';

interface AxiosError extends Error {
  response?: {
    message?: string;
    status: number;
    data: any;
  };
}

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
