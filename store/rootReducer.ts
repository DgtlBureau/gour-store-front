import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import orderSlice from "./slices/orderSlice";
import { userApi } from './api/userApi';
import { productApi } from "./api/productApi";
import { promotionApi } from "./api/promotionApi";
import { cityApi } from "./api/cityApi";
import { roleApi } from './api/roleApi';
import { authApi } from "./api/authApi";

export const rootReducer = combineReducers({
  auth: authSlice,
  order: orderSlice,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [promotionApi.reducerPath]: promotionApi.reducer,
  [cityApi.reducerPath]: cityApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
