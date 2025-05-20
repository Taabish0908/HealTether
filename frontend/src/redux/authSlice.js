import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("auth/login", async (form, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:8000/api/auth/login", form);
    return res.data;
  } catch (err) {
    const msg = err?.response?.data?.message;

    let formattedMessage = "Login failed.";

    if (Array.isArray(msg)) {
      formattedMessage = msg.map((m) => m.message).join(", ");
    } else if (typeof msg === "string") {
      formattedMessage = msg;
    }

    return thunkAPI.rejectWithValue(formattedMessage);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
