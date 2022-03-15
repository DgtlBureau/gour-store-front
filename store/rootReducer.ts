import { combineReducers } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import authSlice from './slices/authSlice';
import {productApi} from "./api/productApi";

export const rootReducer = combineReducers({
  auth: authSlice,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});
