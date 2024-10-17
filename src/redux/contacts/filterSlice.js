import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = ""; // Початкове значення фільтра

const filterSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: {
    findContact: (state, action) => {
      // Оновлюємо значення фільтра без зайвого обгортання в об'єкт
      return (state = action.payload);
    },
  },
});

export const { findContact } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;