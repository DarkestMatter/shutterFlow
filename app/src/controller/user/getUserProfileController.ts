import { RequestHandler } from "express";
import { IAuth } from "../../interface/IAuth";
import { IResponderResult } from "../../interface/IResponderResult";
import { IUserProfile } from "../../interface/IUserProfile";
import { decryptToken } from "../../service/decryptToken";
import { errorMsg } from "../../service/enum";
import { findValidUser } from "../../service/findValidUser";
import { responderController } from "../common/responderController";

export const getUserProfileController: RequestHandler = async (
  req,
  res,
  next
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
