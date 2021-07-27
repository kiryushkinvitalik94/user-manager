import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../interfaces/User";
import { fetchUserWithId, deleteUserWithId, updateUserWithId } from "./userAPI";

export interface UsersState {
  user: any;
  status: "succses" | "loading" | "failed";
  error: null | String;
}

const initialState: UsersState = {
  user: {},
  status: "succses",
  error: null,
};

export const getUserAsync = createAsyncThunk(
  "user/fetchUser",
  async (uuid: string) => {
    const response = await fetchUserWithId(uuid);
    const data = await response.json();

    return data.results;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (uuid: string) => {
    const response = await deleteUserWithId(uuid);
    const data = await response.json();

    return data.results;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userData: User) => {
    const response = await updateUserWithId(userData);
    const data = await response.json();

    return data.results;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "succses";
        state.user = action.payload[0];
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.status = "succses";
        state.user = {};
      })
      .addCase(deleteUserAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "succses";
        state.user = action.payload[0];
      })
      .addCase(updateUserAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
