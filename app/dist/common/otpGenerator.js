"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpGenerator = void 0;
const otpGenerator = () => {
    return Math.floor(Math.random() * 6);
};
exports.otpGenerator = otpGenerator;
