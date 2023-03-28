import { NextFunction, Response } from "express-serve-static-core";
import { v4 as uuidv4 } from "uuid";
import { IAuth } from "../../interface/IAuth";
import { IClient } from "../../interface/IClient";
import { IEvent } from "../../interface/IEvent";
import { clientModel } from "../../model/clientModel";
import { eventModel } from "../../model/eventModel";
import { errorMsg } from "../../service/enum";
import { responderController } from "../common/responderController";

export const addEventController = async (
  req: IEvent & IAuth,
  res?: Response<any, Record<string, any>, number>,
  next?: NextFunction
) => {
  try {
    const authData = { userId: req?.userId, customerType: req?.customerType };
    const isEventAlreadyExists = await checkEventAlreadyExists(req, authData);
    const newEventObj = {
      eventId: `${req?.eventName?.replace(/\s/g, "")}-${uuidv4()}`,
      eventName: req?.eventName,
      clientId: req?.clientId,
      clientName: req?.clientName,
      clientOwnerId: req?.userId,
      createdDate: new Date() as unknown as String,
      updatedDate: new Date() as unknown as String,
    };

    if (!isEventAlreadyExists) {
      try {
        await addEvent(newEventObj, authData);
        const updatedResult = (await clientModel().findOneAndUpdate(
          { clientId: req?.clientId, clientOwnerId: req?.userId },
          {
            $push: {
              eventList: newEventObj,
            },
          }
        )) as IClient;
        updatedResult?.clientId
          ? responderController({ result: newEventObj, statusCode: 200 }, res)
          : responderController(
              {
                result: {},
                statusCode: 200,
                errorMsg: errorMsg.errorAtAddEvent,
              },
              res
            );
      } catch (err) {
        responderController(
          {
            result: {},
            statusCode: 500,
            errorMsg: errorMsg.errorAtUpdateClientEvent,
          },
          res
        );
      }
    } else {
      responderController(
        {
          result: {},
          statusCode: 200,
          errorMsg: errorMsg.eventExists,
        },
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

export const addEvent = async (req: IEvent, authData: IAuth) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (authData?.userId) {
        // && req?.customerType === customerType.user) {
        const newEventModel = eventModel();
        let eventModelObject: IEvent = {
          eventId: req?.eventId,
          clientId: req?.clientId,
          clientOwnerId: authData?.userId,
          clientName: req?.clientName,
          eventName: req?.eventName,
          eventType: req?.eventType,
          eventDate: req?.eventDate,
          updatedDate: new Date() as unknown as String,
          createdDate: new Date() as unknown as String,
        };

        new newEventModel(eventModelObject).save((err, result) => {
          try {
            if (!err) {
              const resultObj = {
                eventId: result?.eventId,
                eventName: result?.eventName,
                eventType: result?.eventType,
                eventDate: result?.eventDate,
              };
              resolve({ result: resultObj, statusCode: 200 });
            } else {
              reject({
                result: {},
                statusCode: 500,
                errorMsg: errorMsg.errorAtAddEvent,
              });
            }
          } catch (err) {
            reject({
              result: {},
              statusCode: 500,
              errorMsg: errorMsg.errorAtAddEvent,
            });
          }
        });
      }
    } catch (err) {
      reject({
        result: {},
        statusCode: 500,
        errorMsg: errorMsg.incorrectUserEmail,
      });
    }
  });
};

export const checkEventAlreadyExists = async (req: IEvent, authData: IAuth) => {
  return new Promise((resolve, reject) => {
    try {
      clientModel().findOne(
        {
          clientOwnerId: authData?.userId,
          clientId: req?.clientId,
        },
        { _id: 0 },
        (err, result: IClient) => {
          if (!err) {
            resolve(
              result?.eventList.some(
                (event) => event?.eventName === req?.eventName
              )
            );
          } else {
            reject(false);
          }
        }
      );
    } catch (err) {
      reject(true);
    }
  });
};
