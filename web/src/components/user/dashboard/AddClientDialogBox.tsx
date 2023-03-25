import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClientApi } from "../../../api/addClientApi";
import { IClientData } from "../../../interfaces/IClient";
import {
  getDialogBoxSelector,
  getMsgSelector,
  getUserProfileSelector,
} from "../../../selectors/selectors";
import { dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { Transition } from "../registeration/OtpDialogBox";

export const AddClientDialogBox: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState<string>("");
  const [clientMobileNo, setClientMobileNo] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");

  const getUserProfile = useSelector(getUserProfileSelector);
  const getDialogBox = useSelector(getDialogBoxSelector);

  const handleOnBlur = (fieldName: string) => {};

  const handleAddClientSubmit = async () => {
    const addClientFormData: IClientData = {
      clientName: clientName,
      clientMobileNo: clientMobileNo,
      eventType: eventType,
      clientOwnerId: getUserProfile.userId,
      clientOwnerEmail: getUserProfile.email,
    };
    dispatch(openDialogBox({ dialogName: "" }));
    const apiResp = await addClientApi({
      dispatch: dispatch,
      uri: "addClient",
      data: addClientFormData,
    });
    apiResp ? navigate("/eventDashboard") : null;
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
                value={clientName}
                label="Enter Client Name"
                onChange={(e) => setClientName(e.target.value)}
                onBlur={() => handleOnBlur("clientName")}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="clientMobileNoInput"
                value={clientMobileNo}
                label="Enter Client Mobile Number"
                onChange={(e) => setClientMobileNo(e.target.value)}
                onBlur={() => handleOnBlur("clientMobileNo")}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="clientEventType"
                value={eventType}
                label="Enter Client Event"
                onChange={(e) => setEventType(e.target.value)}
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
