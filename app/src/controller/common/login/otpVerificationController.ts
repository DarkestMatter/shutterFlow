import { RequestHandler } from "express";
import { IUserProfile } from "../../../interface/IUserProfile";
import { userProfileModel } from "../../../model/userProfileModel";
import { responderController } from "../responderController";
import { tokenGenerator } from "../../../common/tokenGenerator";

export const otpVerificationController: RequestHandler = (req, res, next) => {
  try {
    userProfileModel().findOne(
      { email: req.body?.email },
      async (err: Error, result: IUserProfile) => {
        if (!err) {
          if (result?.otp === Math.round(req.body?.otp)) {
            userProfileModel().findOneAndUpdate(
              { email: req.body?.email },
              { status: userStatus.verified },
              async (err: Error, result: IUserProfile) => {
                if (!err) {
                  const resultObj = {
                    userId: result?.userId,
                    email: result?.email,
                    mobile: result?.mobile,
                    studioName: result?.studioName,
                    status: result?.status,
                  };
                  const token = await tokenGenerator(req.body.email);
                  responderController(
                    { result: { token: token }, statusCode: 200 },
                    res
                  );
                } else {
                  responderController(
                    {
                      result: {},
                      statusCode: 200,
                      errorMsg: errorMsg.serverError,
                    },
                    res
                  );
                }
              }
            );
          } else {
            responderController(
              { result: {}, statusCode: 200, errorMsg: errorMsg.incorrectOtp },
              res
            );
          }
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
