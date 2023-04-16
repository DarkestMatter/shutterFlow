import { RequestHandler } from "express";
import { tokenGenerator } from "../../../service/tokenGenerator";
import { ILoginCred } from "../../../interface/ILoginCred";
import { IUserProfile } from "../../../interface/IUserProfile";
import { loginCredModel } from "../../../model/loginCredModel";
import { userProfileModel } from "../../../model/userProfileModel";
import { responderController } from "../responderController";
import {
  customerType,
  errorMsg,
  registrationStatus,
} from "../../../service/enum";
import { IToken } from "../../../interface/IToken";

export const otpVerificationController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const isOtpValid = await validateOtp(req?.body?.email, req?.body?.otp);
    isOtpValid
      ? userProfileModel().findOneAndUpdate(
          { email: req.body?.email },
          { status: registrationStatus.verified },
          async (err: Error, result: IUserProfile) => {
            if (!err) {
              await updateUserLoginCredStatus(req.body?.email);
              const tokenObj: IToken = {
                userId: result?.userId,
                clientId: "",
                customerType: customerType.user,
                status: registrationStatus.verified,
              };
              console.log(result);
              const token = await tokenGenerator(tokenObj);
              const resultObj = {
                email: result?.email,
                status: registrationStatus.verified,
                studioName: result?.studioName,
                mobile: result?.mobile,
                customerType: customerType.user,
              };
              responderController(
                { result: { ...resultObj, token: token }, statusCode: 200 },
                res
              );
            } else {
              responderController(
                {
                  result: {},
                  statusCode: 200,
                  errorMsg: errorMsg.incorrectUserEmail,
                },
                res
              );
            }
          }
        )
      : responderController(
          { result: {}, statusCode: 200, errorMsg: errorMsg.incorrectOtp },
          res
        );
  } catch (err) {
    responderController(
      { result: {}, statusCode: 200, errorMsg: errorMsg.errorAtOtp },
      res
    );
  }
};

const validateOtp = (email: ILoginCred, otp: ILoginCred) => {
  return new Promise((resolve, reject) => {
    loginCredModel().findOne(
      { email: email },
      (err: Error, result: ILoginCred) => {
        if (!err) {
          console.log(result?.otp as unknown as ILoginCred, otp);
          (result?.otp as unknown as ILoginCred) === (otp as ILoginCred)
            ? resolve(true)
            : resolve(false);
        } else {
          reject(true);
        }
      }
    );
  });
};

const updateUserLoginCredStatus = (email: IUserProfile) => {
  return new Promise((resolve, reject) => {
    try {
      loginCredModel().findOneAndUpdate(
        { email: email },
        { status: registrationStatus.verified },
        (err: Error, result: ILoginCred) => {
          if (!err) {
            resolve(true);
          } else {
            reject(true);
          }
        }
      );
    } catch (err) {
      reject(true);
    }
  });
};
