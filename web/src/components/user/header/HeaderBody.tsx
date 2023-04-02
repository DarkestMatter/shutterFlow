import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { currentProfileTypeSelector } from "../../../selectors/currentProfileSelector";
import {
  getClientProfileSelector,
  getMsgSelector,
  getUserProfileSelector,
  isValidTokenSelector,
} from "../../../selectors/selectors";
import { customerType } from "../../../services/enum";
import { AppDispatch } from "../../../store";

export const HeaderBody: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const currentProfileType = useSelector(currentProfileTypeSelector);

  const [headerColor, setHeaderColor] = useState<string>("#fff");

  const handleLogoClick = () => {
    if (currentProfileType === customerType.client) {
      navigate("/client");
    } else if (currentProfileType === customerType.user) {
      navigate("/dashboard");
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setHeaderColor(() => (position > 90 ? "#fff" : "#fff"));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const HeaderFixed = styled.div`
    position: fixed;
    width: 100%;
    height: 65px;
    z-index: 5;
    margin-bottom: 150px;
    background-color: ${headerColor};
    box-shadow: 0 1px 10px 1px gainsboro;
  `;

  const HeaderLogo = styled.img`
    width: 150px;
    margin-top: 10px;
    margin-left: 5px;
  `;

  return (
    <Grid container style={{ marginBottom: 70 }}>
      <Grid item xs={12}>
        <HeaderFixed
          style={{ transition: "background-color 1s ease !important" }}
        >
          <Grid item xs={12} container>
            <Grid item xs={6}>
              {/* <HeaderLogo
                src={`${envProp.imgApi}/mnr_logo.png`}
                onClick={handleLogoClick}
              /> */}
              <h4 style={{ marginLeft: 15 }} onClick={handleLogoClick}>
                Shutter Flow
              </h4>
            </Grid>
          </Grid>
        </HeaderFixed>
      </Grid>
    </Grid>
  );
};
