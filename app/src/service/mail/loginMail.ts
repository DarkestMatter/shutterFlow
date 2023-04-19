import * as dotenv from "dotenv";
import * as nodemailer from "nodemailer";
import { ILoginCred } from "../../interface/ILoginCred";
import { IUserProfile } from "../../interface/IUserProfile";
dotenv.config();

export const loginMail = (userData: IUserProfile & ILoginCred) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.in",
        port: 465,
        secure: true,
        auth: {
          user: process.env.mailId,
          pass: process.env.mailPwd,
        },
      });

      const receiverMail = userData?.email ? userData?.email : undefined;

      const info = await transporter.sendMail({
        from: `"ShutterFlow.in" <${process.env.mailId}>`, // sender address
        to: receiverMail as unknown as string,
        subject: "Use this OTP to Login to shutterFlow.in",
        html: `Dear Customer <br><br>Your OTP is ${userData?.otp}. <br>We thank you for choosing shutterFlow.in as your Digital Photo sharing ecosystem. <br><br>Best Regards <br>shutterFlow.in <br><br><br><br>--This is a system generated mail--`,
        text: "",
      });
      info?.accepted.length !== 0 ? resolve(true) : resolve(false);
    } catch (err) {
      resolve(false);
    }
  });
};
