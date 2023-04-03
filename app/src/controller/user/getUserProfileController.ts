import { RequestHandler } from "express";
import {
  Request,
  ParamsDictionary,
  Response,
  NextFunction,
} from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IAuth } from "../../interface/IAuth";
import { IResponderResult } from "../../interface/IResponderResult";
import { IUserProfile } from "../../interface/IUserProfile";
import { decryptToken } from "../../service/decryptToken";
import { errorMsg } from "../../service/enum";
import { findValidUser } from "../../service/findValidUser";
import { responderController } from "../common/responderController";

export const getUserProfileController = async (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction,
  auth: IAuth
) => {
  try {
    const auth = (await decryptToken(req.headers)) as unknown as IAuth;
    if (auth?.userId || auth?.clientId) {
      const userData: IUserProfile = (await findValidUser(
        auth?.userId
      )) as unknown as IUserProfile;
      const resultObj: IResponderResult = {
        result: {
          userId: userData?.userId,
          email: userData?.email,
          studioName: userData?.studioName,
          mobile: userData?.mobile,
          status: userData?.status,
          customerType: auth?.customerType,
        },
        statusCode: 200,
      };
      userData
        ? responderController(resultObj, res)
        : responderController(
            {
              result: {},
              statusCode: 200,
              errorMsg: errorMsg.incorrectUserEmail,
            },
            res
          );
    } else {
      responderController(
        { result: {}, statusCode: 200, errorMsg: errorMsg.invalidToken },
        res
      );
    }
  } catch (err) {
    responderController(
      { result: {}, statusCode: 200, errorMsg: errorMsg.serverError },
      res
    );
  }
};
