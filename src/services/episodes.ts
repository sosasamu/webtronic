import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildRoute, Endpoints } from '../constants/Endpoints';
import { Episode } from './types';

export const episodesApi = createApi({
  reducerPath: 'episodesSlice',
  baseQuery: fetchBaseQuery({ baseUrl: Endpoints.baseUrl }),
  endpoints: builder => ({
    getEpisode: builder.query<Episode, string>({
      query: id => buildRoute(Endpoints.episode, { id }),
    }),
  }),
});

export const { useGetEpisodeQuery } = episodesApi;
