import {
  NextFunction,
  ParamsDictionary,
  Request,
  Response,
} from "express-serve-static-core";
import { ParsedQs } from "qs";
import { v4 as uuidv4 } from "uuid";
import { IAuth } from "../../interface/IAuth";
import { IEvent, IEventFile } from "../../interface/IEvent";
import { IFileRespnseObj } from "../../interface/IFileMeta";
import { eventModel } from "../../model/eventModel";
import { errorMsg, fileType, iDriveData } from "../../service/enum";
import { uploadFile } from "../../service/uploadFile";
import { responderController } from "../common/responderController";

export const uploadFileController = async (
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction,
  auth: IAuth
) => {
  try {
    const fileId = uuidv4();
    const fileData: IEventFile = {
      fileId: fileId,
      clientOwnerId: auth?.userId,
      clientId: req?.body?.clientId,
      originalFilePath: `${auth?.userId}/${fileId}`,
      minFilePath: `${auth?.userId}/min/${fileId}`,
      microFilePath: ``,
    };
    //original file upload
    const fileUploadResponse = (await uploadFile(
      req,
      res,
      next,
      fileData
    )) as IFileRespnseObj;
    if (fileUploadResponse?.errorMsg) {
      responderController(
        { result: {}, statusCode: 200, errorMsg: fileUploadResponse?.errorMsg },
        res
      );
      return;
    }
    const eventFileDataObj: IEventFile = {
      fileId: fileData?.fileId,
      clientOwnerId: fileData?.clientOwnerId,
      clientId: fileData?.clientId,
      name: fileUploadResponse?.name,
      originalFilePath: `${iDriveData.baseUrl}${fileData?.clientOwnerId}/${fileData?.fileId}`,
      minFilePath: `${iDriveData.baseUrl}${fileData?.clientOwnerId}/min/${fileData?.fileId}`,
      microFilePath: ``,
      originalFileSize: fileUploadResponse?.originalFileSize,
      minFileSize: fileUploadResponse?.minFileSize,
      microFileSize: 0,
      type: fileType.video,
      format: fileUploadResponse?.mimetype,
      eventId: fileUploadResponse?.eventId,
    };
    const fileDataSaved = (await saveUploadFileData(
      eventFileDataObj
    )) as IEvent;
    fileDataSaved?.clientId
      ? responderController({ result: {}, statusCode: 200 }, res)
      : responderController(
          {
            result: {},
            statusCode: 200,
            errorMsg: errorMsg.errorFileUpload,
          },
          res
        );
  } catch (err) {
    console.log(err);
    responderController(
      { result: {}, statusCode: 200, errorMsg: errorMsg.errorFileUpload },
      res
    );
  }
};

export const saveUploadFileData = (fileData: IEventFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedResult = (await eventModel().findOneAndUpdate(
        {
          clientOwnerId: fileData?.clientOwnerId,
          eventId: fileData?.eventId,
        },
        {
          $push: {
            eventFileList: fileData,
          },
        }
      )) as IEvent;
      updatedResult?.clientId ? resolve(updatedResult) : resolve(false);
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
};
