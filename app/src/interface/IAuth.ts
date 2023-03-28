import { customerType, statusEnum } from "../service/enum";

export interface IAuth {
  fileId?: String;
  status?: statusEnum;
  userId: string;
  customerType: customerType;
  exp?: Number;
  iat?: Number;
}
