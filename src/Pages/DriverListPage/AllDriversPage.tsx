import type React from "react";
import type { DriverDTO } from "../../types/Driver/DriverDTO";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { driverService } from "../../API/Services/driverService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { useState } from "react";
import { PAGE_SIZE } from "../../Constants/constants";

const AllDriversPage: React.FC = () => {
  const navigation = useNavigate();

  // Local UI pagination state
  const [page, setPage] = useState(1);

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
  // Calculate pagination boundaries:
  // current slice of tracks to display on screen
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const paginatedDrivers = drivers.slice(startIdx, endIdx);

  return (
    <>
      <Typography variant="h1" align="center" color="white">
        Drivers {new Date().getFullYear()}
      </Typography>

      {/* Pagination control */}
      <Box
        display="flex"
        justifyContent="center"
        mt={4}
        sx={{ marginBottom: 1 }}
      >
        <Pagination
          count={Math.ceil(drivers.length / PAGE_SIZE)} // total pages
          page={page} // current page
          onChange={(_, value) => setPage(value)} // update state
          color="primary"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3.75,
        }}
      >
        {paginatedDrivers.map((driver) => (
          <Card
            key={driver.id}
            onClick={() => navigation(`/Driver/${driver.id}`)}
            sx={{
              cursor: "pointer",
              width: { sm: "100%", md: 700 },
              height: 256,
              backgroundImage: `url(/DRSPIC.webp)`,
              backgroundBlendMode: "multiply",
              backgroundColor: driver.colour ?? "#ca0500",
              transition: "all 0.4s ease-in-out",
              backgroundSize: "200% 200%",
              "&:hover": {
                backgroundPosition: "100% 0%",
              },
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                {/* Left */}
                <Grid size={7}>
                  <Typography variant="h4" color="white">
                    {driver.firstname}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="white">
                    {driver.lastname}
                  </Typography>
                  <Typography variant="subtitle2" color="white">
                    {driver.teamName}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontStyle: "italic",
                      fontSize: 40,
                    }}
                    color="white"
                  >
                    # {driver.raceNumber}
                  </Typography>
                </Grid>
                {/* Left */}
                <Grid size={5}>
                  <Box
                    component={"img"}
                    src={driver.imageURL}
                    alt={driver.firstname}
                    width={270}
                  />
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
