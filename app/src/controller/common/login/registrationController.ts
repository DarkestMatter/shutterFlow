import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { otpGenerator } from "../../../common/otpGenerator";
import { IResponderResult } from "../../../interface/IResponderResult";
import { IUserProfile } from "../../../interface/IUserProfile";
import { userProfileModel } from "../../../model/userProfileModel";
import { findUserDataController } from "../findUserDataController";
import { responderController } from "../responderController";

export const registrationController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userData = (await findUserDataController(
      req.body?.email
    )) as unknown as IUserProfile;
    if (userData?.email && userData?.status === userStatus.verified) {
      const resultObj: IResponderResult = {
        result: userData,
        statusCode: 200,
        errorMsg: errorMsg.userExist,
      };
      responderController(resultObj, res);
    } else if (userData?.email && userData?.status === userStatus.registered) {
      const resultObj: IResponderResult = {
        result: userData,
        statusCode: 200,
        successMsg: successMsg.enterOtp,
      };
      responderController(resultObj, res);
    } else if (!userData?.email && !userData?.status) {
      const saveUserRegistration = userProfileModel();
      let new_model: IUserProfile = {
        userId: uuidv4(),
        email: req.body.email.trim(),
        mobile: req.body.mobile.trim(),
        studioName: req.body.studioName.trim(),
        pwd: req.body.pwd,
        status: userStatus.registered,
        otp: otpGenerator(),
      };
      let obj = new saveUserRegistration(new_model);
      obj.save((err, result) => {
        try {
          if (!err) {
            const resultObj = {
              userId: result?.userId,
              email: result?.email,
              mobile: result?.mobile,
              studioName: result?.studioName,
              status: result?.status,
            };
            responderController({ result: resultObj, statusCode: 200 }, res);
          } else {
            responderController(
              { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
              res
            );
          }
        } catch (err) {
          responderController(
            { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
            res
          );
        }
      });
    }
  } catch (err) {
    const errMsg = typeof err === "string" ? err : errorMsg.serverError;
    responderController({ result: {}, statusCode: 500, errorMsg: errMsg }, res);
  }
};
