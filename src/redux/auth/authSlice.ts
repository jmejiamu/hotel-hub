import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  username?: string;
  password: string;
  company_code?: string;
  userType: string;
  path: string;
}

export const authUser = createAsyncThunk(
  "auth/authUser",
  async (userData: UserData, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api-v1/${userData.path}`,
        {
          method: "POST",
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

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await AsyncStorage.multiRemove(["token", "user-type"]);
      dispatch(clearUserState());
    } catch (error) {
      console.error("Failed to log out: file authSlice", error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.response = {
        message: "",
        status: 0,
        token: "",
        username: "",
        userType: "",
        user_id: "",
      };
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any;
    });
  },
});

export const { clearUserState } = authSlice.actions;

export default authSlice.reducer;
