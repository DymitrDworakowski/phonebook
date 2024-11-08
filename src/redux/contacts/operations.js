import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (page = 1, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.get(`api/contacts?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      console.error("Error fetching contacts:", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, phone, email }, thunkAPI) => {
    try {
      const response = await axios.post("api/contacts", { name, phone, email });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e._message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`api/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ name, phone, email, id }, thunkAPI) => {
    try {
      const response = await axios.put(`api/contacts/${id}`, {
        name,
        phone,
        email,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const statusFavorite = createAsyncThunk(
  "contacts/statusFavorite",
  async ({ favorite, id }, thunkAPI) => {
    console.log(favorite);
    try {
      const response = await axios.patch(`api/contacts/${id}/favorite`, {
        favorite,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
