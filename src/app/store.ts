import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import simulationSlice from '../features/simulation/simulationSlice';
import { localStorageMiddleware } from './middlewares/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    simulation: simulationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
