import Grid from "@mui/material/Grid";
import { GalleryHeader } from "./GalleryHeader";
import { GalleryList } from "./GalleryList";
import { UploadFile } from "./UploadFile";

export const Gallery: React.FC = () => {
  return (
    <Grid container>
      <UploadFile />
      <GalleryHeader />
      <GalleryList />
    </Grid>
  );
};
