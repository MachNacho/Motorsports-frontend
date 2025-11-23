import { Box, Grid, Typography } from "@mui/material";
import driver from "../../assets/mattia-colnaghi-wins-the-2025-eurocup3-drivers-championship-in-jerez.avif";
import team from "../../assets/F12306_154948_67A1329.webp";
import circut from "../../assets/barcelona-catalunya-circuit.webp";
import Section from "./Components/Section";

const LandingPage: React.FC = () => {
  return (
    <>
      <Box sx={{ width: "100%", p: 3 }}>
        {/* Page Title */}
        <Typography
          variant="h2"
          color="white"
          sx={{ fontWeight: 700, textAlign: "center", mb: 6 }}
        >
          Welcome to the Motorsports Website
        </Typography>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Section
              title="Drivers"
              img={driver}
              imgLeft={true}
              text="Explore the profiles of top motorsport drivers, including history, achievements, championship, and more."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <Section
              title="Teams"
              img={team}
              imgLeft={false}
              text="Discover the teams powering each season. Learn about their vehicles, driver lineups, and performance statistics."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <Section
              title="Circuts"
              img={circut}
              imgLeft={true}
              text="Browse through legendary race circuits from around the world past, present, and future with track layouts, sector analysis, and data."
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
