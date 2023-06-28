import {useQuery} from '@tanstack/react-query';
import {LanguageApi} from '../api/language.api';

export const LANGUAGES_QUERY_KEY = 'languages_search';

export const useSearchLanguages = (query: string) => {
  return useQuery(
    [LANGUAGES_QUERY_KEY, query],
    () => LanguageApi.searchLanguages(query),
    {enabled: !!query},
  );
};
