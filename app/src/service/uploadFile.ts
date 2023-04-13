import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import sizeOf from "buffer-image-size";
import * as dotenv from "dotenv";
import {
  NextFunction,
  ParamsDictionary,
  Request,
  Response,
} from "express-serve-static-core";
import multer from "multer";
import { ParsedQs } from "qs";
import sharp from "sharp";
import { IEventFile } from "../interface/IEvent";
import { IFileRespnseObj } from "../interface/IFileMeta";
import {
  errorMsg,
  iDriveData,
  imgDimensionType,
  uploadImgFormat,
} from "./enum";
dotenv.config();

const s3 = new S3Client({
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

export const uploadFile = async (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction,
  fileData: IEventFile
) => {
  return new Promise(async (resolve, reject) => {
    let imgDimType: String;
    try {
      const fileRespnseObj: IFileRespnseObj = {};
      const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 100000000 },
        fileFilter: async (req, file, cb) => {
          //@ts-ignore
          if (Object.values(uploadImgFormat).includes(file.mimetype)) {
            cb(null, true);
          } else {
            cb(null, false);
            resolve({ errorMsg: errorMsg.incorrectUploadFormat });
            return cb(new Error());
          }
        },
      });
      upload.single("myImage")(req, res, async (err) => {
        const fileType = res.req.file?.mimetype.split("/")[1];
        if (!err) {
          if (res?.req?.file && req?.file) {
            try {
              fileRespnseObj.fileType = fileType;
              fileRespnseObj.eventId = req.body?.eventId;
              fileRespnseObj.clientId = req.body?.clientId;
              fileRespnseObj.mimetype = res.req.file?.mimetype;
              fileRespnseObj.name = res.req.file?.originalname;
              fileRespnseObj.originalFileSize = req?.file?.size;

              const uploadOriginalFile = async () => {
                const fileUplaod = new Upload({
                  client: s3,
                  queueSize: 4, // optional concurrency configuration
                  leavePartsOnError: false, // optional manually handle dropped parts
                  params: {
                    Bucket: iDriveData.bucket,
                    Key: `${fileData?.clientOwnerId}/${fileData?.fileId}.${fileType}`,
                    ContentType: req?.file?.mimetype,
                    ACL: "public-read",
                    Body: req.file?.buffer,
                  },
                });
                fileUplaod.on(
                  "httpUploadProgress",
                  async (progress: any) => {}
                );
                const imgUploadData = await fileUplaod.done();
                if (!req?.file?.mimetype.startsWith("image")) {
                  req?.file?.mimetype.startsWith("image") &&
                  imgUploadData?.$metadata?.httpStatusCode === 200
                    ? resolve(fileRespnseObj)
                    : resolve({ errorMsg: errorMsg.errorFileUpload });
                }
              };

              if (req?.file?.mimetype.startsWith("image")) {
                //calculating img dim
                const dimensions = sizeOf(req?.file?.buffer);
                if (dimensions.height > dimensions.width) {
                  imgDimType = imgDimensionType.portrait;
                } else {
                  imgDimType = imgDimensionType.landscape;
                }
                const compressImageUpload = new Upload({
                  client: s3,
                  queueSize: 4,
                  leavePartsOnError: false,
                  params: {
                    Bucket: iDriveData.bucket,
                    Key: `${fileData?.clientOwnerId}/min/${fileData?.fileId}.${fileType}`,
                    ContentType: req?.file?.mimetype,
                    ACL: "public-read",
                    Body: sharp(req.file?.buffer).webp({ quality: 35 }),
                  },
                });
                compressImageUpload.on(
                  "httpUploadProgress",
                  (progress: any) => {
                    fileRespnseObj.minFileSize = progress?.loaded;
                    fileRespnseObj.imgDimensionType = imgDimType;
                    fileRespnseObj.imgHeight = dimensions?.height;
                    fileRespnseObj.imgWidth = dimensions?.width;
                  }
                );
                await compressImageUpload.done();
                resolve(fileRespnseObj);
                uploadOriginalFile();
              }

              if (!req?.file?.mimetype.startsWith("image")) {
                uploadOriginalFile();
              }
            } catch (err) {
              console.log(err);
              resolve({ errorMsg: errorMsg.errorFileUpload });
            }
          }
        } else {
          console.log(err);
          resolve({ errorMsg: errorMsg.errorFileUpload });
        }
      });
    } catch (err) {
      console.log(err);
      reject(true);
    }
  });
};
