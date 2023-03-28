"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findValidLogin = void 0;
const loginCredModel_1 = require("../model/loginCredModel");
const enum_1 = require("./enum");
const findValidUser_1 = require("./findValidUser");
const findValidLogin = (email) => {
    return new Promise((resolve, reject) => {
        try {
            if (email) {
                (0, loginCredModel_1.loginCredModel)().findOne({ email: email }, { _id: 0 }, async (err, result) => {
                    if (!err) {
                        if (result === null || result === void 0 ? void 0 : result.email) {
                            const userData = (await (0, findValidUser_1.findValidUser)(result === null || result === void 0 ? void 0 : result.userId));
                            //@ts-ignore
                            resolve({ ...result._doc, pwd: result === null || result === void 0 ? void 0 : result.pwd });
                        }
                        else {
                            resolve(enum_1.errorMsg.incorrectUserEmail);
                        }
                    }
                    else {
                        reject(enum_1.errorMsg.noLoginCredFound);
                    }
                });
            }
        }
        catch (err) {
            reject(enum_1.errorMsg.loginError);
        }
    });
};
exports.findValidLogin = findValidLogin;
