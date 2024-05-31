import { combineReducers, configureStore } from "@reduxjs/toolkit";
import customerSlice from "../customerSlice/customerSlice";
import authSlice from "../auth/authSlice";

const rootReducer = combineReducers({
  userAuth: authSlice,
  customers: customerSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;

export default store;
