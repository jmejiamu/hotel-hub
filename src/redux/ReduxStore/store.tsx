import { combineReducers, configureStore } from "@reduxjs/toolkit";
import healersScheduleSlice from "../healerSlice/healerCalendar";
import customerSlice from "../customerSlice/customerSlice";
import healerSlice from "../healerSlice/healerSlice";
import authSlice from "../auth/authSlice";
import frontEndDeskSlice from "../frontEndDesk/frontEndDeskSlice";

const rootReducer = combineReducers({
  userAuth: authSlice,
  customers: customerSlice,
  healerSchedule: healerSlice,
  healerGetSchedule: healersScheduleSlice,
  frontEndDeskCalendar: frontEndDeskSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;

export default store;
