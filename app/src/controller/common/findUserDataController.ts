import { IUserProfile } from "../../interface/IUserProfile";
import { userProfileModel } from "../../model/userProfileModel";

export const findUserDataController = (email: String) => {
  return new Promise((resolve, reject) => {
    try {
      if (email) {
        userProfileModel().findOne(
          { email: email },
          { _id: 0 },
          (err: Error, result: IUserProfile) => {
            if (!err) {
              if (result?.email) {
                resolve(result);
              } else {
                resolve(errorMsg.incorrectUserEmail);
              }
            } else {
              reject(errorMsg.serverError);
            }
          }
        );
      }
    } catch (err) {
      reject(errorMsg.serverError);
    }
  });
};
