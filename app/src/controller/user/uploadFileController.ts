import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { RequestHandler } from "express";
import {
  Request,
  ParamsDictionary,
  Response,
  NextFunction,
} from "express-serve-static-core";
import multer from "multer";
import multerS3 from "multer-s3";
import { ParsedQs } from "qs";
import { v4 as uuidv4 } from "uuid";
import { IAuth } from "../../interface/IAuth";

const s3 = new S3Client({
  credentials: {
    secretAccessKey: "dDk6JCcRWmmHdOm9RCt6wYuAheA1TyrvLvmoKdZw",
    accessKeyId: "5XkxLdSVFLfL3bfFnsEy",
  },
  endpoint: "https:i1h6.ldn.idrivee2-18.com",
  region: "gb-ldn",
});

export const uploadFileController = async (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction,
  auth: IAuth
) => {
  try {
    const bucketParams = {
      Bucket: "shutterFlow",
      Delimiter: "/",
    };
    const data = await s3.send(new ListObjectsCommand(bucketParams));
    const storage = multerS3({
      s3: s3,
      acl: "public-read",
      bucket: "poc",
      key: function (req, file, cb) {
        const fullPath = `sattasaphire-gmail.com_Satish/${uuidv4()}.jpg`;
        cb(null, fullPath);
      },
    });
    const upload = multer({
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
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
