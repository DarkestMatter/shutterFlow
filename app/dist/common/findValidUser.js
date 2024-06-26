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
                            resolve(errorMsg.incorrectUserEmail);
                        }
                    }
                    else {
                        reject(errorMsg.noValidUser);
                    }
                });
            }
        }
        catch (err) {
            reject(errorMsg.userFoundError);
        }
    });
};
exports.findValidUser = findValidUser;
