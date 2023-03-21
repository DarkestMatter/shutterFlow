"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const findUserDataController_1 = require("../common/findUserDataController");
const responderController_1 = require("../common/responderController");
const tokenGenerator_1 = require("../../common/tokenGenerator");
const loginController = async (req, res, next) => {
    var _a, _b;
    try {
        const userData = (await (0, findUserDataController_1.findUserDataController)((_a = req.body) === null || _a === void 0 ? void 0 : _a.email));
        if ((userData === null || userData === void 0 ? void 0 : userData.status) === "Registered" /* userStatus.registered */) {
            const resultObj = {
                userId: userData === null || userData === void 0 ? void 0 : userData.userId,
                email: userData === null || userData === void 0 ? void 0 : userData.email,
                mobile: userData === null || userData === void 0 ? void 0 : userData.mobile,
                studioName: userData === null || userData === void 0 ? void 0 : userData.studioName,
                status: userData === null || userData === void 0 ? void 0 : userData.status,
            };
            (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
        }
        else if ((userData === null || userData === void 0 ? void 0 : userData.pwd) === ((_b = req.body) === null || _b === void 0 ? void 0 : _b.pwd)) {
            const token = await (0, tokenGenerator_1.tokenGenerator)(req.body.email);
            const resultObj = {
                email: userData === null || userData === void 0 ? void 0 : userData.email,
                studioName: userData === null || userData === void 0 ? void 0 : userData.studioName,
                userId: userData === null || userData === void 0 ? void 0 : userData.userId,
                mobile: userData === null || userData === void 0 ? void 0 : userData.mobile,
                status: userData === null || userData === void 0 ? void 0 : userData.status,
                token: token,
            };
            (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
        }
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 401, errorMsg: "Please login again with proper Email" /* errorMsg.incorrectUserEmail */ }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
    }
};
exports.loginController = loginController;
