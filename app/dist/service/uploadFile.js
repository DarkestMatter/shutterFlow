"use strict";
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
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const fileType = (_a = res.req.file) === null || _a === void 0 ? void 0 : _a.mimetype.split("/")[1];
                if (!err) {
                    if (((_b = res === null || res === void 0 ? void 0 : res.req) === null || _b === void 0 ? void 0 : _b.file) && (req === null || req === void 0 ? void 0 : req.file)) {
                        try {
                            const fileUplaod = new lib_storage_1.Upload({
                                client: s3,
                                queueSize: 4,
                                leavePartsOnError: false,
                                params: {
                                    Bucket: enum_1.iDriveData.bucket,
                                    Key: `${fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId}/${fileData === null || fileData === void 0 ? void 0 : fileData.fileId}.${fileType}`,
                                    ContentType: (_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.mimetype,
                                    ACL: "public-read",
                                    Body: (_d = req.file) === null || _d === void 0 ? void 0 : _d.buffer,
                                },
                            });
                            fileUplaod.on("httpUploadProgress", async (progress) => {
                                var _a, _b, _c;
                                fileRespnseObj.fileType = fileType;
                                fileRespnseObj.eventId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.eventId;
                                fileRespnseObj.mimetype = (_b = res.req.file) === null || _b === void 0 ? void 0 : _b.mimetype;
                                fileRespnseObj.name = (_c = res.req.file) === null || _c === void 0 ? void 0 : _c.originalname;
                                fileRespnseObj.originalFileSize = progress === null || progress === void 0 ? void 0 : progress.loaded;
                            });
                            const a = await fileUplaod.done();
                            console.log(a);
                            if ((_e = req === null || req === void 0 ? void 0 : req.file) === null || _e === void 0 ? void 0 : _e.mimetype.startsWith("image")) {
                                //calculating img dim
                                const dimensions = (0, buffer_image_size_1.default)((_f = req === null || req === void 0 ? void 0 : req.file) === null || _f === void 0 ? void 0 : _f.buffer);
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
                                        ContentType: (_g = req === null || req === void 0 ? void 0 : req.file) === null || _g === void 0 ? void 0 : _g.mimetype,
                                        ACL: "public-read",
                                        Body: (0, sharp_1.default)((_h = req.file) === null || _h === void 0 ? void 0 : _h.buffer).webp({ quality: 35 }),
                                    },
                                });
                                compressImageUpload.on("httpUploadProgress", (progress) => {
                                    fileRespnseObj.minFileSize = progress === null || progress === void 0 ? void 0 : progress.loaded;
                                    fileRespnseObj.imgDimensionType = imgDimType;
                                    console.log(fileRespnseObj);
                                });
                                await compressImageUpload.done();
                                resolve(fileRespnseObj);
                            }
                            else {
                                resolve(fileRespnseObj);
                            }
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
