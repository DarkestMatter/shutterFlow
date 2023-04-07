import Grid from "@mui/material/Grid";
import { ClientGallery } from "../gallery/ClientGallery";
import { EventNameListBar } from "./EventNameListBar";
import { LandingImage } from "./LandingImage";

export const ClientDashboard: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <LandingImage />
        <EventNameListBar />
        <ClientGallery />
      </Grid>
    </Grid>
  );
};
