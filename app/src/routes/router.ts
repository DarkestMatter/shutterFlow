import { Router } from "express";
import { loginController } from "../controller/common/login/loginController";
import { otpVerificationController } from "../controller/common/login/otpVerificationController";
import { registrationController } from "../controller/common/login/registrationController";
import { responderController } from "../controller/common/responderController";
import { validateTokenController } from "../controller/common/validateTokenController";
import { addClientController } from "../controller/user/addClientController";
import { addEventController } from "../controller/user/addEventController";
import { getClientListController } from "../controller/user/getClientListController";
import { uploadFileController } from "../controller/user/uploadFileController";
import { IAuth } from "../interface/IAuth";
import { decryptToken } from "../service/decryptToken";
import { statusEnum } from "../service/enum";

export const router = Router();

router.post("/registerUser", (req, res, next) => {
  registrationController(req, res, next);
});

router.post("/otpVerify", (req, res, next) => {
  otpVerificationController(req, res, next);
});

router.post("/loginUser", (req, res, next) => {
  loginController(req, res, next);
});

router.post("/validateToken", async (req, res, next) => {
  validateTokenController(req, res, next);
});

router.post("/addClient", async (req, res, next) => {
  const auth = (await decryptToken(req.headers)) as unknown as IAuth;
  const request = {
    ...req.body,
    userId: auth?.userId,
    customerType: auth?.customerType,
  };
  auth?.userId && auth?.status === statusEnum.verified
    ? addClientController(request, res, next)
    : responderController(
        { result: {}, statusCode: 200, inValidToken: true },
        res
      );
});

router.post("/getClientList", async (req, res, next) => {
  const auth = (await decryptToken(req.headers)) as unknown as IAuth;
  const request = {
    ...req.body,
    userId: auth?.userId,
  };
  auth?.userId && auth?.status === statusEnum.verified
    ? getClientListController(request, res, next)
    : responderController(
        { result: {}, statusCode: 200, inValidToken: true },
        res
      );
});

router.post("/addEvent", async (req, res, next) => {
  try {
    const auth = (await decryptToken(req.headers)) as unknown as IAuth;
    const request = {
      ...req.body,
      userId: auth?.userId,
    };
    console.log(auth?.status, statusEnum?.verified);
    auth?.userId && auth?.status === statusEnum?.verified
      ? addEventController(request, res, next)
      : responderController(
          { result: {}, statusCode: 200, inValidToken: true },
          res
        );
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post("/getEventData", async (req, res, next) => {
  const auth = (await decryptToken(req.headers)) as unknown as IAuth;
  const request = {
    ...req.body,
    userId: auth?.userId,
  };
  auth?.userId && auth?.status === statusEnum.verified
    ? addEventController(request, res, next)
    : responderController(
        { result: {}, statusCode: 200, inValidToken: true },
        res
      );
});

router.post("/uploadFile", async (req, res, next) => {
  const auth = (await decryptToken(req.headers)) as unknown as IAuth;
  auth?.userId && auth?.status === statusEnum.verified
    ? uploadFileController(req, res, next, auth)
    : responderController(
        { result: {}, statusCode: 200, inValidToken: true },
        res
      );
});
