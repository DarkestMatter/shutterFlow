import { RequestHandler } from "express";
import { IResponderResult } from "../../interface/IResponderResult";

export const responderController = (result: IResponderResult, res: any) => {
  try {
    if (result?.inValidToken) {
      const resultObj = { ...result, validToken: false };
      res.status(resultObj.statusCode);
      res.json(resultObj);
    } else {
      const resultObj = { ...result, validToken: true };
      res.status(resultObj.statusCode);
      res.json(resultObj);
    }
  } catch (err) {
    console.log(err);
  }
};
