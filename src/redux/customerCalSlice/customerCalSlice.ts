import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./types/customer-cal-slice-type";

const initialState: IInitialState = {
  response: [],
  loading: false,
  error: false,
  message: "",
  status: 0,
};

interface IUserData {
  customer_id: string;
}

export const customerCal = createAsyncThunk(
  "customerCal/customerCalList",
  async (userData: IUserData, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api-v1/customer-event/${userData.customer_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.json();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const customerCalSlice = createSlice({
  name: "customerCal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(customerCal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(customerCal.fulfilled, (state, action) => {
      state.response = action.payload.response;
      state.loading = false;
    });
    builder.addCase(customerCal.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default customerCalSlice.reducer;
