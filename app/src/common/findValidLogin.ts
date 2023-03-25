import { ILoginCred } from "../interface/ILoginCred";
import { IUserProfile } from "../interface/IUserProfile";
import { loginCredModel } from "../model/loginCredModel";
import { findValidUser } from "./findValidUser";

export const findValidLogin = (email: String) => {
  return new Promise((resolve, reject) => {
    try {
      if (email) {
        loginCredModel().findOne(
          { email: email },
          { _id: 0 },
          async (err: Error, result: ILoginCred) => {
            if (!err) {
              if (result?.email) {
                const userData = (await findValidUser(
                  result?.userId
                )) as IUserProfile;
                //@ts-ignore
                resolve({ ...result._doc, pwd: result?.pwd });
              } else {
                resolve(errorMsg.incorrectUserEmail);
              }
            } else {
              reject(errorMsg.noLoginCredFound);
            }
          }
        );
      }
    } catch (err) {
      reject(errorMsg.loginError);
    }
  });
};
