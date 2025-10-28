import type React from "react";
import type { DriverDTO } from "../../types/Driver/DriverDTO";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { driverService } from "../../API/Services/driverService";
import { getRandomDriverPhoto } from "../../utils/PhotoAssigner";
import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { QUERY_KEYS } from "../../Constants/queryKeys";

const AllDriversPage: React.FC = () => {
  const navigation = useNavigate();

  const {
    data: drivers,
    isLoading,
    isError,
    error,
  } = useQuery<DriverDTO[]>({
    queryKey: QUERY_KEYS.DRIVERS.LIST,
    queryFn: driverService.getAll,
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
    retry: QUERY_CONFIG.RETRY,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    console.error("Failed to fetch drivers:", error);
    return (
      <Typography color="error" align="center" mt={5}>
        Failed to load driver data. Please try again later.
      </Typography>
    );
  }

  if (!drivers || drivers.length === 0) {
    return (
      <Typography variant="h6" align="center" mt={5}>
        No drivers available.
      </Typography>
    );
  }

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
          justifyContent: "center",
          gap: 3.75,
        }}
      >
        {drivers.map((driver) => (
          <Card
            key={driver.id}
            onClick={() => navigation(`/Driver/${driver.id}`)}
            sx={{
              cursor: "pointer",
              width: { sm: "100%", md: 476 },
              height: 256,
              transition: "all 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 6,
                background: "linear-gradient(135deg, #dfe7fd 0%, #8b1a1a 100%)",
              },
              background:
                "linear-gradient(135deg, #bacdfbff 0%, #471e1eff 100%)",
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                {/* Left */}
                <Grid size={7}>
                  <Typography variant="h5">{driver.firstname}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {driver.lastname}
                  </Typography>
                  <Typography variant="subtitle2">{driver.teamName}</Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontStyle: "italic",
                      fontSize: 20,
                    }}
                  >
                    # {driver.raceNumber}
                  </Typography>
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
        ))}
      </Box>
    </>
  );
};

export default AllDriversPage;
