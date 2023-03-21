import { Slide, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDialogBoxSelector,
  getUserProfileSelector,
  getMsgSelector,
} from "../../../selectors/selectors";
import { userStatus, dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { AppDispatch } from "../../../store";
import { submitRegistrationOtpThunk } from "../../../thunk/registrationThunk";

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const OtpDialogBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");

  const getDialogBox = useSelector(getDialogBoxSelector);
  const getUserProfile = useSelector(getUserProfileSelector);
  const getMsg = useSelector(getMsgSelector);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOtp(e.target.value);
  };

  const handleCancelDialog = () => {
    dispatch(openDialogBox({ dialogName: "" }));
  };

  const handleSubmit = async () => {
    dispatch(openDialogBox({ dialogName: "" }));
    const otpObj = {
      email: getUserProfile?.email,
      otp: otp,
    };
    await dispatch(
      submitRegistrationOtpThunk({
        uri: "/otpVerify",
        data: otpObj,
      })
    );
    getUserProfile?.status === userStatus.verified && !getMsg.errorMsg
      ? navigate("/dashboard")
      : null;
  };

  return (
    <Dialog
      open={getDialogBox === dialogName.otpDialogBox}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancelDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">OTP</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter 6 digit OTP recieved on your registered email ID
        </DialogContentText>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Enter OTP"
            value={otp}
            onChange={(e) => handleInput(e)}
          />
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancelDialog}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
