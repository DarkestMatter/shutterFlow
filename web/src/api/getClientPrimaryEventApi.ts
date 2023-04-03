import axios from "axios";
import { api } from "../env";
import { IApi } from "../interfaces/IApi";
import { updateClientEventList } from "../slices/client/clientEventSlice";
import { updateLoader } from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";

const url = api;

export const getClientPrimaryEventApi = (api: IApi) => {
  const token = localStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    try {
      await axios
        .post(`${url.api}/${api.uri}`, api.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          if (response.data?.validToken) {
            api.dispatch(updateLoader({ isLoading: false }));
            api.dispatch(updateClientEventList(response.data?.result));
            resolve(true);
          } else {
            api.dispatch(updateMsg({ errorMsg: response.data?.errorMsg }));
            api.dispatch(updateLoader({ isLoading: false }));
            resolve(false);
          }
        });
    } catch (err) {
      reject(true);
    }
  });
};
