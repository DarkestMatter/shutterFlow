"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const decryptToken_1 = require("../common/decryptToken");
const addClientController_1 = require("../controller/client/addClientController");
const getClientListController_1 = require("../controller/client/getClientListController");
const responderController_1 = require("../controller/common/responderController");
const validateTokenController_1 = require("../controller/common/validateTokenController");
const loginController_1 = require("../controller/common/login/loginController");
const otpVerificationController_1 = require("../controller/common/login/otpVerificationController");
const registrationController_1 = require("../controller/common/login/registrationController");
exports.router = (0, express_1.Router)();
exports.router.post("/registerUser", (req, res, next) => {
    (0, registrationController_1.registrationController)(req, res, next);
});
exports.router.post("/otpVerify", (req, res, next) => {
    (0, otpVerificationController_1.otpVerificationController)(req, res, next);
});
exports.router.post("/loginUser", (req, res, next) => {
    (0, loginController_1.loginController)(req, res, next);
});
exports.router.post("/addClient", async (req, res, next) => {
    const authorised = (await (0, decryptToken_1.decryptToken)(req.header));
    (authorised === null || authorised === void 0 ? void 0 : authorised.email)
        ? (0, addClientController_1.addClientController)(req, res, next)
        : (0, responderController_1.responderController)({ result: {}, statusCode: 200, validToken: false }, res);
});
exports.router.post("/getClientList", async (req, res, next) => {
    const authorised = (await (0, decryptToken_1.decryptToken)(req.header));
    (authorised === null || authorised === void 0 ? void 0 : authorised.email)
        ? (0, getClientListController_1.getClientListController)(req, res, next)
        : (0, responderController_1.responderController)({ result: {}, statusCode: 200, validToken: false }, res);
});
exports.router.post("/validateToken", (req, res, next) => {
    (0, validateTokenController_1.validateTokenController)(req, res, next);
});
