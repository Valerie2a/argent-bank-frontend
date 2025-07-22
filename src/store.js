import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import transactionReducer from './features/transactions/transactionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
  },
});
