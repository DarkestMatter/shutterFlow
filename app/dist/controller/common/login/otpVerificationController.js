"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerificationController = void 0;
const tokenGenerator_1 = require("../../../common/tokenGenerator");
const loginCredModel_1 = require("../../../model/loginCredModel");
const userProfileModel_1 = require("../../../model/userProfileModel");
const responderController_1 = require("../responderController");
const otpVerificationController = (req, res, next) => {
    var _a;
    try {
        (0, userProfileModel_1.userProfileModel)().findOneAndUpdate({ email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email }, { status: "Verified" /* statusEnum.verified */ }, async (err, result) => {
            var _a;
            if (!err) {
                updateUserLoginCredStatus((_a = req.body) === null || _a === void 0 ? void 0 : _a.email);
                const token = await (0, tokenGenerator_1.tokenGenerator)(result === null || result === void 0 ? void 0 : result.userId, result === null || result === void 0 ? void 0 : result.customerType);
                const resultObj = {
                    email: result === null || result === void 0 ? void 0 : result.email,
                    status: "Verified" /* statusEnum.verified */,
                    studioName: result === null || result === void 0 ? void 0 : result.studioName,
                    mobile: result === null || result === void 0 ? void 0 : result.mobile,
                };
                (0, responderController_1.responderController)({ result: { ...resultObj, token: token }, statusCode: 200 }, res);
            }
            else {
                (0, responderController_1.responderController)({
                    result: {},
                    statusCode: 200,
                    errorMsg: "Please login again with proper Email" /* errorMsg.incorrectUserEmail */,
                }, res);
            }
        });
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
    }
};
exports.otpVerificationController = otpVerificationController;
const updateUserLoginCredStatus = (email) => {
    try {
        (0, loginCredModel_1.loginCredModel)().findOneAndUpdate({ email: email }, { status: "Verified" /* statusEnum.verified */ }, async (err, result) => {
            if (!err) {
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
