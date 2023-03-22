"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findValidLogin = void 0;
const loginCredModel_1 = require("../model/loginCredModel");
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
exports.findValidLogin = findValidLogin;
