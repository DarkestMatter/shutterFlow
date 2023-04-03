"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findValidUser = void 0;
const userProfileModel_1 = require("../model/userProfileModel");
const enum_1 = require("./enum");
const findValidUser = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            if (userId) {
                (0, userProfileModel_1.userProfileModel)().findOne({ userId: userId }, { _id: 0 }, (err, result) => {
                    if (!err) {
                        console.log(result);
                        if (result === null || result === void 0 ? void 0 : result.email) {
                            resolve(result);
                        }
                        else {
                            resolve(enum_1.errorMsg.incorrectUserEmail);
                        }
                    }
                    else {
                        reject(enum_1.errorMsg.noValidUser);
                    }
                });
            }
        }
        catch (err) {
            reject(enum_1.errorMsg.userFoundError);
        }
    });
};
exports.findValidUser = findValidUser;
