import { RequestHandler } from "express";
import { addLoginCred } from "../../../service/addLoginCred";
import { findValidLogin } from "../../../service/findValidLogin";
import { ILoginCred } from "../../../interface/ILoginCred";
import { IResponderResult } from "../../../interface/IResponderResult";
import { IUserProfile } from "../../../interface/IUserProfile";
import { userProfileModel } from "../../../model/userProfileModel";
import { responderController } from "../responderController";
import {
  customerType,
  errorMsg,
  statusEnum,
  successMsg,
} from "../../../service/enum";

export const registrationController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userData = (await findValidLogin(
      req.body?.email
    )) as unknown as ILoginCred;
    if (userData?.email && userData?.status === statusEnum.verified) {
      const resultObj: IResponderResult = {
        result: userData,
        statusCode: 200,
        errorMsg: errorMsg.userExist,
      };
      responderController(resultObj, res);
    } else if (userData?.email && userData?.status === statusEnum.registered) {
      const resultObj: IResponderResult = {
        result: userData,
        statusCode: 200,
        successMsg: successMsg.enterOtp,
      };
      responderController(resultObj, res);
    } else {
      try {
        const newUserData: IUserProfile = {
          ...req.body,
          status: statusEnum.registered,
          customerType: customerType.user,
        };

        const loginCreated = (await addLoginCred(
          newUserData
        )) as unknown as ILoginCred;

        const saveUserRegistration = userProfileModel();
        let new_model: IUserProfile = {
          userId: loginCreated?.userId,
          email: loginCreated?.email,
          mobile: loginCreated?.mobile,
          studioName: req.body?.studioName,
          status: statusEnum.registered,
          createdDate: new Date() as unknown as String,
          udpatedDate: new Date() as unknown as String,
        };
        let obj = new saveUserRegistration(new_model);
        obj.save((err, result) => {
          try {
            if (!err) {
              const resultObj = {
                email: result?.email,
                mobile: result?.mobile,
                studioName: result?.studioName,
                status: result?.status,
              };
              responderController({ result: resultObj, statusCode: 200 }, res);
            } else {
              responderController(
                {
                  result: {},
                  statusCode: 500,
                  errorMsg: errorMsg.registrationError,
                },
                res
              );
            }
          } catch (err) {
            responderController(
              {
                result: {},
                statusCode: 500,
                errorMsg: errorMsg.registrationError,
              },
              res
            );
          }
        });
      } catch (err) {
        responderController(
          { result: {}, statusCode: 500, errorMsg: errorMsg.registrationError },
          res
        );
      }
    }
  } catch (err) {
    const errMsg = typeof err === "string" ? err : errorMsg.registrationError;
    responderController({ result: {}, statusCode: 500, errorMsg: errMsg }, res);
  }
};
