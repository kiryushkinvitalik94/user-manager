import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users/usersSlice";
import userReducer from "../reducers/user/userSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
