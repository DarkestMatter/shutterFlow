import jwt, { Secret } from "jsonwebtoken";
import { errorMsg } from "./enum";

export const SECRET_KEY: Secret = "7896-5630-7564-0809";

export const decryptToken = (token: any) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(
        token.authorisation,
        SECRET_KEY,
        function (err: any, decoded: any) {
          if (!err) {
            resolve(decoded);
          } else {
            resolve(errorMsg.invalidToken);
          }
        }
      );
    } catch (err) {
      reject(errorMsg.invalidToken);
    }
  });
};
