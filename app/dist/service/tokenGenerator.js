"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = "7896-5630-7564-0809";
const tokenGenerator = (tokenObj) => {
    return new Promise((resolve) => {
        const token = jsonwebtoken_1.default.sign({
            userId: tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.userId,
            clientId: tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.clientId,
            customerType: tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.customerType,
            status: tokenObj === null || tokenObj === void 0 ? void 0 : tokenObj.status,
        }, exports.SECRET_KEY, { expiresIn: "7d" });
        resolve(token);
    });
};
exports.tokenGenerator = tokenGenerator;
