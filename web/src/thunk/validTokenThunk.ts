import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../env";
import { updateLoader, updateToken } from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";
import { updateUserProfile } from "../slices/user/userProfileSlice";

const url = api;
const token = localStorage.getItem("token");

export const validateTokenThunk = createAsyncThunk(
  "getClient",
  async (payload: { uri: string; data: {} }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}/${payload.uri}`, payload.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          if (response.data?.result?.email) {
            dispatch(updateToken({ isValidToken: true }));
            dispatch(updateUserProfile(response.data?.result));
            dispatch(updateLoader({ isLoading: false }));
          } else {
            dispatch(updateMsg({ errorMsg: "this is err msg" }));
            dispatch(updateToken({ isValidToken: false }));
            dispatch(updateLoader({ isLoading: false }));
          }
        });
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
