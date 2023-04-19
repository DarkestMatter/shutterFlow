"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMail = void 0;
const dotenv = __importStar(require("dotenv"));
const nodemailer = __importStar(require("nodemailer"));
dotenv.config();
const loginMail = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.zoho.in",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.mailId,
                    pass: process.env.mailPwd,
                },
            });
            const receiverMail = (userData === null || userData === void 0 ? void 0 : userData.email) ? userData === null || userData === void 0 ? void 0 : userData.email : undefined;
            const info = await transporter.sendMail({
                from: `"ShutterFlow.in" <${process.env.mailId}>`,
                to: receiverMail,
                subject: "Use this OTP to Login to shutterFlow.in",
                html: `Dear Customer <br><br>Your OTP is ${userData === null || userData === void 0 ? void 0 : userData.otp}. <br>We thank you for choosing shutterFlow.in as your Digital Photo sharing ecosystem. <br><br>Best Regards <br>shutterFlow.in <br><br><br><br>--This is a system generated mail--`,
                text: "",
            });
            (info === null || info === void 0 ? void 0 : info.accepted.length) !== 0 ? resolve(true) : resolve(false);
        }
        catch (err) {
            resolve(false);
        }
    });
};
exports.loginMail = loginMail;
