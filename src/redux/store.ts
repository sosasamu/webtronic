import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { characterApi } from '../services/characters';
import { episodesApi } from '../services/episodes';
import charactersSlice from './slices/charactersSlice';

export const store = configureStore({
  reducer: {
    characters: charactersSlice,
    [characterApi.reducerPath]: characterApi.reducer,
    [episodesApi.reducerPath]: episodesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(characterApi.middleware)
      .concat(episodesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
