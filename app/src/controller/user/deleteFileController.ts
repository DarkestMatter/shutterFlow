import { NextFunction, Response } from "express-serve-static-core";
import { IAuth } from "../../interface/IAuth";
import { IEvent } from "../../interface/IEvent";
import { eventModel } from "../../model/eventModel";
import { deleteFile } from "../../service/deleteFile";
import { errorMsg, iDriveData } from "../../service/enum";
import { responderController } from "../common/responderController";

export const deleteFileController = async (
  req: IEvent & IAuth,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  try {
    //aggregate method used, will use for getting liked files
    // const a = await eventModel().aggregate([
    //   {
    //     $match: {
    //       eventId: req?.eventId,
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$eventFileList",
    //     },
    //   },
    //   {
    //     $match: {
    //       "eventFileList.fileId": {
    //         $in: [
    //           "b82ee279-9acd-4309-8bb0-6bdbde46a405",
    //           "0bfeab0a-4141-49ee-a29b-32cc34dc80eb",
    //         ],
    //       },
    //     },
    //   },
    // ]);
    // console.log(a);

    const deletedFileList = (await deleteFile(req)) as unknown as { Key: "" }[];
    deletedFileList &&
      //@ts-ignore
      eventModel().findOneAndUpdate(
        { eventId: req?.eventId, clientOwnerId: req?.userId },
        {
          $pull: {
            eventFileList: {
              minFilePath: {
                $in: deletedFileList?.map(
                  (key) => `${iDriveData.baseUrl}${key?.Key}`
                ),
              },
            },
            originalFileList: {
              originalFilePath: {
                $in: deletedFileList?.map(
                  (key) => `${iDriveData.baseUrl}${key?.Key}`
                ),
              },
            },
          },
        },
        { new: true },
        (err: Error, result: IEvent) => {
          if (!err) {
            const resultObj = {
              eventId: result?.eventId,
              clientId: result?.clientId,
              clientName: result?.clientName,
              clientOwnerId: result?.clientOwnerId,
              eventName: result?.eventName,
              eventFileList: result?.eventFileList,
              createdDate: result?.createdDate,
              updatedDate: result?.updatedDate,
            };
            responderController({ result: resultObj, statusCode: 200 }, res);
          } else {
            responderController(
              {
                result: err,
                statusCode: 200,
                errorMsg: errorMsg.errorAtDeleteFile,
              },
              res
            );
          }
        }
      );
  } catch (err) {
    responderController(
      {
        result: { err },
        statusCode: 500,
        errorMsg: errorMsg.errorAtDeleteFile,
      },
      res
    );
  }
};
