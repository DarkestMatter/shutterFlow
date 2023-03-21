"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenController = exports.decryptToken = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const findUserDataController_1 = require("../controller/common/findUserDataController");
const responderController_1 = require("../controller/common/responderController");
exports.SECRET_KEY = "7896-5630-7564-0809";
const decryptToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jsonwebtoken_1.default.verify(token.authorisation, exports.SECRET_KEY, function (err, decoded) {
                if (!err) {
                    resolve(decoded);
                }
                else {
                    resolve("Some Error occurred" /* errorMsg.serverError */);
                }
            });
        }
        catch (err) {
            reject("Please login again with proper Email" /* errorMsg.incorrectUserEmail */);
        }
    });
};
exports.decryptToken = decryptToken;
const validateTokenController = async (req, res, next) => {
    try {
        const auth = (await (0, exports.decryptToken)(req.headers));
        if (auth === null || auth === void 0 ? void 0 : auth.email) {
            const userData = await (0, findUserDataController_1.findUserDataController)(auth === null || auth === void 0 ? void 0 : auth.email);
            userData
                ? (0, responderController_1.responderController)({ result: userData, statusCode: 200 }, res)
                : (0, responderController_1.responderController)({
                    result: {},
                    statusCode: 200,
                    errorMsg: "Please login again with proper Email" /* errorMsg.incorrectUserEmail */,
                }, res);
        }
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: "Token is invalid, Please Login again" /* errorMsg.invalidToken */ }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
    }
};
exports.validateTokenController = validateTokenController;
