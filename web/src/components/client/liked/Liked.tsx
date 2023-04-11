import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedFilesApi } from "../../../api/getLikedFilesApi";
import { getClientProfileSelector } from "../../../selectors/selectors";
import { AppDispatch } from "../../../store";
import { ClientGallery } from "../gallery/ClientGallery";

export const Liked: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getClientProfile = useSelector(getClientProfileSelector);

  const getLikedFileList = async () => {
    await getLikedFilesApi({
      dispatch: dispatch,
      uri: "getLikedFiles",
      data: {},
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getLikedFileList();
  }, []);

  return (
    <Grid container xs={12} style={{ marginTop: 80 }}>
      <Grid item xs={12}>
        <ClientGallery likedGallery={true} />
      </Grid>
    </Grid>
  );
};
