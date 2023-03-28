"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpGenerator = void 0;
const otpGenerator = () => {
    return Math.floor(Math.floor(100000 + Math.random() * 900000));
};
exports.otpGenerator = otpGenerator;
