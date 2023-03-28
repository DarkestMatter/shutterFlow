import { S3Client } from "@aws-sdk/client-s3";
import {
  NextFunction,
  ParamsDictionary,
  Request,
  Response,
} from "express-serve-static-core";
import multer from "multer";
import sharp from "sharp";
import { Upload } from "@aws-sdk/lib-storage";
import { ParsedQs } from "qs";
//@ts-ignore
import { iDriveCred } from "../../env";
import { IEventFile } from "../interface/IEvent";
import { IFileRespnseObj } from "../interface/IFileMeta";
import { errorMsg, iDriveData, uploadImgFormat } from "./enum";

const s3 = new S3Client({
  credentials: {
    secretAccessKey: iDriveCred.iDriveSecretAccessKey,
    accessKeyId: iDriveCred.iDriveAccessKeyId,
  },
  endpoint: iDriveCred.iDriveEndpoint,
  region: iDriveCred.iDriveRegion,
});

export const uploadFile = async (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction,
  fileData: IEventFile
) => {
  return new Promise(async (resolve, reject) => {
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
            const fileUplaod = new Upload({
              client: s3,
              queueSize: 4, // optional concurrency configuration
              leavePartsOnError: false, // optional manually handle dropped parts
              params: {
                Bucket: iDriveData.bucket,
                Key: `${fileData?.clientOwnerId}/${fileData?.fileId}.${fileType}`,
                ContentType: "application/pdf",
                ACL: "public-read",
                Body: req.file?.buffer,
              },
            });
            fileUplaod.on("httpUploadProgress", async (progress: any) => {
              fileRespnseObj.fileType = fileType;
              fileRespnseObj.eventId = req.body?.eventId;
              fileRespnseObj.mimetype = res.req.file?.mimetype;
              fileRespnseObj.name = res.req.file?.originalname;
              fileRespnseObj.originalFileSize = progress?.loaded;
            });
            await fileUplaod.done();
            if (req?.file?.mimetype.startsWith("image")) {
              const compressImageUpload = new Upload({
                client: s3,
                queueSize: 4, // optional concurrency configuration
                leavePartsOnError: false, // optional manually handle dropped parts
                params: {
                  Bucket: iDriveData.bucket,
                  Key: `${fileData?.clientOwnerId}/min/${fileData?.fileId}.${fileType}`,
                  ContentType: "application/pdf",
                  ACL: "public-read",
                  Body: sharp(req.file?.buffer).webp({ quality: 30 }),
                },
              });

              compressImageUpload.on("httpUploadProgress", (progress: any) => {
                fileRespnseObj.minFileSize = progress?.loaded;
                console.log(fileRespnseObj);
              });
              await compressImageUpload.done();
              resolve(fileRespnseObj);
            } else {
              resolve(fileRespnseObj);
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
