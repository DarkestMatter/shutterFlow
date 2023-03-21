import { RequestHandler } from "express";
import { IUserProfile } from "../../../interface/IUserProfile";
import { findUserDataController } from "../findUserDataController";
import { responderController } from "../responderController";
import { otpVerificationController } from "./otpVerificationController";
import { tokenGenerator } from "../../../common/tokenGenerator";

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const userData = (await findUserDataController(
      req.body?.email
    )) as unknown as IUserProfile;
    if (userData?.status === userStatus.registered) {
      const resultObj = {
        userId: userData?.userId,
        email: userData?.email,
        mobile: userData?.mobile,
        studioName: userData?.studioName,
        status: userData?.status,
      };
      responderController({ result: resultObj, statusCode: 200 }, res);
    } else if (userData?.pwd === req.body?.pwd) {
      const token = await tokenGenerator(req.body.email);
      const resultObj = {
        email: userData?.email,
        studioName: userData?.studioName,
        userId: userData?.userId,
        mobile: userData?.mobile,
        status: userData?.status,
        token: token,
      };
      responderController({ result: resultObj, statusCode: 200 }, res);
    } else {
      responderController(
        { result: {}, statusCode: 401, errorMsg: errorMsg.incorrectUserEmail },
        res
      );
    }
  } catch (err) {
    responderController(
      { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
      res
    );
  }
};
