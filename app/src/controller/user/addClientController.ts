import { NextFunction, Response } from "express-serve-static-core";
import { v4 as uuidv4 } from "uuid";
import { findValidUser } from "../../service/findValidUser";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { IEvent } from "../../interface/IEvent";
import { IUserProfile } from "../../interface/IUserProfile";
import { clientModel } from "../../model/clientModel";
import { responderController } from "../common/responderController";
import { addEvent } from "./addEventController";
import {
  customerType,
  errorMsg,
  eventName,
  registrationStatus,
} from "../../service/enum";
import { addLoginCred } from "../../service/addLoginCred";
import { ILoginCred } from "../../interface/ILoginCred";
import { findValidLogin } from "../../service/findValidLogin";

export const addClientController = async (
  req: IClient & IAuth,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  try {
    const userData = (await findValidUser(
      req?.userId
    )) as unknown as IUserProfile;

    if (userData && userData?.email && userData?.userId) {
      // && userData?.customerType === customerType.user) {

      const loginData = (await findValidLogin(
        req?.clientMobileNo
      )) as unknown as ILoginCred;

      if (loginData?.clientId) {
        responderController(
          {
            result: {},
            statusCode: 500,
            errorMsg: errorMsg.clientExist,
          },
          res
        );
        return;
      }

      const clientId = `${req?.clientName?.replace(/\s/g, "")}-${uuidv4()}`;
      const eventId = `${eventName.defaultEventName?.replace(
        /\s/g,
        ""
      )}-${uuidv4()}`;

      const clientData: ILoginCred = {
        email: req?.clientEmail,
        mobile: req?.clientMobileNo,
        clientId: clientId,
        status: registrationStatus.verified,
        customerType: customerType.client,
        pwd: "1234",
      };
      await addLoginCred(clientData);

      const eventList: IEvent[] = [
        {
          eventId: eventId,
          eventName: eventName.defaultEventName,
          clientId: clientId,
          clientName: req?.clientName,
          clientOwnerId: userData.userId,
          createdDate: new Date() as unknown as String,
          updatedDate: new Date() as unknown as String,
        },
      ];
      await addEvent(
        {
          eventId: eventId,
          eventName: eventName.defaultEventName,
          clientId: clientId,
          clientName: req?.clientName,
          clientOwnerId: userData.userId,
        },
        { userId: req?.userId, customerType: req?.customerType }
      );
      const newClientModel = clientModel();

      let clientObjectModel: IClient = {
        clientName: req?.clientName,
        clientId: clientId,
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
              {
                result: {},
                statusCode: 500,
                errorMsg: errorMsg.errorAtAddCLient,
              },
              res
            );
          }
        } catch (err) {
          responderController(
            {
              result: {},
              statusCode: 500,
              errorMsg: errorMsg.errorAtAddCLient,
            },
            res
          );
        }
      });
    } else {
      responderController(
        { result: {}, statusCode: 500, errorMsg: errorMsg.incorrectUserEmail },
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
