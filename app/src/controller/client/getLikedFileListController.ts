import { NextFunction, Response } from "express-serve-static-core";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { IEvent, IEventFile } from "../../interface/IEvent";
import { clientModel } from "../../model/clientModel";
import { eventModel } from "../../model/eventModel";
import { errorMsg } from "../../service/enum";
import { responderController } from "../common/responderController";

export const getLikedFileListController = async (
  req: IEvent & IAuth,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  try {
    if (req?.clientId) {
      eventModel().find(
        {
          clientId: req?.clientId,
        },
        { _id: 0 },
        async (err, result: IEvent[]) => {
          if (!err) {
            const resultArr: IEventFile[] = [];
            result?.map((event: IEvent) => {
              if (event?.eventFileList) {
                event?.eventFileList.map((file: IEventFile) => {
                  if (file?.liked) {
                    resultArr.push(file);
                  }
                });
              }
            });
            responderController({ result: resultArr, statusCode: 200 }, res);
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
