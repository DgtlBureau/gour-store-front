import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createMigrate,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { commonApi } from './api/commonApi';
import { rootReducer } from './rootReducer';
import { storeMigrations } from './storeMigrations';

const persistConfig = {
  version: 0,
  key: 'root',
  blacklist: [
    'auth',
    'authApi',
    'commonApi',
    'productApi',
    'productGradeApi',
    'promotionApi',
    'cityApi',
    'orderApi',
    'invoiceApi',
    'favoriteApi',
    'orderProfileApi',
    'imageApi',
    'currentUserApi',
  ],
  storage,
  migrate: createMigrate(storeMigrations, { debug: false }),
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
