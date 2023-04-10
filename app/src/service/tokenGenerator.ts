import jwt, { Secret } from "jsonwebtoken";
import { IToken } from "../interface/IToken";

export const SECRET_KEY: Secret = "7896-5630-7564-0809";

export const tokenGenerator = (tokenObj: IToken) => {
  return new Promise((resolve) => {
    const token = jwt.sign(
      {
        userId: tokenObj?.userId,
        clientId: tokenObj?.clientId,
        customerType: tokenObj?.customerType,
        status: tokenObj?.status,
      },
      SECRET_KEY,
      { expiresIn: "7d" }
    );
    resolve(token);
  });
};
