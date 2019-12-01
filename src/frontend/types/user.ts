import { MeasurementType } from "./measurement";
export interface UserType {
  id?: string;
  fullname: string;
  email: string;
  measurements?: Array<MeasurementType>;
}

export interface UsersType {
  users: Array<UserType>;
}
