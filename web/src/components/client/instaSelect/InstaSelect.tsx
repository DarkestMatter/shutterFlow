import Grid from "@mui/material/Grid";
import { InstaFileBox } from "./InstaFileBox";

export const InstaSelect: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={0} sm={0} md={3}></Grid>
      <Grid item xs={12} sm={0} md={6}>
        <InstaFileBox />
      </Grid>
    </Grid>
  );
};
