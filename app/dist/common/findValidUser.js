"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findValidUser = void 0;
const userProfileModel_1 = require("../model/userProfileModel");
const findValidUser = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            if (userId) {
                (0, userProfileModel_1.userProfileModel)().findOne({ userId: userId }, { _id: 0 }, (err, result) => {
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
exports.findValidUser = findValidUser;
