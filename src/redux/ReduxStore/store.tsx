import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TestSlice from "../TestSlice/TestSlice";

const rootReducer = combineReducers({
  test: TestSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
