import { RequestHandler } from "express";
import { decryptToken } from "../../service/decryptToken";
import { findValidUser } from "../../service/findValidUser";
import { IAuth } from "../../interface/IAuth";
import { IResponderResult } from "../../interface/IResponderResult";
import { IUserProfile } from "../../interface/IUserProfile";
import { responderController } from "./responderController";
import { errorMsg } from "../../service/enum";
import { getUserProfileController } from "../user/getUserProfileController";

export const validateTokenController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const auth = (await decryptToken(req.headers)) as unknown as IAuth;
    if (auth?.userId) {
      getUserProfileController(req, res, next, auth);
    } else if (auth?.clientId) {
      responderController({ result: auth, statusCode: 200 }, res);
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
