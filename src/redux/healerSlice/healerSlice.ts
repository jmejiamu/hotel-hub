import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HealerInitalState } from "./types/types";

const initialState: HealerInitalState = {
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

export const healerCalendar = createAsyncThunk(
  "healer/healerCalendar",
  async (userData: HealerInitalState, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api-v1/${userData.path}`,
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

const healerSlice = createSlice({
  name: "healer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(healerCalendar.pending, (state) => {
      state.user_id = "";
      state.userType = "";
      state.eventTitle = "";
      state.eventDescription = "";
      state.eventStartDate = "";
      state.eventEndDate = "";
      state.path = "";
      state.event_id = "";
    });
    builder.addCase(healerCalendar.fulfilled, (state, action) => {
      state.user_id = action.payload.user_id;
      state.userType = action.payload.userType;
      state.eventTitle = action.payload.eventTitle;
      state.eventDescription = action.payload.eventDescription;
      state.eventStartDate = action.payload.eventStartDate;
      state.eventEndDate = action.payload.eventEndDate;
      state.event_id = action.payload.event_id;
      state.customer_id = action.payload.customer_id;
    });
    builder.addCase(healerCalendar.rejected, (state) => {
      state.user_id = "";
      state.userType = "";
      state.eventTitle = "";
      state.eventDescription = "";
      state.eventStartDate = "";
      state.eventEndDate = "";
    });
  },
});

export default healerSlice.reducer;
