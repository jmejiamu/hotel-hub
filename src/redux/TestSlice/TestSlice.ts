import { createSlice } from "@reduxjs/toolkit";

export type Test = {
  name: string;
};

export type TestState = {
  test: Test[];
  loading: boolean;
  error: boolean;
};

const initialState: TestState = {
  test: [],
  loading: false,
  error: false,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
});

export default testSlice.reducer;
