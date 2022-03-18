import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filtersReducer from '../features/components/filtersSlice';
import pokemonReducer from '../features/components/pokemonSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    pokemon: pokemonReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
