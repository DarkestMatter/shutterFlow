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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
//@ts-ignore
const env_1 = require("../env");
dotenv.config();
// const get_line_no = () => {
//   var obj = {};
//   Error.captureStackTrace(obj, get_line_no);
//   return obj.stack;
// };
const connect_db = () => {
    try {
        console.log(process.env.liveDBPwd);
        const uri = `mongodb+srv://${env_1.dbCred.liveDBUsername}:${env_1.dbCred === null || env_1.dbCred === void 0 ? void 0 : env_1.dbCred.liveDBPwd}@cluster0.hnvbjox.mongodb.net/${env_1.dbCred === null || env_1.dbCred === void 0 ? void 0 : env_1.dbCred.liveDBUsername}?retryWrites=true&w=majority`;
        mongoose_1.default.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.connect_db = connect_db;
