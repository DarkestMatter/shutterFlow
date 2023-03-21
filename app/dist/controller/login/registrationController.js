"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationController = void 0;
const uuid_1 = require("uuid");
const otpGenerator_1 = require("../../common/otpGenerator");
const userProfileModel_1 = require("../../model/userProfileModel");
const findUserDataController_1 = require("../common/findUserDataController");
const responderController_1 = require("../common/responderController");
const registrationController = async (req, res, next) => {
    var _a;
    try {
        const userData = (await (0, findUserDataController_1.findUserDataController)((_a = req.body) === null || _a === void 0 ? void 0 : _a.email));
        if ((userData === null || userData === void 0 ? void 0 : userData.email) && (userData === null || userData === void 0 ? void 0 : userData.status) === "Verified" /* userStatus.verified */) {
            const resultObj = {
                result: userData,
                statusCode: 200,
                errorMsg: "User already exists, Please try Login" /* errorMsg.userExist */,
            };
            (0, responderController_1.responderController)(resultObj, res);
        }
        else if ((userData === null || userData === void 0 ? void 0 : userData.email) && (userData === null || userData === void 0 ? void 0 : userData.status) === "Registered" /* userStatus.registered */) {
            const resultObj = {
                result: userData,
                statusCode: 200,
                successMsg: "Enter OTP recieved on your email ID" /* successMsg.enterOtp */,
            };
            (0, responderController_1.responderController)(resultObj, res);
        }
        else if (!(userData === null || userData === void 0 ? void 0 : userData.email) && !(userData === null || userData === void 0 ? void 0 : userData.status)) {
            const saveUserRegistration = (0, userProfileModel_1.userProfileModel)();
            let new_model = {
                userId: (0, uuid_1.v4)(),
                email: req.body.email.trim(),
                mobile: req.body.mobile.trim(),
                studioName: req.body.studioName.trim(),
                pwd: req.body.pwd,
                status: "Registered" /* userStatus.registered */,
                otp: (0, otpGenerator_1.otpGenerator)(),
            };
            let obj = new saveUserRegistration(new_model);
            obj.save((err, result) => {
                try {
                    if (!err) {
                        const resultObj = {
                            userId: result === null || result === void 0 ? void 0 : result.userId,
                            email: result === null || result === void 0 ? void 0 : result.email,
                            mobile: result === null || result === void 0 ? void 0 : result.mobile,
                            studioName: result === null || result === void 0 ? void 0 : result.studioName,
                            status: result === null || result === void 0 ? void 0 : result.status,
                        };
                        (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
                    }
                    else {
                        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
                    }
                }
                catch (err) {
                    (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
                }
            });
        }
    }
    catch (err) {
        const errMsg = typeof err === "string" ? err : "Some Error occurred" /* errorMsg.serverError */;
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: errMsg }, res);
    }
};
exports.registrationController = registrationController;
