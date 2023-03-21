import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

const sideBarList = ["Client", "Collections", "Settings"];

const SideBarItemStyled = styled.span`
  margin-top: -10px;
  margin-left: 15px;
  cursor: pointer;
`;

export const SideBar: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>();
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  return (
    <Grid
      container
      style={{
        position: "fixed",
        maxWidth: 150,
        boxShadow: "gainsboro 0px 10px 10px 1px",
        backgroundColor: "#fff",
        color: "#515451",
        height: windowHeight,
      }}
    >
      <Grid container style={{ marginTop: 10 }}>
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
                    <SideBarItemStyled>{list}</SideBarItemStyled>
                  </Grid>
                ) : (
                  <Grid item xs={12}></Grid>
                )}
              </>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};
