// ** Redux Imports
import { Dispatch } from "redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosServices from "src/utils/axios";
import { IApiResponse } from "src/types/requests";

// ** Axios Imports

interface DataParams {
  q: string;
  role: string;
  status: string;
  currentPlan: string;
}

interface Redux {
  getState: any;
  dispatch: Dispatch<any>;
}

// ** Fetch Users
export const fetchData = createAsyncThunk(
  "appUsers/fetchData",
  async (params: DataParams) => {
    const response: IApiResponse = await axiosServices.get("/users", {
      params,
    });

    return response.payload;
  },
);

// ** Add User
export const addUser = createAsyncThunk(
  "appUsers/addUser",
  async (
    data: { [key: string]: number | string },
    { getState, dispatch }: Redux,
  ) => {
    const response = await axiosServices.post("/apps/users/add-user", {
      data,
    });
    dispatch(fetchData(getState().user.params));

    return response.data;
  },
);

// ** Delete User
export const deleteUser = createAsyncThunk(
  "appUsers/deleteUser",
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axiosServices.delete("/apps/users/delete", {
      data: id,
    });
    dispatch(fetchData(getState().user.params));

    return response.data;
  },
);

export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users;
      state.total = action.payload.total;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
    });
  },
});

export default appUsersSlice.reducer;
