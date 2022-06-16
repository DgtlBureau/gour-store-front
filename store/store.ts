import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { orderProfileApi } from './api/orderProfileApi';

import { commonApi } from './api/commonApi';
import { rootReducer } from './rootReducer';

import { commonApi } from './api/commonApi';
import { rootReducer } from './rootReducer';

const persistConfig = {
  key: 'root',
  blacklist: [
    'auth',
    'commonApi',
    'productApi',
    'productGradeApi',
    'promotionApi',
    'cityApi',
    'orderApi',
    'orderProfileApi',
  ],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(commonApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;