import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventApi } from "../../../api/addEventApi";
import { IEvent } from "../../../interfaces/IEvent";
import {
  getDialogBoxSelector,
  getSelectedClientSelector,
} from "../../../selectors/selectors";
import { dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { Transition } from "../registeration/OtpDialogBox";

export const AddEventDialogBox: React.FC = () => {
  const dispatch = useDispatch();

  const [eventName, setEventName] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");

  const getDialogBox = useSelector(getDialogBoxSelector);
  const selectedClient = useSelector(getSelectedClientSelector);

  const handleCancelDialog = () => {
    dispatch(openDialogBox({ dialogName: "" }));
  };

  const handleOnBlur = (fieldName: string) => {};

  const handleAddEventSubmit = async () => {
    const addClientFormData: IEvent = {
      eventName: eventName,
      clientName: selectedClient?.clientName,
      clientId: selectedClient?.clientId,
    };
    dispatch(openDialogBox({ dialogName: "" }));
    const apiResp = await addEventApi({
      dispatch: dispatch,
      uri: "addEvent",
      data: addClientFormData,
    });
  };

  return (
    <Dialog
      open={getDialogBox === dialogName.addEventDialog}
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
        Add Event
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign="center">
          Fill the form to Add New Event
        </DialogContentText>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="clientNameInput"
                value={eventName}
                label="Enter Event Name"
                onChange={(e) => setEventName(e.target.value)}
                onBlur={() => handleOnBlur("EventName")}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="clientEventType"
                value={eventDate}
                label="Enter Event Date"
                onChange={(e) => setEventDate(e.target.value)}
                onBlur={() => handleOnBlur("eventDate")}
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
        <Button onClick={handleAddEventSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
