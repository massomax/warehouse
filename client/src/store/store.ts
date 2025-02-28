import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import warehouseReducer from './warehouseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouses: warehouseReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;