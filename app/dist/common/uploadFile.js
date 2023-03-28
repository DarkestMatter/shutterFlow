"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const uuid_1 = require("uuid");
const enum_1 = require("./enum");
const s3 = new client_s3_1.S3Client({
    credentials: {
        secretAccessKey: "dDk6JCcRWmmHdOm9RCt6wYuAheA1TyrvLvmoKdZw",
        accessKeyId: "5XkxLdSVFLfL3bfFnsEy",
    },
    endpoint: "https:i1h6.ldn.idrivee2-18.com",
    region: "gb-ldn",
});
const uploadFile = async (req, res, next, fileData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bucketParams = {
                Bucket: "shutter-flow",
                Delimiter: "/",
            };
            const data = await s3.send(new client_s3_1.ListObjectsCommand(bucketParams));
            const storage = (0, multer_s3_1.default)({
                s3: s3,
                acl: "public-read",
                bucket: "shutter-flow",
                key: function (req, file, cb) {
                    const fullPath = `sattasaphire-gmail.com_Satish/${(0, uuid_1.v4)()}.jpg`;
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
                        resolve({ errorMsg: "Only .png, .jpg and .jpeg format allowed!" });
                        return cb(new Error());
                    }
                },
            }).single("myImage");
            upload(req, res, (err) => {
                var _a, _b;
                if (!err) {
                    if (((_a = res === null || res === void 0 ? void 0 : res.req) === null || _a === void 0 ? void 0 : _a.file) && (req === null || req === void 0 ? void 0 : req.file)) {
                        resolve((_b = res === null || res === void 0 ? void 0 : res.req) === null || _b === void 0 ? void 0 : _b.file);
                    }
                }
                else {
                    console.log("upload file err", err);
                }
            });
        }
        catch (err) {
            resolve(err);
        }
    });
};
exports.uploadFile = uploadFile;
