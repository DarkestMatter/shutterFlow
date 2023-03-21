import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField/TextField";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IClientData } from "../../../interfaces/IClient";
import {
  getUserProfileSelector,
  getDialogBoxSelector,
  getMsgSelector,
} from "../../../selectors/selectors";
import { dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { AppDispatch } from "../../../store";
import { addClientThunk } from "../../../thunk/addClientThunk";
import { Transition } from "../registeration/OtpDialogBox";

export const AddClientDialogBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const clientNameRef = useRef<HTMLInputElement>();
  const clientMobileNoRef = useRef<HTMLInputElement>();
  const eventTypeRef = useRef<HTMLInputElement>();

  const getUserProfile = useSelector(getUserProfileSelector);
  const getDialogBox = useSelector(getDialogBoxSelector);
  const getMsg = useSelector(getMsgSelector);

  const handleOnBlur = (fieldName: string) => {};

  const handleAddClientSubmit = async () => {
    const addClientFormData: IClientData = {
      clientName: clientNameRef?.current?.value,
      clientMobileNo: clientMobileNoRef?.current?.value,
      eventType: eventTypeRef?.current?.value,
      clientOwnerId: getUserProfile.userId,
      clientOwnerEmail: getUserProfile.email,
    };
    dispatch(openDialogBox({ dialogName: "" }));
    await dispatch(
      addClientThunk({
        uri: "addClient",
        data: addClientFormData,
      })
    );
    !getMsg.errorMsg ? navigate("/eventDashboard") : null;
  };

  const handleCancelDialog = () => {
    dispatch(openDialogBox({ dialogName: "" }));
  };

  return (
    <Dialog
      open={getDialogBox === dialogName.addClientDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancelDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="responsive-dialog-title"
        textAlign="center"
        style={{
          backgroundColor: "#e4e4e4",
          marginBottom: 15,
          fontWeight: 600,
        }}
      >
        Add Client
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign="center">
          Fill the form to Add New Client
        </DialogContentText>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="clientNameInput"
                inputRef={clientNameRef}
                label="Enter Client Name"
                onBlur={() => handleOnBlur("clientName")}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="clientMobileNoInput"
                inputRef={clientMobileNoRef}
                label="Enter Client Mobile Number"
                onBlur={() => handleOnBlur("clientMobileNo")}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="clientEventType"
                inputRef={eventTypeRef}
                label="Enter Client Event"
                onBlur={() => handleOnBlur("eventType")}
                fullWidth
              ></TextField>
            </Grid>
          </Grid>
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancelDialog}>
          Cancel
        </Button>
        <Button onClick={handleAddClientSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
