import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildRoute, Endpoints } from '../constants/Endpoints';
import { Character, Info } from './types';

export const characterApi = createApi({
  reducerPath: 'characterSlice',
  baseQuery: fetchBaseQuery({ baseUrl: Endpoints.baseUrl }),
  endpoints: builder => ({
    getCharacters: builder.query<{ info: Info; results: Character[] }, string>({
      query: (page = '1') => buildRoute(Endpoints.characters, { page }),
    }),
    getCharacter: builder.query<Character, string>({
      query: id => buildRoute(Endpoints.character, { id }),
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = characterApi;
