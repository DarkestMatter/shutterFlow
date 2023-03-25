import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { uploadFileApi } from "../../../api/uploadFileApi";

export const UploadFile: React.FC = () => {
  const dispatch = useDispatch();

  const uploadFile = async (fileVal: Blob) => {
    const formData = new FormData();
    formData.append("myImage", fileVal);
    const token = localStorage.getItem("token");
    await axios
      .post(`http://192.168.29.52:4000/api/uploadFile`, formData, {
        headers: { authorisation: `${token}` },
      })
      .then((response) => {
        console.log(response?.data);
      });
    // const apiResp = await uploadFileApi({
    //   dispatch: dispatch,
    //   uri: "uploadFile",
    //   data: formData,
    // });
  };

  const handleUpload = (files: ChangeEvent<HTMLInputElement>) => {
    files?.target?.files;
    if (files?.target?.files) {
      uploadFile(files?.target?.files[0]);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <input
          onChange={handleUpload}
          name="file"
          type="file"
          accept="image/*"
          multiple
        />
      </Grid>
    </Grid>
  );
};
