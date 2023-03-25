"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCredModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const loginCredSchema = new mongoose_1.default.Schema({
    email: String,
    mobile: String,
    pwd: String,
    userId: String,
    status: String,
    clientId: String,
    customerType: String,
    otp: String,
    createdDate: String,
    updatedDate: String,
});
const loginCredModel = () => mongoose_1.default.model("t_login_cred", loginCredSchema);
exports.loginCredModel = loginCredModel;
