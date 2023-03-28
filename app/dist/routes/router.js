"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const loginController_1 = require("../controller/common/login/loginController");
const otpVerificationController_1 = require("../controller/common/login/otpVerificationController");
const registrationController_1 = require("../controller/common/login/registrationController");
const responderController_1 = require("../controller/common/responderController");
const validateTokenController_1 = require("../controller/common/validateTokenController");
const addClientController_1 = require("../controller/user/addClientController");
const addEventController_1 = require("../controller/user/addEventController");
const getClientListController_1 = require("../controller/user/getClientListController");
const uploadFileController_1 = require("../controller/user/uploadFileController");
const decryptToken_1 = require("../service/decryptToken");
const enum_1 = require("../service/enum");
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
exports.router.post("/validateToken", async (req, res, next) => {
    (0, validateTokenController_1.validateTokenController)(req, res, next);
});
exports.router.post("/addClient", async (req, res, next) => {
    const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
    const request = {
        ...req.body,
        userId: auth === null || auth === void 0 ? void 0 : auth.userId,
        customerType: auth === null || auth === void 0 ? void 0 : auth.customerType,
    };
    (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.statusEnum.verified
        ? (0, addClientController_1.addClientController)(request, res, next)
        : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
});
exports.router.post("/getClientList", async (req, res, next) => {
    const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
    const request = {
        ...req.body,
        userId: auth === null || auth === void 0 ? void 0 : auth.userId,
    };
    (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.statusEnum.verified
        ? (0, getClientListController_1.getClientListController)(request, res, next)
        : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
});
exports.router.post("/addEvent", async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        const request = {
            ...req.body,
            userId: auth === null || auth === void 0 ? void 0 : auth.userId,
        };
        console.log(auth === null || auth === void 0 ? void 0 : auth.status, enum_1.statusEnum === null || enum_1.statusEnum === void 0 ? void 0 : enum_1.statusEnum.verified);
        (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === (enum_1.statusEnum === null || enum_1.statusEnum === void 0 ? void 0 : enum_1.statusEnum.verified)
            ? (0, addEventController_1.addEventController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
exports.router.post("/getEventData", async (req, res, next) => {
    const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
    const request = {
        ...req.body,
        userId: auth === null || auth === void 0 ? void 0 : auth.userId,
    };
    (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.statusEnum.verified
        ? (0, addEventController_1.addEventController)(request, res, next)
        : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
});
exports.router.post("/uploadFile", async (req, res, next) => {
    const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
    (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.statusEnum.verified
        ? (0, uploadFileController_1.uploadFileController)(req, res, next, auth)
        : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
});
