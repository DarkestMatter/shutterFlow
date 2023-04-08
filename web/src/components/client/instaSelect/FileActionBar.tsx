import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const FileActionBar: React.FC = () => {
  return (
    <Grid container justifyContent="right">
      <Grid item xs={12}>
        <FavoriteBorderIcon />
      </Grid>
    </Grid>
  );
};
