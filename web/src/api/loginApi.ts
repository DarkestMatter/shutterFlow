import axios from "axios";
import { api } from "../env";
import { IApi } from "../interfaces/IApi";
import { userStatus } from "../services/enum";
import { updateLoader, updateToken } from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";
import { updateUserProfile } from "../slices/user/userProfileSlice";

const url = api;

export const loginApi = async (api: IApi) => {
  const token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    try {
      api.dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}/${api.uri}`, api.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          if (response?.data?.validToken && response.data?.result?.token) {
            api.dispatch(updateMsg({ errorMsg: response.data?.errorMsg }));
            localStorage.setItem("token", response.data?.result?.token);
            api.dispatch(updateUserProfile(response.data?.result));
            api.dispatch(updateLoader({ isLoading: false }));
            resolve(response.data?.result);
          } else {
            api.dispatch(updateLoader({ isLoading: false }));
            api.dispatch(updateToken({ isValidToken: false }));
            resolve(response.data?.result);
          }
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
