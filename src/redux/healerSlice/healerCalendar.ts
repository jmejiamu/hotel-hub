import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HealerState, UserData } from "./types/types";

const userData: UserData = {
  user_id: "",
  userType: "",
};

const initialState: HealerState = {
  response: [
    {
      event_id: "",
      event_title: "",
      event_start: "",
      event_end: "",
      event_description: "",
      user_id: "",
      userType: "",
    },
  ],
};

export const healersSchedule = createAsyncThunk(
  "healer/healersSchedule",
  async (userData: UserData, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api-v1/healer-schedule/${userData.user_id}/${userData.userType}`,
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

const healersScheduleSlice = createSlice({
  name: "healerSchedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(healersSchedule.pending, (state) => {
      state.response = [
        {
          event_id: "",
          event_title: "",
          event_start: "",
          event_end: "",
          event_description: "",
          user_id: "",
          userType: "",
        },
      ];
    });
    builder.addCase(healersSchedule.fulfilled, (state, action) => {
      state.response = action.payload;
    });
    builder.addCase(healersSchedule.rejected, (state, action) => {
      state.response = [
        {
          event_id: "",
          event_title: "",
          event_start: "",
          event_end: "",
          event_description: "",
          user_id: "",
          userType: "",
        },
      ];
    });
  },
});

export default healersScheduleSlice.reducer;
