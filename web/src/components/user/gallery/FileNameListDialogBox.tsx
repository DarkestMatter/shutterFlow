import { Slide } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientLikedFileListSelector,
  getDialogBoxSelector,
} from "../../../selectors/selectors";
import { dialogName } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { AppDispatch } from "../../../store";

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FileNameListDialogBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getDialogBox = useSelector(getDialogBoxSelector);
  const getClientLikedFileList = useSelector(getClientLikedFileListSelector);

  const handleCancelDialog = () => {
    dispatch(openDialogBox({ dialogName: "" }));
  };

  return (
    <Dialog
      open={getDialogBox === dialogName.fileNameListDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancelDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">File Name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {getClientLikedFileList?.map((file) => {
            return `${file?.name}, `;
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancelDialog}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
