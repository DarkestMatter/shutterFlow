import { NextFunction, Response } from "express-serve-static-core";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { IEvent } from "../../interface/IEvent";
import { eventModel } from "../../model/eventModel";
import { errorMsg } from "../../service/enum";
import { responderController } from "../common/responderController";

export const getPrimaryEventController = async (
  req: IEvent & IAuth,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  try {
    if (req?.clientId) {
      eventModel().findOne(
        {
          clientId: req?.clientId,
          "eventFileList.0": { $exists: true },
        },
        { _id: 0 },
        (err, result: IEvent) => {
          if (!err) {
            console.log(result?.clientId);
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
            console.log(err);
            responderController({ result: {}, statusCode: 200 }, res);
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
