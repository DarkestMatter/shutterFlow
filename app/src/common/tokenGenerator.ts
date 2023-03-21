import { IUserProfile } from "../interface/IUserProfile";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

export const SECRET_KEY: Secret = "7896-5630-7564-0809";

export const tokenGenerator = (email: IUserProfile) => {
  return new Promise((resolve) => {
    const token = jwt.sign(
      {
        email: email,
      },
      SECRET_KEY,
      { expiresIn: "7d" }
    );
    resolve(token);
  });
};
