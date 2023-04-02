"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findValidLogin = void 0;
const loginCredModel_1 = require("../model/loginCredModel");
const enum_1 = require("./enum");
const findValidLogin = (loginId) => {
    return new Promise((resolve, reject) => {
        try {
            if (loginId) {
                (0, loginCredModel_1.loginCredModel)().findOne({ $or: [{ email: loginId }, { mobile: loginId }] }, { _id: 0 }, async (err, result) => {
                    if (!err) {
                        if ((result === null || result === void 0 ? void 0 : result.email) || (result === null || result === void 0 ? void 0 : result.mobile)) {
                            //@ts-ignore
                            resolve({ ...result._doc, pwd: result === null || result === void 0 ? void 0 : result.pwd });
                        }
                        else {
                            resolve(enum_1.errorMsg.incorrectUserEmail);
                        }
                    }
                    else {
                        resolve(enum_1.errorMsg.noLoginCredFound);
                    }
                });
            }
            else {
                resolve(enum_1.errorMsg.noLoginCredFound);
            }
        }
        catch (err) {
            reject(enum_1.errorMsg.loginError);
        }
    });
};
exports.findValidLogin = findValidLogin;
