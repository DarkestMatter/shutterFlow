"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLoginCred = void 0;
const uuid_1 = require("uuid");
const loginCredModel_1 = require("../model/loginCredModel");
const addLoginCred = async (userData) => {
    return new Promise((resolve, reject) => {
        var _a, _b;
        const saveNewLoginCred = (0, loginCredModel_1.loginCredModel)();
        let new_model = {
            userId: (0, uuid_1.v4)(),
            email: (_a = userData === null || userData === void 0 ? void 0 : userData.email) === null || _a === void 0 ? void 0 : _a.trim(),
            mobile: (_b = userData === null || userData === void 0 ? void 0 : userData.mobile) === null || _b === void 0 ? void 0 : _b.trim(),
            pwd: userData === null || userData === void 0 ? void 0 : userData.pwd,
            status: userData === null || userData === void 0 ? void 0 : userData.status,
            customerType: userData === null || userData === void 0 ? void 0 : userData.customerType,
            otp: userData.otp,
            createdDate: new Date(),
            updatedDate: new Date(),
        };
        let obj = new saveNewLoginCred(new_model);
        obj.save((err, result) => {
            try {
                if (!err) {
                    const resultObj = {
                        userId: result === null || result === void 0 ? void 0 : result.userId,
                        email: result === null || result === void 0 ? void 0 : result.email,
                        mobile: result === null || result === void 0 ? void 0 : result.mobile,
                        status: result === null || result === void 0 ? void 0 : result.status,
                        customerType: result === null || result === void 0 ? void 0 : result.customerType,
                        updatedDate: result === null || result === void 0 ? void 0 : result.updatedDate,
                    };
                    resolve(resultObj);
                }
                else {
                    reject({ errorMsg: "Some Error occurred" /* errorMsg.serverError */ });
                }
            }
            catch (err) {
                reject({ errorMsg: "Some Error occurred" /* errorMsg.serverError */ });
            }
        });
    });
};
exports.addLoginCred = addLoginCred;
