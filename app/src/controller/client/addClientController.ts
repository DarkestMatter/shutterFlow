import { RequestHandler } from "express";
import { IClient } from "../../interface/IClient";
import { clientModel } from "../../model/clientModel";
import { v4 as uuidv4 } from "uuid";
import { userProfileModel } from "../../model/userProfileModel";
import { findUserDataController } from "../common/findUserDataController";
import { IUserProfile } from "../../interface/IUserProfile";
import { responderController } from "../common/responderController";
import { IEvent } from "../../interface/IEvent";

export const addClientController: RequestHandler = async (req, res, next) => {
  try {
    const userData = (await findUserDataController(
      req.body?.clientOwnerEmail
    )) as unknown as IUserProfile;

    const eventList: IEvent[] = [
      {
        eventName: eventName.defaultEventName,
      },
    ];

    const newClientModel = clientModel();

    let clientObjectModel: IClient = {
      clientName: req.body?.clientName,
      clientId: uuidv4(),
      mobile: req.body?.clientMobileNo,
      eventType: req.body?.eventType,
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
            mobile: result?.mobile,
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
  } catch (err) {
    responderController(
      { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
      res
    );
  }
};
