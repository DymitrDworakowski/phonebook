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
    page: 1,
    hasMoreContacts: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const newContacts = action.payload.contacts;

        // Фільтруємо нові контакти, щоб уникнути дублювання
        const uniqueContacts = newContacts.filter(
          (newContact) =>
            !state.items.some(
              (existingContact) => existingContact._id === newContact._id
            )
        );

        // Додаємо тільки унікальні контакти до існуючого масиву
        state.items = [...state.items, ...uniqueContacts];

        // Оновлюємо сторінку
        state.page = action.payload.currentPage;

        // Перевіряємо, чи є ще контакти для завантаження
        state.hasMoreContacts = newContacts.length > 0;
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
        state.items = state.items.filter(
          (contact) => contact._id !== action.meta.arg // action.meta.arg міститиме ID видаленого контакту
        );
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        );
      })
      .addCase(editContact.rejected, handleRejected)
      .addCase(statusFavorite.pending, handlePending)
      .addCase(statusFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const statusContact = action.payload;
        const index = state.items.findIndex(
          (contact) => contact._id === statusContact._id
        );
        if (index !== -1) {
          state.items[index] = statusContact;
        }
      })
      .addCase(statusFavorite.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
