// src/redux/reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
  loading: false,
  error: null,
  favorites: [],
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    fetchCarsRequest: (state) => {
      state.loading = true;
    },
    fetchCarsSuccess: (state, action) => {
      state.loading = false;
      state.cars = action.payload;
      state.error = null;
    },
    fetchCarsFailure: (state, action) => {
      state.loading = false;
      state.cars = [];
      state.error = action.payload;
    },
  },
});

export const { fetchCarsRequest, fetchCarsSuccess, fetchCarsFailure } = carsSlice.actions;
export default carsSlice.reducer;
