import { RequestHandler } from "express";
import { IResponderResult } from "../../interface/IResponderResult";

export const responderController = (result: IResponderResult, res: any) => {
  try {
    res.status(result.statusCode);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};
