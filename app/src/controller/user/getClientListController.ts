import { RequestHandler } from "express";
import { Response, NextFunction } from "express-serve-static-core";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { clientModel } from "../../model/clientModel";
import { responderController } from "../common/responderController";

export const getClientListController = async (
  req: IClient & IAuth,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  try {
    clientModel().find(
      {
        clientOwnerId: req?.userId,
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
  } catch (err) {
    responderController(
      { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
      res
    );
  }
};
