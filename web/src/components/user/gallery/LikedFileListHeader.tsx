import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { AppDispatch } from "../../../store";

export const LikedFileListHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleShowLikedFileName = () =>
    dispatch(openDialogBox({ dialogName: dialogName.fileNameListDialog }));

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      style={{ marginBottom: 10 }}
    >
      <Grid item xs={6}>
        <Button
          className="smallBtn"
          variant="outlined"
          onClick={handleShowLikedFileName}
        >
          Show File Name
        </Button>
      </Grid>
    </Grid>
  );
};
