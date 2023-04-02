import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { api } from "../../../env";
import { ClientTiles } from "./ClientTiles";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <ClientTiles />
      </Grid>
    </Grid>
  );
};
