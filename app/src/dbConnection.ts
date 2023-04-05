import mongoose, { ConnectOptions } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
// const get_line_no = () => {
//   var obj = {};
//   Error.captureStackTrace(obj, get_line_no);
//   return obj.stack;
// };

export const connect_db = () => {
  try {
    const uri = `mongodb+srv://${process.env.liveDBUsername}:${process.env.liveDBPwd}${process.env.liveDBCluster}/${process.env.liveDBUsername}?retryWrites=true&w=majority`;
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (err) {
    console.log(err);
  }
};
