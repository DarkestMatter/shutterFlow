"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserFromLoginCred = void 0;
const loginCredModel_1 = require("../model/loginCredModel");
const findUserFromLoginCred = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            if (userId) {
                (0, loginCredModel_1.loginCredModel)().findOne({ userId: userId }, { _id: 0 }, (err, result) => {
                    if (!err) {
                        if (result === null || result === void 0 ? void 0 : result.email) {
                            resolve(result);
                        }
                        else {
                            resolve("Please login again with proper Email" /* errorMsg.incorrectUserEmail */);
                        }
                    }
                    else {
                        reject("Some Error occurred" /* errorMsg.serverError */);
                    }
                });
            }
        }
        catch (err) {
            reject("Some Error occurred" /* errorMsg.serverError */);
        }
    });
};
exports.findUserFromLoginCred = findUserFromLoginCred;
