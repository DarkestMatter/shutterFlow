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
import { clientModel } from "../../model/clientModel";
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
      originalFilePath: `${auth?.userId}/${fileId}`,
      minFilePath: `${auth?.userId}/min/${fileId}`,
      microFilePath: ``,
    };
    responderController({ result: {}, statusCode: 200 }, res);
    //original file upload
    const fileUploadResponse = (await uploadFile(
      req,
      res,
      next,
      fileData
    )) as IFileRespnseObj;
    if (fileUploadResponse?.errorMsg) {
      //delete all existing related files from drive
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
      originalFilePath: `${iDriveData.baseUrl}${fileData?.clientOwnerId}/${fileData?.fileId}.${fileUploadResponse?.fileType}`,
      minFilePath: `${iDriveData.baseUrl}${fileData?.clientOwnerId}/min/${fileData?.fileId}.${fileUploadResponse?.fileType}`,
      originalFileSize: fileUploadResponse?.originalFileSize,
      minFileSize: fileUploadResponse?.minFileSize,
      format: fileUploadResponse?.mimetype,
      eventId: fileUploadResponse?.eventId,
      imgHeight: fileUploadResponse?.imgHeight,
      imgWidth: fileUploadResponse?.imgWidth,
      imgDimensionType: fileUploadResponse?.imgDimensionType,
    };
    const fileDataSaved = (await saveUploadFileData(
      eventFileDataObj
    )) as IEvent;
    // fileDataSaved?.clientId
    //   ? responderController({ result: {}, statusCode: 200 }, res)
    //   : responderController(
    //       {
    //         result: {},
    //         statusCode: 200,
    //         errorMsg: errorMsg.errorFileUpload,
    //       },
    //       res
    //     );
    await clientModel().updateOne(
      {
        clientOwnerId: fileData?.clientOwnerId,
        clientId: fileUploadResponse?.clientId,
      },
      {
        tileImgUrl: `${iDriveData.baseUrl}${fileData?.clientOwnerId}/min/${fileData?.fileId}.${fileUploadResponse?.fileType}`,
      }
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
      const originalFileData: IEventFile = {
        fileId: fileData?.fileId,
        clientId: fileData?.clientId,
        clientOwnerId: fileData?.clientOwnerId,
        name: fileData?.name,
        originalFilePath: fileData?.originalFilePath,
      };
      const minFileData: IEventFile = {
        fileId: fileData?.fileId,
        clientOwnerId: fileData?.clientOwnerId,
        clientId: fileData?.clientId,
        name: fileData?.name,
        minFilePath: fileData?.minFilePath,
        originalFileSize: fileData?.originalFileSize,
        minFileSize: fileData?.minFileSize,
        format: fileData?.format,
        eventId: fileData?.eventId,
        imgHeight: fileData?.imgHeight,
        imgWidth: fileData?.imgWidth,
        imgDimensionType: fileData?.imgDimensionType,
      };
      const updatedResult = (await eventModel().findOneAndUpdate(
        {
          clientOwnerId: fileData?.clientOwnerId,
          eventId: fileData?.eventId,
        },
        {
          $push: {
            originalFileList: originalFileData,
            eventFileList: minFileData,
          },
          eventImgUrl: minFileData?.minFilePath,
        },
        { new: true }
      )) as IEvent;
      updatedResult?.clientId ? resolve(updatedResult) : resolve(false);
    } catch (err) {
      console.log(err);
      resolve(false);
    }
  });
};
