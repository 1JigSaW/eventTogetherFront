import {InterestsApi} from '../api/interest.api';
import {useQuery} from '@tanstack/react-query';

export const INTERESTS_QUERY_KEY = 'interests_search';

export const useSearchInterests = (query: string) => {
  return useQuery(
    [INTERESTS_QUERY_KEY, query],
    () => InterestsApi.searchInterests(query),
    {enabled: !!query},
  );
};
