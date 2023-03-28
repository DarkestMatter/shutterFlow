"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptToken = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enum_1 = require("./enum");
exports.SECRET_KEY = "7896-5630-7564-0809";
const decryptToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jsonwebtoken_1.default.verify(token.authorisation, exports.SECRET_KEY, function (err, decoded) {
                if (!err) {
                    resolve(decoded);
                }
                else {
                    resolve(enum_1.errorMsg.invalidToken);
                }
            });
        }
        catch (err) {
            reject(enum_1.errorMsg.invalidToken);
        }
    });
};
exports.decryptToken = decryptToken;
