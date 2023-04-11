import { NextFunction, Response } from "express-serve-static-core";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { IEvent, IEventFile } from "../../interface/IEvent";
import { clientModel } from "../../model/clientModel";
import { eventModel } from "../../model/eventModel";
import { errorMsg } from "../../service/enum";
import { responderController } from "../common/responderController";

export const fileLikedController = async (
  req: IEventFile & IAuth,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  try {
    if (req?.clientId) {
      console.log(req?.liked);
      const filterObj = {
        clientId: req?.clientId,
        clientOwnerId: req?.clientOwnerId,
        eventId: req?.eventId,
        "eventFileList.fileId": req?.fileId,
      };
      console.log(filterObj);
      eventModel().updateOne(
        filterObj,
        {
          $set: {
            "eventFileList.$.liked": req?.liked,
          },
        },
        (err: Error, result: { modifiedCount: Number }) => {
          if (!err && result?.modifiedCount === 1) {
            responderController({ result: {}, statusCode: 200 }, res);
          } else {
            responderController(
              {
                result: {},
                statusCode: 200,
                errorMsg: errorMsg.errorAtFileLiked,
              },
              res
            );
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    responderController(
      { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
      res
    );
  }
};
