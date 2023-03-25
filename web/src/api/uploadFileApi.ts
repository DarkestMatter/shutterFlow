import axios from "axios";
import { api } from "../env";
import { IApi } from "../interfaces/IApi";
import { updateSelectedClient } from "../slices/client/clientSlice";
import { updateLoader } from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";

const url = api;

export const uploadFileApi = async (api: IApi) => {
  const token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    try {
      api.dispatch(updateLoader({ isLoading: true }));
      await axios
        .post(`${url.api}/${api.uri}`, api.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          if (response.data?.validToken) {
            api.dispatch(updateMsg({ errorMsg: response.data?.errorMsg }));
            api.dispatch(updateSelectedClient(response.data?.result));
            api.dispatch(updateLoader({ isLoading: false }));
            resolve(true);
          } else {
            api.dispatch(updateMsg({ errorMsg: response.data?.errorMsg }));
            api.dispatch(updateLoader({ isLoading: false }));
            resolve(false);
          }
        });
    } catch (error) {
      resolve(false);
    }
  });
};
