import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";

const rootReducer = combineReducers({
  userAuth: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;

export default store;
