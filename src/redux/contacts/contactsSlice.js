import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
  statusFavorite,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedContact = action.payload; // Оновлений контакт, який повернув сервер
        const index = state.items.findIndex(
          (contact) => contact.id === updatedContact.id
        );
        if (index !== -1) {
          // Якщо контакт існує у списку, замініть його оновленим контактом
          state.items.splice(index, 1, updatedContact);
        }
      })
      .addCase(editContact.rejected, handleRejected)
      .addCase(statusFavorite.pending, handlePending)
      .addCase(statusFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const statusContact = action.payload;
        console.log(statusContact); // Оновлений контакт, який повернув сервер
        const index = state.items.findIndex(
          (contact) => contact.id === statusContact.id
        );
        if (index !== -1) {
          // Якщо контакт існує у списку, замініть його оновленим контактом
          state.items.splice(index, 1, statusContact);
        }
      })
      .addCase(statusFavorite.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
