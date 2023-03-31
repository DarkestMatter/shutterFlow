import { NextFunction, Response } from "express-serve-static-core";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { IEvent } from "../../interface/IEvent";
import { eventModel } from "../../model/eventModel";
import { errorMsg } from "../../service/enum";
import { responderController } from "../common/responderController";

export const getEventDataController = async (
  req: IEvent & IAuth,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  try {
    if (req?.userId) {
      // && req?.customerType === customerType.user) {
      eventModel().find(
        {
          clientOwnerId: req?.userId,
          clientId: req?.clientId,
          eventId: req?.eventId,
        },
        { _id: 0 },
        { sort: { updatedDate: 1 } },
        (err, result: IEvent[]) => {
          if (!err) {
            const resultObj = {
              eventId: result[0]?.eventId,
              clientId: result[0]?.clientId,
              clientName: result[0]?.clientName,
              clientOwnerId: result[0]?.clientOwnerId,
              eventName: result[0]?.eventName,
              eventFileList: result[0]?.eventFileList,
              createdDate: result[0]?.createdDate,
              updatedDate: result[0]?.updatedDate,
            };
            responderController({ result: resultObj, statusCode: 200 }, res);
          } else {
            responderController({ result: {}, statusCode: 200 }, res);
          }
        }
      );
    }
  } catch (err) {
    responderController(
      { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
      res
    );
  }
};
