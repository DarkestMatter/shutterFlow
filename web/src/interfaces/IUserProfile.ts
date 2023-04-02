export interface IUserProfile {
  customerType?: string;
  studioName?: string;
  userId?: string;
  email?: string;
  mobile?: string;
  status?: string;
  otp?: string;
  pwd?: string;
}

export const defaultIUserProfile: IUserProfile = {
  studioName: "",
  email: "",
};
