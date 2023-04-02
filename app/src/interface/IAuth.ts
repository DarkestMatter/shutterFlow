import { customerType, registrationStatus } from "../service/enum";

export interface IAuth {
  fileId?: String;
  status?: registrationStatus;
  userId: String;
  clientId?: String;
  customerType: customerType;
  exp?: Number;
  iat?: Number;
}
