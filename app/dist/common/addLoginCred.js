"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLoginCred = void 0;
const uuid_1 = require("uuid");
const loginCredModel_1 = require("../model/loginCredModel");
const otpGenerator_1 = require("./otpGenerator");
const addLoginCred = async (userData) => {
    return new Promise((resolve, reject) => {
        var _a, _b, _c;
        const saveNewLoginCred = (0, loginCredModel_1.loginCredModel)();
        let new_model = {
            userId: `${(_a = userData === null || userData === void 0 ? void 0 : userData.studioName) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")}-${(0, uuid_1.v4)()}`,
            email: (_b = userData === null || userData === void 0 ? void 0 : userData.email) === null || _b === void 0 ? void 0 : _b.trim(),
            mobile: (_c = userData === null || userData === void 0 ? void 0 : userData.mobile) === null || _c === void 0 ? void 0 : _c.trim(),
            pwd: userData === null || userData === void 0 ? void 0 : userData.pwd,
            status: userData === null || userData === void 0 ? void 0 : userData.status,
            customerType: userData === null || userData === void 0 ? void 0 : userData.customerType,
            otp: (0, otpGenerator_1.otpGenerator)(),
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
