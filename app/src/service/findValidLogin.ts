import { ILoginCred } from "../interface/ILoginCred";
import { IUserProfile } from "../interface/IUserProfile";
import { loginCredModel } from "../model/loginCredModel";
import { errorMsg } from "./enum";
import { findValidUser } from "./findValidUser";

export const findValidLogin = (loginId: String) => {
  return new Promise((resolve, reject) => {
    try {
      if (loginId) {
        loginCredModel().findOne(
          { $or: [{ email: loginId }, { mobile: loginId }] },
          { _id: 0 },
          async (err: Error, result: ILoginCred) => {
            if (!err) {
              if (result?.email || result?.mobile) {
                //@ts-ignore
                resolve({ ...result._doc, pwd: result?.pwd });
              } else {
                resolve(errorMsg.incorrectUserEmail);
              }
            } else {
              resolve(errorMsg.noLoginCredFound);
            }
          }
        );
      } else {
        resolve(errorMsg.noLoginCredFound);
      }
    } catch (err) {
      reject(errorMsg.loginError);
    }
  });
};
