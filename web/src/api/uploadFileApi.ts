import axios from "axios";
import { api } from "../env";
import { IApi } from "../interfaces/IApi";
import { updateSelectedClient } from "../slices/user/clientMgmtSlice";
import { updateLoader } from "../slices/common/commonSlice";
import { updateMsg } from "../slices/common/msgSlice";

const url = api;

export const uploadFileApi = async (api: IApi) => {
  const token = localStorage.getItem("token");
  return new Promise(async (resolve) => {
    try {
      await axios
        .post(`${url.api}/${api.uri}`, api.data, {
          headers: { authorisation: `${token}` },
        })
        .then((response) => {
          if (response.data?.validToken) {
            api.dispatch(updateMsg({ errorMsg: response.data?.errorMsg }));
            resolve(true);
          } else {
            api.dispatch(updateMsg({ errorMsg: response.data?.errorMsg }));
            resolve(false);
          }
        });
    } catch (error) {
      resolve(false);
    }
  });
};
