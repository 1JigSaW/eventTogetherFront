import {useQuery} from '@tanstack/react-query';
import {CountryApi} from '../api/country.api';

export const UNIQUE_COUNTRIES_QUERY_KEY = 'unique_countries';

export const useUniqueCountries = () => {
  return useQuery([UNIQUE_COUNTRIES_QUERY_KEY], () =>
    CountryApi.getUniqueCountries(),
  );
};
