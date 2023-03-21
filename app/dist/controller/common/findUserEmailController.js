"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserDataController = void 0;
const userProfileModel_1 = require("../../model/userProfileModel");
const findUserDataController = (req, res, next) => {
    try {
        return new Promise((resolve, reject) => {
            (0, userProfileModel_1.userProfileModel)().findOne({ email: req.body.email }, (err, result) => {
                if (!err) {
                    result.email ? resolve(result) : resolve(false);
                }
                else {
                    reject("Some Error occurred" /* errorMsg.serverError */);
                }
            });
        });
    }
    catch (err) {
        res.status(500).json("Some Error occurred" /* errorMsg.serverError */);
    }
};
exports.findUserDataController = findUserDataController;
