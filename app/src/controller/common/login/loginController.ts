import { RequestHandler } from "express";
import { findValidLogin } from "../../../service/findValidLogin";
import { tokenGenerator } from "../../../service/tokenGenerator";
import { IUserProfile } from "../../../interface/IUserProfile";
import { responderController } from "../responderController";
import { errorMsg, statusEnum } from "../../../service/enum";

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const userData = (await findValidLogin(
      req.body?.email
    )) as unknown as IUserProfile;
    if (
      userData?.pwd === req.body?.pwd &&
      userData?.status === statusEnum.registered
    ) {
      const resultObj = {
        email: userData?.email,
        mobile: userData?.mobile,
        studioName: userData?.studioName,
        status: userData?.status,
      };
      responderController({ result: resultObj, statusCode: 200 }, res);
    } else if (userData?.pwd === req.body?.pwd) {
      //console.log(userData);
      const token = await tokenGenerator(
        userData?.userId,
        userData?.customerType,
        userData?.status
      );
      const resultObj = {
        email: userData?.email,
        studioName: userData?.studioName,
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
      { result: {}, statusCode: 500, errorMsg: errorMsg.loginError },
      res
    );
  }
};
