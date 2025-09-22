import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import { GetDriverProfile } from "./Services/APIDriverProfile";
import type { Driverprofileinterface } from "./Services/Interface/DriverProfile";
import { useParams } from "react-router-dom";

/**
 * Profile view for a single driver.
 * Fetches the profile by `driverId` and shows it in a Material‑UI card.
 */

const DriverProfilePage: React.FC = () => {
  const [driver, setDriver] = useState<Driverprofileinterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { ID } = useParams<{ ID: string }>();
  useEffect(() => {
    const fetchDriverProfile = async (): Promise<void> => {
      try {
        if (ID) {
          const data = await GetDriverProfile(ID);
          setDriver(data);
        }
      } catch (error) {
        console.error("Failed to fetch driver:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverProfile();
  }, [ID]);

  // --------------------------- UI states -----------------------------------
  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!driver) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ mt: 4, textAlign: "center" }}
      >
        Driver not found.
      </Typography>
    );
  }

  // --------------------------- Profile Card --------------------------------
  return (
    <>
      <Stack
        direction="column"
        spacing={0}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box bgcolor={"red"}>dfffffffffffffffffffff</Box>
        <Box bgcolor={"yellow"}>sffffffffffffffffffffffffffffff</Box>
      </Stack>
    </>
  );
};

export default DriverProfilePage;
