"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImageUpload = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const sharp_1 = __importDefault(require("sharp"));
//@ts-ignore
const env_1 = require("../../env");
const enum_1 = require("./enum");
const s3 = new client_s3_1.S3Client({
    credentials: {
        secretAccessKey: env_1.iDriveCred.iDriveSecretAccessKey,
        accessKeyId: env_1.iDriveCred.iDriveAccessKeyId,
    },
    endpoint: env_1.iDriveCred.iDriveEndpoint,
    region: env_1.iDriveCred.iDriveRegion,
});
const compressImageUpload = async (req, res, next, fileData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bucketParams = {
                Bucket: enum_1.iDriveData.bucket,
                Delimiter: "/",
            };
            const data = await s3.send(new client_s3_1.ListObjectsCommand(bucketParams));
            const storage = (0, multer_s3_1.default)({
                s3: s3,
                acl: enum_1.iDriveData.acl,
                bucket: enum_1.iDriveData.bucket,
                contentType(req, file, callback) {
                    const mime = "application/octet-stream";
                    const outStream = (0, sharp_1.default)().webp({ quality: 30 });
                    file.stream.pipe(outStream);
                    callback(null, mime, outStream);
                },
                key: function (req, file, cb) {
                    const fullPath = `${fileData === null || fileData === void 0 ? void 0 : fileData.minFilePath}.jpg`;
                    console.log(fullPath);
                    cb(null, fullPath);
                },
            });
            const upload = (0, multer_1.default)({
                storage: storage,
                limits: { fileSize: 100000000 },
                fileFilter: (req, file, cb) => {
                    //@ts-ignore
                    if (Object.values(enum_1.uploadImgFormat).includes(file.mimetype)) {
                        cb(null, true);
                    }
                    else {
                        cb(null, false);
                        resolve({ errorMsg: enum_1.errorMsg.incorrectUploadFormat });
                        return cb(new Error());
                    }
                },
            }).single("myImage");
            upload(req, res, async (err) => {
                var _a, _b, _c;
                console.log("onside compress");
                if (!err) {
                    if (((_a = res === null || res === void 0 ? void 0 : res.req) === null || _a === void 0 ? void 0 : _a.file) && (req === null || req === void 0 ? void 0 : req.file)) {
                        console.log((_b = res === null || res === void 0 ? void 0 : res.req) === null || _b === void 0 ? void 0 : _b.file);
                        resolve((_c = res === null || res === void 0 ? void 0 : res.req) === null || _c === void 0 ? void 0 : _c.file);
                    }
                }
                else {
                    console.log(err);
                    reject(err);
                }
            });
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
exports.compressImageUpload = compressImageUpload;
