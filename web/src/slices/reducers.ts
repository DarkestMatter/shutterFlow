import { userReducer } from "./client/clientSlice";
import { commonReducer } from "./common/commonSlice";
import { dialogBoxReducer } from "./common/dialogBoxSlice";
import { msgSliceReducer } from "./common/msgSlice";
import { userProfileReducer } from "./user/userProfileSlice";

export const reducers = {
  userProfile: userProfileReducer,
  user: userReducer,
  msg: msgSliceReducer,
  dialog: dialogBoxReducer,
  common: commonReducer,
};
