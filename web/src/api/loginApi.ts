import axios from "axios";
import { api } from "../env";
import { IApi } from "../interfaces/IApi";
import { customerType, dialogName, userStatus } from "../services/enum";
import { updateClientProfile } from "../slices/client/clientProfileSlice";
import { updateLoader, updateToken } from "../slices/common/commonSlice";
import { openDialogBox } from "../slices/common/dialogBoxSlice";
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
            localStorage.setItem("token", response.data?.result?.token);
            api.dispatch(updateToken({ isValidToken: true }));
            api.dispatch(updateLoader({ isLoading: false }));
            response?.data?.result?.customerType === customerType.user
              ? api.dispatch(updateUserProfile(response.data?.result))
              : api.dispatch(updateClientProfile(response.data?.result));
            resolve(response.data?.result);
          } else {
            if (response.data?.result?.status === userStatus.registered) {
              api.dispatch(openDialogBox({ dialogName: dialogName.otpDialog }));
            }
            api.dispatch(updateLoader({ isLoading: false }));
            api.dispatch(updateToken({ isValidToken: false }));
            resolve(false);
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
