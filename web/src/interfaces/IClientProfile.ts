export interface IClientProfile {
  customerType?: string;
  name?: string;
  clientId?: string;
  email?: string;
  mobile?: string;
  status?: string;
  pwd?: string;
}

export const defaultIClientProfile: IClientProfile = {
  name: "",
  mobile: "",
};
