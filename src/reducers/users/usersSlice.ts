import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchUsers } from "./usersAPI";
import { User } from "../../interfaces/User";

export interface UsersState {
  users: Array<User>;
  status: "succses" | "loading" | "failed";
  error: null | String;
}

const dataFromLocalStorage = localStorage.getItem("users");
const parsedDataUsersFromLS = dataFromLocalStorage
  ? JSON.parse(dataFromLocalStorage)
  : [];

const initialState: UsersState = {
  users: parsedDataUsersFromLS,
  status: "succses",
  error: null,
};

export const getUsersAsync = createAsyncThunk(
  "users/fetchUsers",
  async (usersCount: Number) => {
    const response = await fetchUsers(usersCount);
    const data = await response.json();
    localStorage.setItem("users", JSON.stringify(data.results));
    return data.results;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "succses";
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUserByEmail = (email: String) => (state: RootState) =>
  state.users.users.find((user: any) => user?.email === email);
export const selectUserByuuid = (id: String) => (state: RootState) =>
  state.users.users.find((user: any) => user?.login.uuid === id);

export default usersSlice.reducer;
