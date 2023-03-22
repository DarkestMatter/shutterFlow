import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../env";
import { IUserProfile } from "../interfaces/IUserProfile";
import { dialogName } from "../services/enum";
import { updateLoader, updateToken } from "../slices/common/commonSlice";
import { openDialogBox } from "../slices/common/dialogBoxSlice";
import { updateMsg } from "../slices/common/msgSlice";
import { updateUserProfile } from "../slices/user/userProfileSlice";

const url = api;
const token = localStorage.getItem("token");

export const submitRegistrationFormThunk = createAsyncThunk(
  "loginEmail",
  async (
    payload: { uri: string; data: IUserProfile },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}${payload.uri}`, payload.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          dispatch(updateUserProfile(response.data.result));
          dispatch(updateMsg(response.data));
          dispatch(openDialogBox({ dialogName: dialogName.otpDialogBox }));
          dispatch(updateLoader({ isLoading: false }));
        });
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);

export const submitRegistrationOtpThunk = createAsyncThunk(
  "loginOtp",
  async (
    payload: { uri: string; data: IUserProfile },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}${payload.uri}`, payload.data)
        .then((response) => {
          if (response?.data?.result?.token) {
            dispatch(updateUserProfile(response.data?.result));
            dispatch(updateToken({ isValidToken: true }));
            dispatch(updateMsg(response.data));
            localStorage.setItem("token", response.data?.result?.token);
            dispatch(updateLoader({ isLoading: false }));
          } else {
            dispatch(updateMsg(response.data));
            dispatch(updateLoader({ isLoading: false }));
          }
        });
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
