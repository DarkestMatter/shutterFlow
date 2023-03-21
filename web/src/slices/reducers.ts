import { clientReducer } from "./client/clientSlice";
import { commonReducer } from "./common/commonSlice";
import { dialogBoxReducer } from "./common/dialogBoxSlice";
import { msgSliceReducer } from "./common/msgSlice";
import { userProfileReducer } from "./user/userProfileSlice";

export const reducers = {
  profile: userProfileReducer,
  client: clientReducer,
  msg: msgSliceReducer,
  dialog: dialogBoxReducer,
  common: commonReducer,
};
