import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { GetDriverProfile } from "./Services/APIDriverProfile";
import type { DriverProfile } from "./Services/Interface/DriverProfile";

/**
 * Profile view for a single driver.
 * Fetches the profile by `driverId` and shows it in a Material‑UI card.
 */
const DriverProfilePage: React.FC<{ driverId: string }> = ({ driverId }) => {
  const [driver, setDriver] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDriverProfile = async (): Promise<void> => {
      try {
        const data = await GetDriverProfile(driverId);
        setDriver(data);
      } catch (error) {
        console.error("Failed to fetch driver:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverProfile();
  }, [driverId]);

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
      <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: "center" }}>
        Driver not found.
      </Typography>
    );
  }

  // --------------------------- Profile Card --------------------------------
  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 2 }} elevation={3}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {driver.firstName?.[0]}
            {driver.lastName?.[0]}
          </Avatar>
        }
        title={`${driver.firstName} ${driver.lastName}`}
        subheader={`Race #${driver.raceNumber}`}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Nationality: {driver.nationality.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Date of Birth: {new Date(driver.birthDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Gender: {driver.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Team: {driver.team.teamName}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          size="small"
          disableElevation
        >
          View Stats
        </Button>
      </CardActions>
    </Card>
  );
};

export default DriverProfilePage;
