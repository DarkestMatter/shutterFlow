"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//@ts-ignore
const env_1 = require("../env");
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
