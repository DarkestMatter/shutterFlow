import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export interface IApi {
  dispatch: Dispatch<AnyAction>;
  uri: string;
  data: {};
}
