import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { currentProfileTypeSelector } from "../../../selectors/currentProfileSelector";
import { customerType } from "../../../services/enum";
import { AppDispatch } from "../../../store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const HeaderBody: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const currentProfileType = useSelector(currentProfileTypeSelector);

  const [headerColor, setHeaderColor] = useState<string>("#fff");
  const [boxShadow, setBoxShadow] = useState<string>("#fff");

  const handleLogoClick = () => {
    if (currentProfileType === customerType.client) {
      navigate("/client");
    } else if (currentProfileType === customerType.user) {
      navigate("/dashboard");
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setHeaderColor(() =>
      position > 90
        ? "#fff"
        : currentProfileType === customerType.user
        ? "#fff"
        : "none"
    );
    setBoxShadow(() =>
      position > 90
        ? "0 1px 10px 1px gainsboro"
        : currentProfileType === customerType.user
        ? "0 1px 10px 1px gainsboro"
        : "none"
    );
  };

  const handleGoToLiked = () => {
    navigate("/liked");
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
    box-shadow: ${boxShadow};
  `;

  const HeaderLogo = styled.img`
    width: 150px;
    margin-top: 10px;
    margin-left: 5px;
  `;

  return (
    <Grid
      container
      className={
        currentProfileType === customerType.user
          ? "headerBottomPadding"
          : "headerBottomPaddingNone"
      }
    >
      <Grid item xs={12}>
        <HeaderFixed
          style={{ transition: "background-color 1s ease !important" }}
        >
          <Grid item xs={12} container>
            <Grid item xs={9}>
              {/* <HeaderLogo
                src={`${envProp.imgApi}/mnr_logo.png`}
                onClick={handleLogoClick}
              /> */}
              <h4 style={{ marginLeft: 15 }} onClick={handleLogoClick}>
                Shutter Flow
              </h4>
            </Grid>
            {currentProfileType === customerType.client && (
              <Grid container item xs={3} justifyContent="right">
                <FavoriteBorderIcon
                  style={{ marginTop: 20, marginRight: 20, cursor: "pointer" }}
                  onClick={handleGoToLiked}
                />
              </Grid>
            )}
          </Grid>
        </HeaderFixed>
      </Grid>
    </Grid>
  );
};
