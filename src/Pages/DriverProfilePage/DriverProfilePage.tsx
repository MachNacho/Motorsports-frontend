import { useEffect, useState } from "react";
import { Typography, Grid, CircularProgress, Card, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import type { FullDriverDTO } from "../../types/Driver/FullDriverDTO";
import { driverService } from "../../API/Services/driverService";
import { getRandomDriverPhoto } from "../../utils/PhotoAssigner";
import { getFlag4x3 } from "../../utils/flagUtils";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
/**
 * Profile view for a single driver.
 * Fetches the profile by `driverId` and shows it in a Material‑UI card.
 */

const DriverProfilePage: React.FC = () => {
  const [driver, setDriver] = useState<FullDriverDTO>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigate();
  const { ID } = useParams<{ ID: string }>();
  useEffect(() => {
    const fetchDriverProfile = async (): Promise<void> => {
      try {
        if (ID) {
          const data = await driverService.getById(ID);
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
      {/* Base driver Info */}
      <Typography variant="h1">
        {driver.firstname} {driver.lastname}
      </Typography>
      <Card
        sx={{
          height: 300,
          background: "linear-gradient(135deg, #bacdfbff 0%, #5f5d5dff 100%)",
          padding: 1,
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Grid size={6}>
            <Box
              onClick={() => navigation(`/Team/${driver.teamId}`)}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="h4">{driver.teamName}</Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 50,
              }}
            >
              # {driver.raceNumber}
            </Typography>
            <Typography>DOB: {driver.birthDate}</Typography>
            <Typography>Gender: {driver.gender}</Typography>
          </Grid>
          <Grid size={4}>
            <img
              src={getRandomDriverPhoto(driver.gender)}
              alt={driver.firstname}
              width={330}
            />
          </Grid>
          <Grid size={2}>
            <img
              src={getFlag4x3(driver.code)}
              alt={driver.nationality}
 
            />
            <Typography variant="subtitle2">{driver.nationality}</Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Info card */}
      <Card
        sx={{
          marginTop: 1,
          padding: 1,
          display: "flex",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">
          Get to know {driver.firstname} {driver.lastname}
        </Typography>
        <Typography>
          Jordan “The Bullet” Hayes is a professional race car driver known for
          their fearless precision and relentless pursuit of perfection on the
          track. Starting their career in go-kart racing at the age of 10,
          Jordan quickly rose through the ranks of junior leagues, earning a
          reputation for sharp instincts and tactical brilliance. After debuting
          in the national touring series at just 19, Jordan secured multiple
          podium finishes in their rookie season — a rare feat that caught the
          attention of major racing teams. Over the years, they’ve claimed three
          championship titles, broken several lap-time records, and stood on the
          podium at some of the world’s most prestigious circuits. Beyond the
          stats, Jordan is known for their calm under pressure, commitment to
          teamwork, and continuous push to innovate through data-driven
          performance tuning. Off the track, they mentor young drivers and
          advocate for safety and sustainability in motorsport.
        </Typography>
      </Card>

      {/* Stats card */}
      <Card
        sx={{
          marginTop: 1,
          padding: 1,
          display: "flex",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Stats</Typography>
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Grid size={4}>
            <Box>
              <Typography variant="h6">Wins</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <EmojiEventsIcon />
                <Typography>x1</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box>
              <Typography variant="h6">Podiums</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <EmojiEventsIcon />
                <Typography>x1</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box>
              <Typography variant="h6">Titles</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <StarIcon /> <Typography>x1</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={3}>
            <Box>
              <Typography variant="h6">Poles</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <LooksOneIcon /> <Typography>x1</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={3}>
            <Box>
              <Typography variant="h6">Points</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <LooksOneIcon /> <Typography>x1</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={3}>
            <Box>
              <Typography variant="h6">Race starts</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <SportsScoreIcon /> <Typography>x1</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={3}>
            <Box>
              <Typography variant="h6">Laps led</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <LooksOneIcon /> <Typography>x1</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default DriverProfilePage;
