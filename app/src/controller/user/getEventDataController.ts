import { NextFunction, Response } from "express-serve-static-core";
import { findValidUser } from "../../service/findValidUser";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { IUserProfile } from "../../interface/IUserProfile";
import { eventModel } from "../../model/eventModel";
import { responderController } from "../common/responderController";
import { errorMsg } from "../../service/enum";

export const getEventDataController = async (
  req: IClient & IAuth,
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
        },
        { _id: 0 },
        { sort: { updatedDate: 1 } },
        (err, result: IClient[]) => {
          if (!err) {
            responderController({ result: result, statusCode: 200 }, res);
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
