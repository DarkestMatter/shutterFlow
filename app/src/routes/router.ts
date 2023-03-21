import { Router } from "express";
import { decryptToken } from "../common/decryptToken";
import { addClientController } from "../controller/client/addClientController";
import { getClientListController } from "../controller/client/getClientListController";
import { findUserDataController } from "../controller/common/findUserDataController";
import { responderController } from "../controller/common/responderController";
import { validateTokenController } from "../controller/common/validateTokenController";
import { loginController } from "../controller/common/login/loginController";
import { otpVerificationController } from "../controller/common/login/otpVerificationController";
import { registrationController } from "../controller/common/login/registrationController";
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

router.post("/addClient", async (req, res, next) => {
  const authorised = (await decryptToken(req.header)) as unknown as IAuth;
  authorised?.email
    ? addClientController(req, res, next)
    : responderController(
        { result: {}, statusCode: 200, validToken: false },
        res
      );
});

router.post("/getClientList", async (req, res, next) => {
  const authorised = (await decryptToken(req.header)) as unknown as IAuth;
  authorised?.email
    ? getClientListController(req, res, next)
    : responderController(
        { result: {}, statusCode: 200, validToken: false },
        res
      );
});

router.post("/validateToken", (req, res, next) => {
  validateTokenController(req, res, next);
});
