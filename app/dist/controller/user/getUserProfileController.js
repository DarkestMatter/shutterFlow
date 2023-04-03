"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileController = void 0;
const decryptToken_1 = require("../../service/decryptToken");
const enum_1 = require("../../service/enum");
const findValidUser_1 = require("../../service/findValidUser");
const responderController_1 = require("../common/responderController");
const getUserProfileController = async (req, res, next, auth) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        if ((auth === null || auth === void 0 ? void 0 : auth.userId) || (auth === null || auth === void 0 ? void 0 : auth.clientId)) {
            const userData = (await (0, findValidUser_1.findValidUser)(auth === null || auth === void 0 ? void 0 : auth.userId));
            const resultObj = {
                result: {
                    userId: userData === null || userData === void 0 ? void 0 : userData.userId,
                    email: userData === null || userData === void 0 ? void 0 : userData.email,
                    studioName: userData === null || userData === void 0 ? void 0 : userData.studioName,
                    mobile: userData === null || userData === void 0 ? void 0 : userData.mobile,
                    status: userData === null || userData === void 0 ? void 0 : userData.status,
                    customerType: auth === null || auth === void 0 ? void 0 : auth.customerType,
                },
                statusCode: 200,
            };
            userData
                ? (0, responderController_1.responderController)(resultObj, res)
                : (0, responderController_1.responderController)({
                    result: {},
                    statusCode: 200,
                    errorMsg: enum_1.errorMsg.incorrectUserEmail,
                }, res);
        }
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: enum_1.errorMsg.invalidToken }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: enum_1.errorMsg.serverError }, res);
    }
};
exports.getUserProfileController = getUserProfileController;
