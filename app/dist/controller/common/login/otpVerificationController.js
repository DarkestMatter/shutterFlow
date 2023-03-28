"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerificationController = void 0;
const tokenGenerator_1 = require("../../../service/tokenGenerator");
const loginCredModel_1 = require("../../../model/loginCredModel");
const userProfileModel_1 = require("../../../model/userProfileModel");
const responderController_1 = require("../responderController");
const enum_1 = require("../../../service/enum");
const otpVerificationController = async (req, res, next) => {
    var _a, _b, _c;
    try {
        const isOtpValid = await validateOtp((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email, (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.otp);
        isOtpValid
            ? (0, userProfileModel_1.userProfileModel)().findOneAndUpdate({ email: (_c = req.body) === null || _c === void 0 ? void 0 : _c.email }, { status: enum_1.statusEnum.verified }, async (err, result) => {
                var _a;
                if (!err) {
                    await updateUserLoginCredStatus((_a = req.body) === null || _a === void 0 ? void 0 : _a.email);
                    const token = await (0, tokenGenerator_1.tokenGenerator)(result === null || result === void 0 ? void 0 : result.userId, result === null || result === void 0 ? void 0 : result.customerType, result === null || result === void 0 ? void 0 : result.status);
                    const resultObj = {
                        email: result === null || result === void 0 ? void 0 : result.email,
                        status: enum_1.statusEnum.verified,
                        studioName: result === null || result === void 0 ? void 0 : result.studioName,
                        mobile: result === null || result === void 0 ? void 0 : result.mobile,
                    };
                    (0, responderController_1.responderController)({ result: { ...resultObj, token: token }, statusCode: 200 }, res);
                }
                else {
                    (0, responderController_1.responderController)({
                        result: {},
                        statusCode: 200,
                        errorMsg: enum_1.errorMsg.incorrectUserEmail,
                    }, res);
                }
            })
            : (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: enum_1.errorMsg.incorrectOtp }, res);
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: enum_1.errorMsg.errorAtOtp }, res);
    }
};
exports.otpVerificationController = otpVerificationController;
const validateOtp = (email, otp) => {
    return new Promise((resolve, reject) => {
        (0, loginCredModel_1.loginCredModel)().findOne({ email: email }, (err, result) => {
            if (!err) {
                console.log(result === null || result === void 0 ? void 0 : result.otp, otp);
                (result === null || result === void 0 ? void 0 : result.otp) === otp
                    ? resolve(true)
                    : resolve(false);
            }
            else {
                reject(true);
            }
        });
    });
};
const updateUserLoginCredStatus = (email) => {
    return new Promise((resolve, reject) => {
        try {
            (0, loginCredModel_1.loginCredModel)().findOneAndUpdate({ email: email }, { status: enum_1.statusEnum.verified }, (err, result) => {
                if (!err) {
                    resolve(true);
                }
                else {
                    reject(true);
                }
            });
        }
        catch (err) {
            reject(true);
        }
    });
};
