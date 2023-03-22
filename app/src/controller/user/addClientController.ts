import { NextFunction, Response } from "express-serve-static-core";
import { v4 as uuidv4 } from "uuid";
import { findValidUser } from "../../common/findValidUser";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { IEvent } from "../../interface/IEvent";
import { IUserProfile } from "../../interface/IUserProfile";
import { clientModel } from "../../model/clientModel";
import { responderController } from "../common/responderController";

export const addClientController = async (
  req: IClient & IAuth,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  try {
    const userData = (await findValidUser(
      req?.userId
    )) as unknown as IUserProfile;

    if (userData?.email) {
      // && userData?.customerType === customerType.user) {
      const eventList: IEvent[] = [
        {
          eventName: eventName.defaultEventName,
          createdDate: new Date() as unknown as String,
          updatedDate: new Date() as unknown as String,
        },
      ];

      const newClientModel = clientModel();

      let clientObjectModel: IClient = {
        clientName: req?.clientName,
        clientId: uuidv4(),
        clientMobileNo: req?.clientMobileNo,
        eventType: req?.eventType,
        eventList: eventList,
        clientOwnerName: userData?.studioName,
        clientOwnerId: userData?.userId,
        clientOwnerEmail: userData?.email,
        updatedDate: new Date() as unknown as String,
        createdDate: new Date() as unknown as String,
      };

      new newClientModel(clientObjectModel).save((err, result) => {
        try {
          if (!err) {
            const resultObj: IClient = {
              clientName: result?.clientName,
              clientId: result?.clientId,
              clientMobileNo: result?.clientMobileNo,
              eventType: result?.eventType,
              eventList: result?.eventList,
              clientOwnerName: result?.clientOwnerName,
              clientOwnerId: result?.clientOwnerId,
              clientOwnerEmail: result?.clientOwnerEmail,
              updatedDate: result?.updatedDate,
            };
            responderController({ result: resultObj, statusCode: 200 }, res);
          } else {
            responderController(
              { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
              res
            );
          }
        } catch (err) {
          responderController(
            { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
            res
          );
        }
      });
    } else {
      responderController(
        { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
        res
      );
    }
  } catch (err) {
    responderController(
      { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
      res
    );
  }
};
