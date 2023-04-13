import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import { IAuth } from "../interface/IAuth";
import { IEvent } from "../interface/IEvent";
import { iDriveData } from "./enum";
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

export const deleteFile = (req: IEvent & IAuth) => {
  return new Promise(async (resolve, reject) => {
    try {
      const minFileKeyArr = req?.eventFileList?.map((file) => {
        return {
          Key: file?.minFilePath?.split(iDriveData.baseUrl).pop(),
        };
      });
      const originalFileKeyArr = req?.eventFileList?.map((file) => {
        return {
          Key: file?.minFilePath
            ?.split(iDriveData.baseUrl)
            .pop()
            ?.replace("/min", ""),
        };
      }) as unknown as [];
      const deleteInput = {
        Bucket: iDriveData.bucket,
        Delete: {
          Objects: minFileKeyArr?.concat(originalFileKeyArr),
          Quiet: false,
        },
      };
      const command = new DeleteObjectsCommand(deleteInput);
      const response = await s3.send(command);
      if (response?.Deleted?.length !== 0) {
        resolve(response?.Deleted);
      } else {
        reject(true);
      }
    } catch (err) {
      reject(true);
    }
  });
};
