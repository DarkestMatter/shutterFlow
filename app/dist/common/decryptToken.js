"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptToken = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
