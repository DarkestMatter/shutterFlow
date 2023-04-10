import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { InstaFileBox } from "./InstaFileBox";

export const InstaSelect: React.FC = () => {
  useEffect(() => {
    const element = document.getElementById(
      "ceacc187-89d6-4a0e-8d46-d49b5032244d"
    );
    element?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, []);

  return (
    <Grid container>
      <Grid item xs={0} sm={0} md={3}></Grid>
      <Grid item xs={12} sm={0} md={6}>
        <InstaFileBox />
      </Grid>
    </Grid>
  );
};
