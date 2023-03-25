import { v4 as uuidv4 } from "uuid";
import { ILoginCred } from "../interface/ILoginCred";
import { IUserProfile } from "../interface/IUserProfile";
import { loginCredModel } from "../model/loginCredModel";
import { otpGenerator } from "./otpGenerator";

export const addLoginCred = async (userData: IUserProfile) => {
  return new Promise((resolve, reject) => {
    const saveNewLoginCred = loginCredModel();
    let new_model: ILoginCred = {
      userId: `${userData?.studioName?.replace(/\s/g, "")}-${uuidv4()}`,
      email: userData?.email?.trim(),
      mobile: userData?.mobile?.trim(),
      pwd: userData?.pwd,
      status: userData?.status,
      customerType: userData?.customerType,
      otp: otpGenerator(),
      createdDate: new Date() as unknown as String,
      updatedDate: new Date() as unknown as String,
    };
    let obj = new saveNewLoginCred(new_model);
    obj.save((err, result) => {
      try {
        if (!err) {
          const resultObj: ILoginCred = {
            userId: result?.userId,
            email: result?.email,
            mobile: result?.mobile,
            status: result?.status,
            customerType: result?.customerType,
            updatedDate: result?.updatedDate,
          };
          resolve(resultObj);
        } else {
          reject({ errorMsg: errorMsg.serverError });
        }
      } catch (err) {
        reject({ errorMsg: errorMsg.serverError });
      }
    });
  });
};
