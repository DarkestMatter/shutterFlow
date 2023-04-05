import { RequestHandler } from "express";
import { findValidLogin } from "../../../service/findValidLogin";
import { tokenGenerator } from "../../../service/tokenGenerator";
import { IUserProfile } from "../../../interface/IUserProfile";
import { responderController } from "../responderController";
import { errorMsg, registrationStatus } from "../../../service/enum";
import { ILoginCred } from "../../../interface/ILoginCred";
import { IToken } from "../../../interface/IToken";

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const userData = (await findValidLogin(
      req.body?.loginId
    )) as unknown as IUserProfile & ILoginCred;
    if (
      userData?.pwd === req.body?.pwd &&
      userData?.status === registrationStatus.registered
    ) {
      const resultObj = {
        email: userData?.email,
        mobile: userData?.mobile,
        studioName: userData?.studioName,
        status: userData?.status,
      };
      responderController({ result: resultObj, statusCode: 200 }, res);
    } else if (userData?.pwd === req.body?.pwd) {
      const tokenObj: IToken = {
        userId: userData?.userId,
        clientId: userData?.clientId,
        customerType: userData?.customerType,
        status: userData?.status,
      };
      const token = await tokenGenerator(tokenObj);
      const resultObj = {
        email: userData?.email,
        studioName: userData?.studioName,
        mobile: userData?.mobile,
        status: userData?.status,
        customerType: userData?.customerType,
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
