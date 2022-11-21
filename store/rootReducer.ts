import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from './api/authApi';
import { categoryApi } from './api/categoryApi';
import { cityApi } from './api/cityApi';
import { commonApi } from './api/commonApi';
import { currentUserApi } from './api/currentUserApi';
import { favoriteApi } from './api/favoriteApi';
import { imageApi } from './api/imageApi';
import { invoiceApi } from './api/invoiceApi';
import { orderApi } from './api/orderApi';
import { orderProfileApi } from './api/orderProfileApi';
import { pageApi } from './api/pageApi';
import { productApi } from './api/productApi';
import { productGradeApi } from './api/productGradeApi';
import { promotionApi } from './api/promotionApi';
import { roleApi } from './api/roleApi';
import authSlice from './slices/authSlice';
import orderSlice from './slices/orderSlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  order: orderSlice,
  [commonApi.reducerPath]: commonApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [promotionApi.reducerPath]: promotionApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [currentUserApi.reducerPath]: currentUserApi.reducer,
  [productGradeApi.reducerPath]: productGradeApi.reducer,
  [orderProfileApi.reducerPath]: orderProfileApi.reducer,
  [cityApi.reducerPath]: cityApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [imageApi.reducerPath]: imageApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
});
