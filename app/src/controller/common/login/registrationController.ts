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
  registrationStatus,
  successMsg,
} from "../../../service/enum";
import { loginMail } from "../../../service/mail/loginMail";

export const registrationController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userData = (await findValidLogin(
      req.body?.email
    )) as unknown as ILoginCred;
    if (userData?.email && userData?.status === registrationStatus.verified) {
      delete userData.otp;
      const resultObj: IResponderResult = {
        result: userData,
        statusCode: 200,
        errorMsg: errorMsg.userExist,
      };
      responderController(resultObj, res);
    } else if (
      userData?.email &&
      userData?.status === registrationStatus.registered
    ) {
      delete userData.otp;
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
          status: registrationStatus.registered,
          customerType: customerType.user,
        };

        const loginCreated = (await addLoginCred(
          newUserData
        )) as unknown as ILoginCred;

        const saveUserRegistration = userProfileModel();
        const new_model: IUserProfile = {
          userId: loginCreated?.userId,
          email: loginCreated?.email,
          mobile: loginCreated?.mobile,
          studioName: req.body?.studioName,
          status: registrationStatus.registered,
          createdDate: new Date() as unknown as String,
          udpatedDate: new Date() as unknown as String,
        };
        let obj = new saveUserRegistration(new_model);
        obj.save(async (err, result) => {
          try {
            const mailResponse = await loginMail(loginCreated);
            if (!err && mailResponse) {
              const resultObj = {
                email: result?.email,
                mobile: result?.mobile,
                studioName: result?.studioName,
                status: result?.status,
              };
              responderController({ result: resultObj, statusCode: 200 }, res);
            } else {
              console.log(err);
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
