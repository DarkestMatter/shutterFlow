import { touchRippleClasses } from "@mui/material";
import axios from "axios";
import { api } from "../env";
import { IApi } from "../interfaces/IApi";
import { dialogName } from "../services/enum";
import { updateLoader, updateToken } from "../slices/common/commonSlice";
import { openDialogBox } from "../slices/common/dialogBoxSlice";
import { updateMsg } from "../slices/common/msgSlice";
import { updateUserProfile } from "../slices/user/userProfileSlice";

const url = api;

export const submitRegistrationFormApi = async (api: IApi) => {
  const token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    try {
      api.dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}/${api.uri}`, api.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          api.dispatch(updateUserProfile(response.data.result));
          api.dispatch(updateMsg(response.data));
          api.dispatch(openDialogBox({ dialogName: dialogName.otpDialog }));
          api.dispatch(updateLoader({ isLoading: false }));
          resolve(response?.data?.result);
        })
        .catch((err) => {
          api.dispatch(updateLoader({ isLoading: false }));
          api.dispatch(updateMsg({ errorMsg: err.data?.errorMsg }));
        });
    } catch (error) {
      resolve(false);
    }
  });
};

export const submitRegistrationOtpApi = async (api: IApi) => {
  return new Promise(async (resolve) => {
    try {
      api.dispatch(updateLoader({ isLoading: true }));
      await axios.post(`${url.api}/${api.uri}`, api.data).then((response) => {
        if (response?.data?.result?.token) {
          api.dispatch(updateUserProfile(response.data?.result));
          api.dispatch(updateToken({ isValidToken: true }));
          api.dispatch(updateMsg(response.data));
          localStorage.setItem("token", response.data?.result?.token);
          api.dispatch(updateLoader({ isLoading: false }));
          resolve(response.data?.result);
        } else {
          api.dispatch(updateMsg(response.data));
          api.dispatch(updateLoader({ isLoading: false }));
          resolve(false);
        }
      });
    } catch (error) {
      resolve(false);
    }
  });
};
