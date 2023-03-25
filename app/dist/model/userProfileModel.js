"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userProfileSchema = new mongoose_1.default.Schema({
    userId: String,
    email: String,
    studioName: String,
    mobile: String,
    pwd: String,
    status: String,
    customerType: String,
    createdDate: String,
    udpatedDate: String,
});
const userProfileModel = () => mongoose_1.default.model("t_user", userProfileSchema);
exports.userProfileModel = userProfileModel;
