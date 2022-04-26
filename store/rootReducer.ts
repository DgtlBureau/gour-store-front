import { combineReducers } from '@reduxjs/toolkit';
import { userApi } from './api/userApi';
import authSlice from './slices/authSlice';
import { productApi } from './api/productApi';
import { promotionApi } from './api/promotionApi';
import orderSlice from './slices/orderSlice';
import { productGradeApi } from './api/productGradeApi';

export const rootReducer = combineReducers({
  auth: authSlice,
  order: orderSlice,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [promotionApi.reducerPath]: promotionApi.reducer,
  [productGradeApi.reducerPath]: productGradeApi.reducer,
});
