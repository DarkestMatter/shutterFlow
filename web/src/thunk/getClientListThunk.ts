import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../env";
import { IUserProfile } from "../interfaces/IUserProfile";
import { updateClientList } from "../slices/client/clientSlice";
import {
  commonSlice,
  updateLoader,
  updateToken,
} from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";

const url = api;
const token = localStorage.getItem("token");

export const getClientListThunk = createAsyncThunk(
  "getClient",
  async (
    payload: { uri: string; data: IUserProfile },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}/${payload.uri}`, payload.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          if (response.data?.validToken) {
            dispatch(updateLoader({ isLoading: false }));
            dispatch(updateClientList(response.data?.result));
          } else {
            dispatch(updateMsg({ errorMsg: response.data?.errorMsg }));
            dispatch(updateLoader({ isLoading: false }));
          }
        });
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
