"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerificationController = void 0;
const userProfileModel_1 = require("../../model/userProfileModel");
const responderController_1 = require("../common/responderController");
const tokenGenerator_1 = require("../../common/tokenGenerator");
const otpVerificationController = (req, res, next) => {
    var _a;
    try {
        (0, userProfileModel_1.userProfileModel)().findOne({ email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email }, async (err, result) => {
            var _a, _b;
            if (!err) {
                if ((result === null || result === void 0 ? void 0 : result.otp) === Math.round((_a = req.body) === null || _a === void 0 ? void 0 : _a.otp)) {
                    (0, userProfileModel_1.userProfileModel)().findOneAndUpdate({ email: (_b = req.body) === null || _b === void 0 ? void 0 : _b.email }, { status: "Verified" /* userStatus.verified */ }, async (err, result) => {
                        if (!err) {
                            const resultObj = {
                                userId: result === null || result === void 0 ? void 0 : result.userId,
                                email: result === null || result === void 0 ? void 0 : result.email,
                                mobile: result === null || result === void 0 ? void 0 : result.mobile,
                                studioName: result === null || result === void 0 ? void 0 : result.studioName,
                                status: result === null || result === void 0 ? void 0 : result.status,
                            };
                            const token = await (0, tokenGenerator_1.tokenGenerator)(req.body.email);
                            (0, responderController_1.responderController)({ result: { token: token }, statusCode: 200 }, res);
                        }
                        else {
                            (0, responderController_1.responderController)({
                                result: {},
                                statusCode: 200,
                                errorMsg: "Some Error occurred" /* errorMsg.serverError */,
                            }, res);
                        }
                    });
                }
                else {
                    (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: "enter correct otp" /* errorMsg.incorrectOtp */ }, res);
                }
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
