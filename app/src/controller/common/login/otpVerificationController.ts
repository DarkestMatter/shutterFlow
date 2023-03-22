import { RequestHandler } from "express";
import { tokenGenerator } from "../../../common/tokenGenerator";
import { ILoginCred } from "../../../interface/ILoginCred";
import { IUserProfile } from "../../../interface/IUserProfile";
import { loginCredModel } from "../../../model/loginCredModel";
import { userProfileModel } from "../../../model/userProfileModel";
import { responderController } from "../responderController";

export const otpVerificationController: RequestHandler = (req, res, next) => {
  try {
    userProfileModel().findOneAndUpdate(
      { email: req.body?.email },
      { status: statusEnum.verified },
      async (err: Error, result: IUserProfile) => {
        if (!err) {
          updateUserLoginCredStatus(req.body?.email);
          const token = await tokenGenerator(
            result?.userId,
            result?.customerType
          );
          const resultObj = {
            email: result?.email,
            status: statusEnum.verified,
            studioName: result?.studioName,
            mobile: result?.mobile,
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
    );
  } catch (err) {
    responderController(
      { result: {}, statusCode: 200, errorMsg: errorMsg.serverError },
      res
    );
  }
};

const updateUserLoginCredStatus = (email: IUserProfile) => {
  try {
    loginCredModel().findOneAndUpdate(
      { email: email },
      { status: statusEnum.verified },
      async (err: Error, result: ILoginCred) => {
        if (!err) {
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
