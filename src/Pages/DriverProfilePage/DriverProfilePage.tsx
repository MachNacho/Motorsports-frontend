import { Typography, Grid, CircularProgress, Card, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import type { FullDriverDTO } from "../../types/Driver/FullDriverDTO";
import { driverService } from "../../API/Services/driverService";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
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
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        gutterBottom
        color="text.primary"
      >
        {driver.firstname} {driver.middleName} {driver.lastname}
      </Typography>

      <Card
        sx={{
          backgroundImage: `url(/DRSPIC.webp)`,
          backgroundBlendMode: "multiply",
          backgroundColor: driver.colour ?? "#ca0500",
          transition: "all 0.4s ease-in-out",
          backgroundSize: "100% 200%",
          "&:hover": {
            backgroundPosition: "100% 0%",
            boxShadow: 6,
          },
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
                fontSize: 40,
              }}
            >
              # {driver.raceNumber}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              DOB: {driver.birthDate}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Gender: {driver.gender}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Box
              component={"img"}
              src={driver.imageURL}
              alt={driver.firstname}
              width={330}
            />
          </Grid>
          <Grid size={2}>
            <Box
              component={"img"}
              src={`https://flagcdn.com/${driver.code}.svg`}
              alt={driver.nationality}
              style={{ borderRadius: 6 }}
              width={"30%"}
            />
            <Typography variant="subtitle2">{driver.nationality}</Typography>
          </Grid>
        </Grid>
      </Card>
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <Grid
          size={8}
          sx={{
            p: 1,
          }}
        >
          <Typography variant="h2" gutterBottom color="text.primary">
            About {driver.firstname} {driver.middleName} {driver.lastname}
          </Typography>
          <Box
            sx={(theme) => ({
              ...theme.typography.body1,
              color: "text.primary",
              whiteSpace: "pre-line",
            })}
          >
            {driver.description}
          </Box>
        </Grid>
        <Grid
          size={4}
          sx={{
            backgroundImage: `url(/DRSPIC.webp)`,
            backgroundBlendMode: "multiply",
            backgroundColor: driver.colour ?? "#ca0500",
            backgroundSize: "200% 200%",
            backgroundPosition: "20% 0%",
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography variant="h2" color="text.primary">
            Stats
          </Typography>

          <Grid container spacing={2}>
            <Grid size={6} sx={{ borderRight: "solid #ffffffff" }}>
              <Typography color="text.primary">
                <EmojiEventsIcon />
                Career Wins
              </Typography>
              <Typography variant="h3" color="text.primary">
                x {driver.raceWins}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography color="text.primary">
                <EmojiEventsIcon />
                Career Podiums
              </Typography>
              <Typography variant="h3" color="text.primary">
                x {driver.racePodiums}
              </Typography>
            </Grid>
            <Grid size={6} sx={{ borderRight: "solid #ffffffff" }}>
              <Typography color="text.primary">
                <StarIcon />
                Career Titles
              </Typography>
              <Typography variant="h3" color="text.primary">
                x {driver.championshipTitles}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography color="text.primary">
                <LooksOneIcon />
                Career Poles
              </Typography>
              <Typography variant="h3" color="text.primary">
                x {driver.racePole}
              </Typography>
            </Grid>
            <Grid size={6} sx={{ borderRight: "solid #ffffffff" }}>
              <Typography color="text.primary">
                <ScoreboardIcon />
                Points this season
              </Typography>
              <Typography variant="h3" color="text.primary">
                x {driver.careerPoints}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography color="text.primary">
                <SportsScoreIcon />
                Career Races
              </Typography>
              <Typography variant="h3" color="text.primary">
                x {driver.racesParticipated}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography color="text.primary">
                <RotateRightIcon />
                Career Laps led
              </Typography>
              <Typography variant="h3" color="text.primary">
                x {driver.raceLapsLed}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DriverProfilePage;
