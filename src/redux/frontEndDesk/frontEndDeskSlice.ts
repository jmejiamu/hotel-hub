import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface FrontEndCaledarState {
  response: [
    {
      event_id: string;
      event_title: string;
      event_start: string;
      event_end: string;
      event_description: string;
      user_id: string;
      userType: string;
    }
  ];
}

interface UserData {
  user_id: string;
  userType: string;
}

const userData: UserData = {
  user_id: "",
  userType: "",
};

const initialState: FrontEndCaledarState = {
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

export const frontendCalendar = createAsyncThunk(
  "frontendDesk/frontendCalendar",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api-v1/healers/calendar`,
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
  name: "frontendDesk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(frontendCalendar.pending, (state) => {
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
    builder.addCase(frontendCalendar.fulfilled, (state, action) => {
      state.response = action.payload;
    });
    builder.addCase(frontendCalendar.rejected, (state, action) => {
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
