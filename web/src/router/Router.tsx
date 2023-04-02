import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ClientDashboard } from "../components/client/dashboard/ClientDashboard";
import { TokenValidator } from "../components/common/TokenValidator";
import { Dashboard } from "../components/user/dashboard/Dashboard";
import { EventDashboard } from "../components/user/event/EventDashboard";
import { HeaderBody } from "../components/user/header/HeaderBody";
import { Login } from "../components/user/login/Login";
import { Registration } from "../components/user/registeration/Registration";
import { SideBar } from "../components/user/sideBar/SideBar";
import {
  getClientProfileSelector,
  getUserProfileSelector,
  isLoadingSelector,
} from "../selectors/selectors";
import { userStatus } from "../services/enum";
import "./router.css";

export const Router: React.FC = () => {
  const isLoading = useSelector(isLoadingSelector);
  const getUserProfile = useSelector(getUserProfileSelector);
  const getClientProfile = useSelector(getClientProfileSelector);

  return (
    <BrowserRouter>
      <TokenValidator />
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {getUserProfile?.status === userStatus.verified ||
      getClientProfile?.status === userStatus.verified ? (
        <Grid item xs={0} md={4} xl={3}>
          <HeaderBody />
        </Grid>
      ) : (
        <div style={{ marginBottom: "5%" }}></div>
      )}
      <Grid container columns={24}>
        {getUserProfile?.status === userStatus.verified ? (
          <Grid
            item
            xs={0}
            md={4}
            xl={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <SideBar />
          </Grid>
        ) : (
          <Grid
            item
            xs={0}
            md={2}
            xl={1}
            sx={{ display: { xs: "none", md: "block" } }}
          ></Grid>
        )}
        <Grid item xs={24} md={20} xl={21}>
          <div className="paddingTop20">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/eventDashboard" element={<EventDashboard />} />
              <Route path="/client" element={<ClientDashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
};
