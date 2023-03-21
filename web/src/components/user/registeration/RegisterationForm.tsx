import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUserProfile } from "../../../interfaces/IUserProfile";
import { AppDispatch } from "../../../store";
import { submitRegistrationFormThunk } from "../../../thunk/registrationThunk";
import { OtpDialogBox } from "./OtpDialogBox";

const inputFieldStyle = {
  input: { fontSize: 22, backgroundColor: "#fff" },
  fieldset: { borderColor: "#a8a6a6 !important" },
  label: { color: "#484444 !important", fontSize: 18 },
};

export const RegisterationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [studioName, setStudioName] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    valueKey: string
  ) => {
    switch (true) {
      case valueKey === "email":
        setEmail(e.target.value);
        break;
      case valueKey === "pwd":
        setPwd(e.target.value);
        break;
      case valueKey === "studioName":
        setStudioName(e.target.value);
        break;
      case valueKey === "mobile":
        setMobile(e.target.value);
    }
  };

  const handleRegistration = async () => {
    const formObj: IUserProfile = {
      studioName: studioName,
      email: email,
      mobile: mobile,
      pwd: pwd,
    };
    await dispatch(
      submitRegistrationFormThunk({
        uri: "/registerUser",
        data: formObj,
      })
    );
  };

  return (
    <Grid container className="centerDiv">
      <OtpDialogBox />
      <Grid item xs={12} display="flex" justifyContent="center">
        <h1 className="ShutterFlowTitleText">Shutter Flow</h1>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center" margin={1}>
        <Grid container columns={24}>
          <Grid item xs={2} sm={4} md={8} xl={9}></Grid>
          <Grid item xs={20} sm={16} md={8} xl={6}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={(e) => handleInputChange(e, "studioName")}
              label="Enter Studio/Business Name"
              value={studioName}
              sx={inputFieldStyle}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center" margin={1}>
        <Grid container columns={24}>
          <Grid item xs={2} sm={4} md={8} xl={9}></Grid>
          <Grid item xs={20} sm={16} md={8} xl={6}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={(e) => handleInputChange(e, "email")}
              label="Enter email"
              value={email}
              sx={inputFieldStyle}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center" margin={1}>
        <Grid container columns={24}>
          <Grid item xs={2} sm={4} md={8} xl={9}></Grid>
          <Grid item xs={20} sm={16} md={8} xl={6}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={(e) => handleInputChange(e, "mobile")}
              label="Enter 10 digit Mobile no"
              value={mobile}
              sx={inputFieldStyle}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center" margin={1}>
        <Grid container columns={24}>
          <Grid item xs={2} sm={4} md={8} xl={9}></Grid>
          <Grid item xs={20} sm={16} md={8} xl={6}>
            <TextField
              variant="outlined"
              onChange={(e) => handleInputChange(e, "pwd")}
              type="password"
              fullWidth
              label="Enter 8 characters long password"
              value={pwd}
              sx={inputFieldStyle}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center" margin={2}>
        <Button variant="outlined" onClick={handleRegistration}>
          Submit
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        color="GrayText"
        margin={2}
      >
        <span>
          {"Already have an account? "}
          <a className="anchorText hand" onClick={() => navigate("/login")}>
            Log in
          </a>
        </span>
      </Grid>
    </Grid>
  );
};
