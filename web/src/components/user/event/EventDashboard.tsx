import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedClient } from "../../../selectors/selectors";
import { dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { AppDispatch } from "../../../store";
import { Gallery } from "../gallery/Gallery";
import { AddEventDialogBox } from "./AddEventDialogBox";

export const EventDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedClient = useSelector(getSelectedClient);

  const handleAddEvent = () =>
    dispatch(openDialogBox({ dialogName: dialogName.addEventDialog }));

  return (
    <Grid container>
      <AddEventDialogBox />
      <Grid item xs={3}>
        <Grid item xs={12}>
          {selectedClient?.eventList?.map((event) => {
            return (
              <Grid container key={event?.eventName}>
                <Grid item xs={12}>
                  {event?.eventName}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleAddEvent} variant="outlined">
            Add Event
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Gallery />
      </Grid>
    </Grid>
  );
};
