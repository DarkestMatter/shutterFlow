import { IUserProfile } from "../interface/IUserProfile";
import { userProfileModel } from "../model/userProfileModel";
import { errorMsg } from "./enum";

export const findValidUser = (userId: String | undefined) => {
  return new Promise((resolve, reject) => {
    try {
      if (userId) {
        userProfileModel().findOne(
          { userId: userId },
          { _id: 0 },
          (err: Error, result: IUserProfile) => {
            if (!err) {
              if (result?.email) {
                resolve(result);
              } else {
                resolve(errorMsg.incorrectUserEmail);
              }
            } else {
              reject(errorMsg.noValidUser);
            }
          }
        );
      }
    } catch (err) {
      reject(errorMsg.userFoundError);
    }
  });
};
