import type React from "react";
import { useEffect, useState } from "react";
import type { DriverDTO } from "../../types/Driver/DriverDTO";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { driverService } from "../../API/Services/driverService";
import { getRandomDriverPhoto } from "../../utils/PhotoAssigner";

const AllDriversPage: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverDTO[]>([]);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchAllDrivers = async () => {
      try {
        const data: DriverDTO[] = await driverService.getAll();
        setDrivers(data);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    };
    fetchAllDrivers();
  }, []);

  return (
    <>
      <Typography variant="h1" align="center">
        Drivers {new Date().getFullYear()}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          flexWrap: "wrap",
          justifyContent: "left",
          gap: 3.75,
        }}
      >
        {drivers.length === 0 ? (
          <Typography variant="h1">No results</Typography>
        ) : (
          drivers.map((driver) => (
            <Box
              onClick={() => navigation(`/Driver/${driver.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <Card
                sx={{
                  width: 476,
                  height: 256,
                  background:
                    "linear-gradient(135deg, #bacdfbff 0%, #471e1eff 100%)",
                }}
              >
                <CardContent>
                  <Grid container spacing={2}>
                    {/* Left */}
                    <Grid size={7}>
                      <Typography variant="h4">{driver.firstname}</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {driver.lastname}
                      </Typography>
                      <Typography variant="subtitle2">
                        {driver.teamName}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                          fontSize: 20,
                        }}
                      >
                        # {driver.raceNumber}
                      </Typography>
                      {/* <Tooltip title={`Flag of ${driver.country}`}>
                        <img
                          src={getFlag4x3(driver.code)}
                          alt={driver.country}
                          height={50}
                        />
                      </Tooltip> */}
                    </Grid>
                    {/* Left */}
                    <Grid size={5}>
                      <Box alignContent={"center"}>
                        <img
                          src={getRandomDriverPhoto("Other")}
                          alt={driver.firstname}
                          width={270}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default AllDriversPage;
