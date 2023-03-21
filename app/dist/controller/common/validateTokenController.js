"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenController = void 0;
const decryptToken_1 = require("../../common/decryptToken");
const findUserDataController_1 = require("./findUserDataController");
const responderController_1 = require("./responderController");
const validateTokenController = async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        if (auth === null || auth === void 0 ? void 0 : auth.email) {
            const userData = (await (0, findUserDataController_1.findUserDataController)(auth === null || auth === void 0 ? void 0 : auth.email));
            const resultObj = {
                result: {
                    userId: userData === null || userData === void 0 ? void 0 : userData.userId,
                    email: userData === null || userData === void 0 ? void 0 : userData.email,
                    studioName: userData === null || userData === void 0 ? void 0 : userData.studioName,
                    mobile: userData === null || userData === void 0 ? void 0 : userData.mobile,
                    status: userData === null || userData === void 0 ? void 0 : userData.status,
                },
                statusCode: 200,
            };
            userData
                ? (0, responderController_1.responderController)(resultObj, res)
                : (0, responderController_1.responderController)({
                    result: {},
                    statusCode: 200,
                    errorMsg: "Please login again with proper Email" /* errorMsg.incorrectUserEmail */,
                }, res);
        }
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: "Token is invalid, Please Login again" /* errorMsg.invalidToken */ }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
    }
};
exports.validateTokenController = validateTokenController;
