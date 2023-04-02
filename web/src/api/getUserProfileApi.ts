import axios from "axios";
import { api } from "../env";
import { IApi } from "../interfaces/IApi";
import { updateLoader, updateToken } from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";
import { updateUserProfile } from "../slices/user/userProfileSlice";

const url = api;

export const getUserProfileApi = async (api: IApi) => {
  const token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    try {
      api.dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}/${api.uri}`, api.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          if (response.data?.result?.email || response.data?.result?.mobile) {
            api.dispatch(updateToken({ isValidToken: true }));
            api.dispatch(updateUserProfile(response.data?.result));
            api.dispatch(updateLoader({ isLoading: false }));
            resolve(true);
          } else {
            api.dispatch(updateMsg({ errorMsg: "this is err msg" }));
            api.dispatch(updateToken({ isValidToken: false }));
            api.dispatch(updateLoader({ isLoading: false }));
            resolve(false);
          }
        });
    } catch (error) {
      resolve(false);
    }
  });
};
