import { RequestHandler } from "express";
import { IClient } from "../../interface/IClient";
import { clientModel } from "../../model/clientModel";
import { responderController } from "../common/responderController";

export const getClientListController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    clientModel().find(
      {
        email: req.body?.email,
      },
      null,
      { sort: { updatedDate: 1 } },
      (err, result: IClient[]) => {
        if (!err) {
          console.log(result);
        } else {
          responderController({ result: {}, statusCode: 200 }, res);
        }
      }
    );
  } catch (err) {}
  responderController(
    { result: {}, statusCode: 500, errorMsg: errorMsg.serverError },
    res
  );
};
