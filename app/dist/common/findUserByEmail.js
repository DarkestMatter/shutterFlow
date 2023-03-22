"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const userProfileModel_1 = require("../model/userProfileModel");
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            if (email) {
                (0, userProfileModel_1.userProfileModel)().findOne({ email: email }, { _id: 0 }, (err, result) => {
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
exports.findUserByEmail = findUserByEmail;
