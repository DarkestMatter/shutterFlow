import { Router } from "express";
import { decryptToken } from "../common/decryptToken";
import { addClientController } from "../controller/user/addClientController";
import { getClientListController } from "../controller/user/getClientListController";
import { loginController } from "../controller/common/login/loginController";
import { otpVerificationController } from "../controller/common/login/otpVerificationController";
import { registrationController } from "../controller/common/login/registrationController";
import { responderController } from "../controller/common/responderController";
import { validateTokenController } from "../controller/common/validateTokenController";
import { IAuth } from "../interface/IAuth";

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
  auth?.userId
    ? addClientController(request, res, next)
    : responderController(
        { result: {}, statusCode: 200, inValidToken: false },
        res
      );
});

router.post("/getClientList", async (req, res, next) => {
  const auth = (await decryptToken(req.headers)) as unknown as IAuth;
  const request = {
    ...req.body,
    userId: auth?.userId,
    customerType: auth?.customerType,
  };
  auth?.userId
    ? getClientListController(request, res, next)
    : responderController(
        { result: {}, statusCode: 200, inValidToken: false },
        res
      );
});
