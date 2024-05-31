import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types/customer-type";

const initialState: InitialState = {
  customers: [],
  loading: false,
  error: false,
};

export const customerList = createAsyncThunk(
  "customer/customerList",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api-v1/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(customerList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(customerList.fulfilled, (state, action) => {
      state.customers = action.payload;
      state.loading = false;
    });
    builder.addCase(customerList.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default customerSlice.reducer;
