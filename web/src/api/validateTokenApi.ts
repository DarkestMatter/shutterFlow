import axios from "axios";
import { api } from "../env";
import { IApi } from "../interfaces/IApi";
import { customerType } from "../services/enum";
import { updateClientProfile } from "../slices/client/clientProfileSlice";
import { updateLoader, updateToken } from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";
import { updateUserProfile } from "../slices/user/userProfileSlice";

const url = api;

export const validateTokenApi = async (api: IApi) => {
  const token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    try {
      api.dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}/${api.uri}`, api.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          switch (true) {
            case response.data?.result?.customerType === customerType.client ||
              response.data?.result?.customerType === customerType.both:
              api.dispatch(updateToken({ isValidToken: true }));
              api.dispatch(updateLoader({ isLoading: false }));
              api.dispatch(updateClientProfile(response?.data?.result));
              resolve(true);
              break;
            case response.data?.result?.customerType === customerType.user:
              api.dispatch(updateToken({ isValidToken: true }));
              api.dispatch(updateLoader({ isLoading: false }));
              api.dispatch(updateUserProfile(response?.data?.result));
              resolve(true);
              break;
            default:
              api.dispatch(updateMsg({ errorMsg: "this is err msg" }));
              api.dispatch(updateToken({ isValidToken: false }));
              api.dispatch(updateLoader({ isLoading: false }));
              resolve(false);
              break;
          }
        });
    } catch (error) {
      resolve(false);
    }
  });
};
