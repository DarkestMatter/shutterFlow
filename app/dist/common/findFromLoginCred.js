"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFromLoginCred = void 0;
const loginCredModel_1 = require("../model/loginCredModel");
const findValidUser_1 = require("./findValidUser");
const findFromLoginCred = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            if (userId) {
                (0, loginCredModel_1.loginCredModel)().findOne({ userId: userId }, { _id: 0 }, async (err, result) => {
                    if (!err) {
                        if (result === null || result === void 0 ? void 0 : result.email) {
                            resolve(await (0, findValidUser_1.findUserByEmail)(userId));
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
exports.findFromLoginCred = findFromLoginCred;
