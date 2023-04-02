"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenController = void 0;
const decryptToken_1 = require("../../service/decryptToken");
const responderController_1 = require("./responderController");
const enum_1 = require("../../service/enum");
const getUserProfileController_1 = require("../user/getUserProfileController");
const validateTokenController = async (req, res, next) => {
    try {
        const auth = (await (0, decryptToken_1.decryptToken)(req.headers));
        if (auth === null || auth === void 0 ? void 0 : auth.userId) {
            (0, getUserProfileController_1.getUserProfileController)(req, res, next);
        }
        else if (auth === null || auth === void 0 ? void 0 : auth.clientId) {
            (0, responderController_1.responderController)({ result: auth, statusCode: 200 }, res);
        }
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: enum_1.errorMsg.invalidToken }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: enum_1.errorMsg.serverError }, res);
    }
};
exports.validateTokenController = validateTokenController;
