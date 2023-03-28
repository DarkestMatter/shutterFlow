import jwt, { Secret } from "jsonwebtoken";
import { ILoginCred } from "../interface/ILoginCred";

export const SECRET_KEY: Secret = "7896-5630-7564-0809";

export const tokenGenerator = (
  userId: String | undefined,
  customerType: String | undefined,
  status: String | undefined
) => {
  console.log(userId);
  return new Promise((resolve) => {
    const token = jwt.sign(
      {
        userId: userId,
        customerType: customerType,
        status: status,
      },
      SECRET_KEY,
      { expiresIn: "7d" }
    );
    resolve(token);
  });
};
