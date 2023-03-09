import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { currentUserApi } from 'store/api/currentUserApi';

import {ICity} from "../../types/entities/ICity";

export interface CityState {
  city: ICity | null;
}

const initialState: CityState = {
  city: null,
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<ICity>) => {
      state.city = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(currentUserApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
        state.city = action.payload.city;
      })
  },
});

export const { setCurrentCity } = citySlice.actions;

export default citySlice.reducer;
