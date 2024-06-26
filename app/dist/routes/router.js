"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const getClientEventDataController_1 = require("../controller/client/getClientEventDataController");
const updateFileLikedController_1 = require("../controller/client/updateFileLikedController");
const getLikedFileListController_1 = require("../controller/client/getLikedFileListController");
const getPrimaryEventController_1 = require("../controller/client/getPrimaryEventController");
const loginController_1 = require("../controller/common/login/loginController");
const otpVerificationController_1 = require("../controller/common/login/otpVerificationController");
const registrationController_1 = require("../controller/common/login/registrationController");
const responderController_1 = require("../controller/common/responderController");
const validateTokenController_1 = require("../controller/common/validateTokenController");
const addClientController_1 = require("../controller/user/addClientController");
const addEventController_1 = require("../controller/user/addEventController");
const deleteFileController_1 = require("../controller/user/deleteFileController");
const getClientListController_1 = require("../controller/user/getClientListController");
const getEventDataController_1 = require("../controller/user/getEventDataController");
const getLikedFileForUserController_1 = require("../controller/user/getLikedFileForUserController");
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
    console.log(auth);
    (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
        ? (0, addClientController_1.addClientController)(request, res, next)
        : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
});
exports.router.post("/getClientList", async (req, res, next) => {
    const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
    const request = {
        ...req.body,
        userId: auth === null || auth === void 0 ? void 0 : auth.userId,
    };
    (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
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
        console.log(auth === null || auth === void 0 ? void 0 : auth.status, enum_1.registrationStatus === null || enum_1.registrationStatus === void 0 ? void 0 : enum_1.registrationStatus.verified);
        (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === (enum_1.registrationStatus === null || enum_1.registrationStatus === void 0 ? void 0 : enum_1.registrationStatus.verified)
            ? (0, addEventController_1.addEventController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
exports.router.post("/getEventData", async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        const request = {
            ...req.body,
            userId: auth === null || auth === void 0 ? void 0 : auth.userId,
        };
        (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
            ? (0, getEventDataController_1.getEventDataController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
exports.router.post("/uploadFile", async (req, res, next) => {
    const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
    (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
        ? (0, uploadFileController_1.uploadFileController)(req, res, next, auth)
        : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
});
exports.router.post("/getLikedFilesUser", async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        const request = {
            ...req.body,
            userId: auth === null || auth === void 0 ? void 0 : auth.userId,
        };
        (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
            ? (0, getLikedFileForUserController_1.getLikedFileForUserController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
exports.router.post("/deleteFile", async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        const request = {
            ...req.body,
            userId: auth === null || auth === void 0 ? void 0 : auth.userId,
        };
        (auth === null || auth === void 0 ? void 0 : auth.userId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
            ? (0, deleteFileController_1.deleteFileController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
exports.router.post("/getPrimaryEvent", async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        const request = {
            ...req.body,
            clientId: auth === null || auth === void 0 ? void 0 : auth.clientId,
        };
        (auth === null || auth === void 0 ? void 0 : auth.clientId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
            ? (0, getPrimaryEventController_1.getPrimaryEventController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
exports.router.post("/getClientEventData", async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        const request = {
            ...req.body,
            clientId: auth === null || auth === void 0 ? void 0 : auth.clientId,
        };
        (auth === null || auth === void 0 ? void 0 : auth.clientId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
            ? (0, getClientEventDataController_1.getClientEventDataController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
exports.router.post("/fileLiked", async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        const request = {
            ...req.body,
            clientId: auth === null || auth === void 0 ? void 0 : auth.clientId,
        };
        (auth === null || auth === void 0 ? void 0 : auth.clientId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
            ? (0, updateFileLikedController_1.fileLikedController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
exports.router.post("/getLikedFiles", async (req, res, next) => {
    try {
        console.log("hey");
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        const request = {
            ...req.body,
            clientId: auth === null || auth === void 0 ? void 0 : auth.clientId,
        };
        (auth === null || auth === void 0 ? void 0 : auth.clientId) && (auth === null || auth === void 0 ? void 0 : auth.status) === enum_1.registrationStatus.verified
            ? (0, getLikedFileListController_1.getLikedFileListController)(request, res, next)
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, inValidToken: true }, res);
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});
