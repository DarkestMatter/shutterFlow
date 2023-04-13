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
exports.deleteFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv = __importStar(require("dotenv"));
const enum_1 = require("./enum");
dotenv.config();
const s3 = new client_s3_1.S3Client({
    credentials: {
        secretAccessKey: process.env.iDriveSecretAccessKey
            ? process.env.iDriveSecretAccessKey
            : "",
        accessKeyId: process.env.iDriveAccessKeyId
            ? process.env.iDriveAccessKeyId
            : "",
    },
    endpoint: process.env.iDriveEndpoint,
    region: process.env.iDriveRegion,
});
const deleteFile = (req) => {
    return new Promise(async (resolve, reject) => {
        var _a, _b, _c;
        try {
            const minFileKeyArr = (_a = req === null || req === void 0 ? void 0 : req.eventFileList) === null || _a === void 0 ? void 0 : _a.map((file) => {
                var _a;
                return {
                    Key: (_a = file === null || file === void 0 ? void 0 : file.minFilePath) === null || _a === void 0 ? void 0 : _a.split(enum_1.iDriveData.baseUrl).pop(),
                };
            });
            const originalFileKeyArr = (_b = req === null || req === void 0 ? void 0 : req.eventFileList) === null || _b === void 0 ? void 0 : _b.map((file) => {
                var _a, _b;
                return {
                    Key: (_b = (_a = file === null || file === void 0 ? void 0 : file.minFilePath) === null || _a === void 0 ? void 0 : _a.split(enum_1.iDriveData.baseUrl).pop()) === null || _b === void 0 ? void 0 : _b.replace("/min", ""),
                };
            });
            const deleteInput = {
                Bucket: enum_1.iDriveData.bucket,
                Delete: {
                    Objects: minFileKeyArr === null || minFileKeyArr === void 0 ? void 0 : minFileKeyArr.concat(originalFileKeyArr),
                    Quiet: false,
                },
            };
            const command = new client_s3_1.DeleteObjectsCommand(deleteInput);
            const response = await s3.send(command);
            if (((_c = response === null || response === void 0 ? void 0 : response.Deleted) === null || _c === void 0 ? void 0 : _c.length) !== 0) {
                resolve(response === null || response === void 0 ? void 0 : response.Deleted);
            }
            else {
                reject(true);
            }
        }
        catch (err) {
            reject(true);
        }
    });
};
exports.deleteFile = deleteFile;
