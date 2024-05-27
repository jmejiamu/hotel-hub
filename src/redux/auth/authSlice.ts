import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/usersType/usersType";

interface Response {
  message: string;
  status: number;
  token: string;
  username: string;
  userType: string;
  user_id: string;
}
interface AuthState {
  response: Response;
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  response: {
    message: "",
    status: 0,
    token: "",
    username: "",
    userType: "",
    user_id: "",
  },
  loading: false,
  error: false,
};
interface UserData {
  email: string;
  username: string;
  password: string;
  company_code: string;
  userType: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: UserData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api-v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const res = await response.json();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any;
    });
  },
});

export default authSlice.reducer;
