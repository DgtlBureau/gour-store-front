import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { authApi } from 'store/api/authApi';
import { currentUserApi } from 'store/api/currentUserApi';

import { IUser } from 'types/entities/IUser';

export interface AuthState {
  currentUser: IUser | null;
  isAuthorized: boolean;
  isFetching: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthorized: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.signIn.matchFulfilled, state => {
        state.isAuthorized = true;
      })
      .addMatcher(currentUserApi.endpoints.getCurrentUser.matchFulfilled, state => {
        state.isAuthorized = true;
      })
      .addMatcher(currentUserApi.endpoints.getCurrentUser.matchRejected, (state, action) => {
        if (action.error.name === 'ConditionError') return;
        state.isAuthorized = false;
      })
      .addMatcher(authApi.endpoints.signOut.matchFulfilled, state => {
        state.isAuthorized = false;
      });
  },
});

export const { setCurrentUser, setIsAuth, setIsFetching } = authSlice.actions;

export default authSlice.reducer;
