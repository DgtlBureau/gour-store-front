import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import orderSlice from './slices/orderSlice';
import { productApi } from './api/productApi';
import { promotionApi } from './api/promotionApi';
import { cityApi } from './api/cityApi';
import { roleApi } from './api/roleApi';
import { authApi } from './api/authApi';
import { productGradeApi } from './api/productGradeApi';
import { orderApi } from './api/orderApi';
import { orderProfileApi } from './api/orderProfileApi';
import { pageApi } from './api/pageApi';
import { categoryApi } from './api/categoryApi';

export const rootReducer = combineReducers({
  auth: authSlice,
  order: orderSlice,
  [orderApi.reducerPath]: orderApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [promotionApi.reducerPath]: promotionApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [productGradeApi.reducerPath]: productGradeApi.reducer,
  [orderProfileApi.reducerPath]: orderProfileApi.reducer,
  [cityApi.reducerPath]: cityApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});
