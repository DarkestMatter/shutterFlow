"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileController = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const uuid_1 = require("uuid");
const s3 = new client_s3_1.S3Client({
    credentials: {
        secretAccessKey: "dDk6JCcRWmmHdOm9RCt6wYuAheA1TyrvLvmoKdZw",
        accessKeyId: "5XkxLdSVFLfL3bfFnsEy",
    },
    endpoint: "https:i1h6.ldn.idrivee2-18.com",
    region: "gb-ldn",
});
const uploadFileController = async (req, res, next, auth) => {
    try {
        const bucketParams = {
            Bucket: "shutterFlow",
            Delimiter: "/",
        };
        const data = await s3.send(new client_s3_1.ListObjectsCommand(bucketParams));
        const storage = (0, multer_s3_1.default)({
            s3: s3,
            acl: "public-read",
            bucket: "poc",
            key: function (req, file, cb) {
                const fullPath = `sattasaphire-gmail.com_Satish/${(0, uuid_1.v4)()}.jpg`;
                cb(null, fullPath);
            },
        });
        const upload = (0, multer_1.default)({
            storage: storage,
            limits: { fileSize: 100000000 },
        }).single("myImage");
        upload(req, res, (err) => {
            console.log("inside");
            if (!err) {
                if (res.req.file && req.file) {
                    console.log("success");
                }
                res.json("success");
            }
            else {
                console.log(err);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.uploadFileController = uploadFileController;
