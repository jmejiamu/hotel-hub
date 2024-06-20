import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerCalendar, ICustomerCalendar } from "./types/types";

const initialState: CustomerCalendar = {
  event_id: "",
  user_id: "",
  userType: "",
  eventTitle: "",
  eventDescription: "",
  eventStartDate: "",
  eventEndDate: "",
  path: "",
  customer_id: "",
};

export const customerCalendar = createAsyncThunk(
  "frontendDesk/customerCalendarSlice",
  async (userData: ICustomerCalendar, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api-v1/customer-calendar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const res = await response.json();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const customerCalendarSlice = createSlice({
  name: "frontendDesk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(customerCalendar.pending, (state) => {
      state.user_id = "";
      state.userType = "";
      state.eventTitle = "";
      state.eventDescription = "";
      state.eventStartDate = "";
      state.eventEndDate = "";
      state.path = "";
      state.event_id = "";
    });
    builder.addCase(customerCalendar.fulfilled, (state, action) => {
      state.user_id = action.payload.user_id;
      state.userType = action.payload.userType;
      state.eventTitle = action.payload.eventTitle;
      state.eventDescription = action.payload.eventDescription;
      state.eventStartDate = action.payload.eventStartDate;
      state.eventEndDate = action.payload.eventEndDate;
      state.event_id = action.payload.event_id;
    });
  },
});

export default customerCalendarSlice.reducer;
