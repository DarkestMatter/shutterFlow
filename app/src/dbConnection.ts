import mongoose, { ConnectOptions } from "mongoose";
import * as dotenv from "dotenv";
//@ts-ignore
import { dbCred } from "../env";
dotenv.config();
// const get_line_no = () => {
//   var obj = {};
//   Error.captureStackTrace(obj, get_line_no);
//   return obj.stack;
// };

export const connect_db = () => {
  try {
    console.log(process.env.liveDBPwd);
    const uri = `mongodb+srv://${dbCred.liveDBUsername}:${dbCred?.liveDBPwd}@cluster0.hnvbjox.mongodb.net/${dbCred?.liveDBUsername}?retryWrites=true&w=majority`;
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (err) {
    console.log(err);
  }
};
