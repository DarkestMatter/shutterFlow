import { userReducer } from "./user/clientMgmtSlice";
import { commonReducer } from "./common/commonSlice";
import { dialogBoxReducer } from "./common/dialogBoxSlice";
import { msgSliceReducer } from "./common/msgSlice";
import { uploadReducer } from "./user/uploadFileSlice";
import { userProfileReducer } from "./user/userProfileSlice";
import { eventReducer } from "./user/eventSlice";
import { clientProfileReducer } from "./client/clientProfileSlice";
import { clientEventReducer } from "./client/clientEventSlice";

export const reducers = {
  userProfile: userProfileReducer,
  clientProfile: clientProfileReducer,
  user: userReducer,
  msg: msgSliceReducer,
  dialog: dialogBoxReducer,
  common: commonReducer,
  upload: uploadReducer,
  event: eventReducer,
  clientEvent: clientEventReducer,
};
