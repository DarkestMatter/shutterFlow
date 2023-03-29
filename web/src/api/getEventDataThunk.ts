import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../env";
import { IClientData } from "../interfaces/IClient";
import { updateSelectedClient } from "../slices/client/clientSlice";
import { updateLoader } from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";

const url = api;
const token = localStorage.getItem("token");

export const getEventDataThunk = createAsyncThunk(
  "getEventData",
  async (
    payload: { uri: string; data: IClientData },
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
            // dispatch(updateMsg({ errorMsg: response.data?.successMsg }));
            // dispatch(updateSelectedClient(response.data?.result));
            // dispatch(updateLoader({ isLoading: false }));
            // rejectWithValue(true);
          } else {
            // dispatch(updateMsg({ errorMsg: response.data?.errorMsg }));
            // dispatch(updateLoader({ isLoading: false }));
            // rejectWithValue(false);
          }
        });
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);