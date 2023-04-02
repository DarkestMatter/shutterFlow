import Grid from "@mui/material/Grid";
import { Gallery } from "../gallery/Gallery";
import { AddEvent } from "./AddEvent";
import { AddEventDialogBox } from "./AddEventDialogBox";

export const EventDashboard: React.FC = () => {
  return (
    <Grid container>
      <AddEventDialogBox />
      <Grid item xs={2}>
        <AddEvent />
      </Grid>
      <Grid item xs={10}>
        <Gallery />
      </Grid>
    </Grid>
  );
};
