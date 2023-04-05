"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationController = void 0;
const addLoginCred_1 = require("../../../service/addLoginCred");
const findValidLogin_1 = require("../../../service/findValidLogin");
const userProfileModel_1 = require("../../../model/userProfileModel");
const responderController_1 = require("../responderController");
const enum_1 = require("../../../service/enum");
const registrationController = async (req, res, next) => {
    var _a, _b;
    try {
        const userData = (await (0, findValidLogin_1.findValidLogin)((_a = req.body) === null || _a === void 0 ? void 0 : _a.email));
        if ((userData === null || userData === void 0 ? void 0 : userData.email) && (userData === null || userData === void 0 ? void 0 : userData.status) === enum_1.registrationStatus.verified) {
            const resultObj = {
                result: userData,
                statusCode: 200,
                errorMsg: enum_1.errorMsg.userExist,
            };
            (0, responderController_1.responderController)(resultObj, res);
        }
        else if ((userData === null || userData === void 0 ? void 0 : userData.email) &&
            (userData === null || userData === void 0 ? void 0 : userData.status) === enum_1.registrationStatus.registered) {
            const resultObj = {
                result: userData,
                statusCode: 200,
                successMsg: enum_1.successMsg.enterOtp,
            };
            (0, responderController_1.responderController)(resultObj, res);
        }
        else {
            try {
                const newUserData = {
                    ...req.body,
                    status: enum_1.registrationStatus.registered,
                    customerType: enum_1.customerType.user,
                };
                const loginCreated = (await (0, addLoginCred_1.addLoginCred)(newUserData));
                const saveUserRegistration = (0, userProfileModel_1.userProfileModel)();
                const new_model = {
                    userId: loginCreated === null || loginCreated === void 0 ? void 0 : loginCreated.userId,
                    email: loginCreated === null || loginCreated === void 0 ? void 0 : loginCreated.email,
                    mobile: loginCreated === null || loginCreated === void 0 ? void 0 : loginCreated.mobile,
                    studioName: (_b = req.body) === null || _b === void 0 ? void 0 : _b.studioName,
                    status: enum_1.registrationStatus.registered,
                    createdDate: new Date(),
                    udpatedDate: new Date(),
                };
                let obj = new saveUserRegistration(new_model);
                obj.save((err, result) => {
                    try {
                        if (!err) {
                            const resultObj = {
                                email: result === null || result === void 0 ? void 0 : result.email,
                                mobile: result === null || result === void 0 ? void 0 : result.mobile,
                                studioName: result === null || result === void 0 ? void 0 : result.studioName,
                                status: result === null || result === void 0 ? void 0 : result.status,
                            };
                            (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
                        }
                        else {
                            console.log(err);
                            (0, responderController_1.responderController)({
                                result: {},
                                statusCode: 500,
                                errorMsg: enum_1.errorMsg.registrationError,
                            }, res);
                        }
                    }
                    catch (err) {
                        (0, responderController_1.responderController)({
                            result: {},
                            statusCode: 500,
                            errorMsg: enum_1.errorMsg.registrationError,
                        }, res);
                    }
                });
            }
            catch (err) {
                (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.registrationError }, res);
            }
        }
    }
    catch (err) {
        const errMsg = typeof err === "string" ? err : enum_1.errorMsg.registrationError;
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: errMsg }, res);
    }
};
exports.registrationController = registrationController;
