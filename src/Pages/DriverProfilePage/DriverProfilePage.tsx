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
import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { QUERY_KEYS } from "../../Constants/queryKeys";
/**
 * Profile view for a single driver.
 * Fetches the profile by `driverId` and shows it in a Material‑UI card.
 */

const DriverProfilePage: React.FC = () => {
  const navigation = useNavigate();
  const { ID } = useParams<{ ID: string }>();

  const {
    data: driver,
    isLoading,
    isError,
  } = useQuery<FullDriverDTO>({
    queryKey: QUERY_KEYS.DRIVERS.DETAILS(ID ?? ""),
    queryFn: () => driverService.getById(ID!),
    enabled: !!ID,
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
  });

  // --------------------------- UI states -----------------------------------
  if (isLoading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (isError || !driver) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ mt: 4, textAlign: "center" }}
      >
        Driver not found or failed to load.
      </Typography>
    );
  }

  // --------------------------- Profile Card --------------------------------
  return (
    <>
      {/* Base driver Info */}
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        {driver.firstname} {driver.lastname}
      </Typography>

      <Card
        sx={{
          background: "linear-gradient(135deg, #bacdfbff 0%, #5f5d5dff 100%)",
          height: 300,
          p: 2,
          mb: 2,
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
              <Typography variant="h5" fontWeight="bold">
                {driver.teamName}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 36,
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
              style={{ borderRadius: 6 }}
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
        <Typography variant="h5" gutterBottom>
          About {driver.firstname} {driver.lastname}
        </Typography>
        <Typography variant="body1" color="text.secondary">
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
        <Typography variant="h5" gutterBottom>
          Stats
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: "Wins", icon: <EmojiEventsIcon />, value: 1 },
            { label: "Podiums", icon: <EmojiEventsIcon />, value: 1 },
            { label: "Titles", icon: <StarIcon />, value: 1 },
            { label: "Poles", icon: <LooksOneIcon />, value: 1 },
            { label: "Points", icon: <LooksOneIcon />, value: 1 },
            { label: "Race Starts", icon: <SportsScoreIcon />, value: 1 },
            { label: "Laps Led", icon: <LooksOneIcon />, value: 1 },
          ].map((stat) => (
            <Grid size={4} key={stat.label}>
              <Box display="flex" alignItems="center" gap={1}>
                {stat.icon}
                <Typography variant="body1">
                  {stat.label}: x{stat.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default DriverProfilePage;
