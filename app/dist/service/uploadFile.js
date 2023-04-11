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
exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const buffer_image_size_1 = __importDefault(require("buffer-image-size"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const enum_1 = require("./enum");
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
const uploadFile = async (req, res, next, fileData) => {
    return new Promise(async (resolve, reject) => {
        let imgDimType;
        try {
            const fileRespnseObj = {};
            const upload = (0, multer_1.default)({
                storage: multer_1.default.memoryStorage(),
                limits: { fileSize: 100000000 },
                fileFilter: async (req, file, cb) => {
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
            });
            upload.single("myImage")(req, res, async (err) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                const fileType = (_a = res.req.file) === null || _a === void 0 ? void 0 : _a.mimetype.split("/")[1];
                if (!err) {
                    if (((_b = res === null || res === void 0 ? void 0 : res.req) === null || _b === void 0 ? void 0 : _b.file) && (req === null || req === void 0 ? void 0 : req.file)) {
                        try {
                            fileRespnseObj.fileType = fileType;
                            fileRespnseObj.eventId = (_c = req.body) === null || _c === void 0 ? void 0 : _c.eventId;
                            fileRespnseObj.clientId = (_d = req.body) === null || _d === void 0 ? void 0 : _d.clientId;
                            fileRespnseObj.mimetype = (_e = res.req.file) === null || _e === void 0 ? void 0 : _e.mimetype;
                            fileRespnseObj.name = (_f = res.req.file) === null || _f === void 0 ? void 0 : _f.originalname;
                            fileRespnseObj.originalFileSize = (_g = req === null || req === void 0 ? void 0 : req.file) === null || _g === void 0 ? void 0 : _g.size;
                            if ((_h = req === null || req === void 0 ? void 0 : req.file) === null || _h === void 0 ? void 0 : _h.mimetype.startsWith("image")) {
                                //calculating img dim
                                const dimensions = (0, buffer_image_size_1.default)((_j = req === null || req === void 0 ? void 0 : req.file) === null || _j === void 0 ? void 0 : _j.buffer);
                                if (dimensions.height > dimensions.width) {
                                    imgDimType = enum_1.imgDimensionType.portrait;
                                }
                                else {
                                    imgDimType = enum_1.imgDimensionType.landscape;
                                }
                                const compressImageUpload = new lib_storage_1.Upload({
                                    client: s3,
                                    queueSize: 4,
                                    leavePartsOnError: false,
                                    params: {
                                        Bucket: enum_1.iDriveData.bucket,
                                        Key: `${fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId}/min/${fileData === null || fileData === void 0 ? void 0 : fileData.fileId}.${fileType}`,
                                        ContentType: (_k = req === null || req === void 0 ? void 0 : req.file) === null || _k === void 0 ? void 0 : _k.mimetype,
                                        ACL: "public-read",
                                        Body: (0, sharp_1.default)((_l = req.file) === null || _l === void 0 ? void 0 : _l.buffer).webp({ quality: 35 }),
                                    },
                                });
                                compressImageUpload.on("httpUploadProgress", (progress) => {
                                    fileRespnseObj.minFileSize = progress === null || progress === void 0 ? void 0 : progress.loaded;
                                    fileRespnseObj.imgDimensionType = imgDimType;
                                    fileRespnseObj.imgHeight = dimensions === null || dimensions === void 0 ? void 0 : dimensions.height;
                                    fileRespnseObj.imgWidth = dimensions === null || dimensions === void 0 ? void 0 : dimensions.width;
                                });
                                await compressImageUpload.done();
                                resolve(fileRespnseObj);
                            }
                            const fileUplaod = new lib_storage_1.Upload({
                                client: s3,
                                queueSize: 4,
                                leavePartsOnError: false,
                                params: {
                                    Bucket: enum_1.iDriveData.bucket,
                                    Key: `${fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId}/${fileData === null || fileData === void 0 ? void 0 : fileData.fileId}.${fileType}`,
                                    ContentType: (_m = req === null || req === void 0 ? void 0 : req.file) === null || _m === void 0 ? void 0 : _m.mimetype,
                                    ACL: "public-read",
                                    Body: (_o = req.file) === null || _o === void 0 ? void 0 : _o.buffer,
                                },
                            });
                            fileUplaod.on("httpUploadProgress", async (progress) => { });
                            const imgUploadData = await fileUplaod.done();
                            ((_p = req === null || req === void 0 ? void 0 : req.file) === null || _p === void 0 ? void 0 : _p.mimetype.startsWith("image")) &&
                                ((_q = imgUploadData === null || imgUploadData === void 0 ? void 0 : imgUploadData.$metadata) === null || _q === void 0 ? void 0 : _q.httpStatusCode) === 200
                                ? resolve(fileRespnseObj)
                                : resolve({ errorMsg: enum_1.errorMsg.errorFileUpload });
                        }
                        catch (err) {
                            console.log(err);
                            resolve({ errorMsg: enum_1.errorMsg.errorFileUpload });
                        }
                    }
                }
                else {
                    console.log(err);
                    resolve({ errorMsg: enum_1.errorMsg.errorFileUpload });
                }
            });
        }
        catch (err) {
            console.log(err);
            reject(true);
        }
    });
};
exports.uploadFile = uploadFile;
