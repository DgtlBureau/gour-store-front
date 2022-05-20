import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUser} from "../../@types/entities/IUser";

export interface AuthState {
  currentUser: IUser | null;
  isAuth: boolean;
  isFetching: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuth: false,
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
      state.isAuth = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setCurrentUser, setIsAuth, setIsFetching } = authSlice.actions;

export default authSlice.reducer;
