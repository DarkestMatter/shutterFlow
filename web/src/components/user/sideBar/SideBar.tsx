import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const sideBarList = ["Client", "Collections", "Settings"];

export const SideBarItemStyled = styled.span`
  margin-top: -10px;
  margin-left: 15px;
  cursor: pointer;
`;

export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [windowHeight, setWindowHeight] = useState<number>();

  const handleMenuClick = (list: string) => {
    navigate("/dashboard");
  };

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  return (
    <Grid container className="sideBarBox" style={{ height: windowHeight }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={12}></Grid>
        </Grid>
        {sideBarList.map((list) => {
          return (
            <>
              {list !== "-" ? (
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: 7,
                    borderBottom: "1px solid gainsboro",
                    width: 120,
                    paddingBottom: 12,
                    marginLeft: 10,
                    cursor: "pointer",
                  }}
                >
                  <SideBarItemStyled onClick={() => handleMenuClick(list)}>
                    {list}
                  </SideBarItemStyled>
                </Grid>
              ) : (
                <Grid item xs={12}></Grid>
              )}
            </>
          );
        })}
      </Grid>
    </Grid>
  );
};
