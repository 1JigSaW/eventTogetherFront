import {useQuery} from '@tanstack/react-query';
import {MatchUserApi, MatchUserData} from '../api/match.api';

export const MATCH_USER_QUERY_KEY = 'match_user';

export const useMatchUsers = (
  user_id: number | null,
  event_id: number
) => {
  return useQuery<MatchUserData[]>(
    [MATCH_USER_QUERY_KEY, user_id, event_id],
    () => MatchUserApi.getMatchedUsers(user_id, event_id),
  );
};
