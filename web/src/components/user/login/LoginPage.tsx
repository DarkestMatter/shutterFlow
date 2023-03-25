import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../api/loginApi";
import { IUserProfile } from "../../../interfaces/IUserProfile";
import {
  getMsgSelector,
  getUserProfileSelector,
} from "../../../selectors/selectors";
import { dialogName, userStatus } from "../../../services/enum";
import { openDialogBox } from "../../../slices/common/dialogBoxSlice";
import { AppDispatch } from "../../../store";
import { OtpDialogBox } from "../registeration/OtpDialogBox";

const inputFieldStyle = {
  input: { fontSize: 22, backgroundColor: "#fff" },
  fieldset: { borderColor: "#a8a6a6 !important" },
  label: { color: "#484444 !important", fontSize: 18 },
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const getMsg = useSelector(getMsgSelector);
  const getUserProfile = useSelector(getUserProfileSelector);

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
    }
  };

  const handleLogin = async () => {
    const apiResp = (await loginApi({
      dispatch: dispatch,
      uri: "loginUser",
      data: { email: email, pwd: pwd },
    })) as IUserProfile;
    apiResp?.status === userStatus.registered
      ? dispatch(openDialogBox({ dialogName: dialogName.otpDialog }))
      : navigate("/dashboard");
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
        <Button variant="outlined" onClick={handleLogin}>
          Login
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
          {`Don't have an account? `}
          <a className="anchorText hand" onClick={() => navigate("/register")}>
            Register
          </a>
        </span>
      </Grid>
    </Grid>
  );
};
