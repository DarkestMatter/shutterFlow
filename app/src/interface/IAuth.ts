export interface IAuth {
  status?: statusEnum;
  userId: string;
  customerType: customerType;
  exp?: Number;
  iat?: Number;
}
