import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { trackService } from "../../API/Services/trackService";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { Box, Chip, CircularProgress, Grid, Typography } from "@mui/material";
import { calculateTrackUnits } from "./functions/ExcpectedLaps";

const RaceTrackProfilePage: React.FC = () => {
  const { ID } = useParams<{ ID: string }>();
  const {
    data: track,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.TRACKS.DETAILS(ID ?? ""),
    queryFn: () => trackService.getById(ID!),
    enabled: !!ID,
    staleTime: QUERY_CONFIG.STALE_TIME.LONG,
    retry: QUERY_CONFIG.RETRY,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !track) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ mt: 4, textAlign: "center" }}
      >
        Track not found or failed to load.
      </Typography>
    );
  }

  return (
    <>
      <Typography
        variant="h1"
        align="center"
        fontWeight="bold"
        gutterBottom
        color="text.primary"
      >
        {track.name}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom color="text.primary">
        {track.location}, {track.nationName}
      </Typography>
      <Box
        component={"img"}
        src={`https://flagcdn.com/${track.nationCode}.svg`}
        sx={{ width: "5%", margin: "auto", display: "block" }}
      />
      <Box
        sx={{
          width: "100%",
          height: 3,
          borderRadius: 1,
          background: "linear-gradient(90deg, #ff0000ff, #ffffffff)",
          mt: 1,
        }}
      />
      <Box sx={{ m: 1, spacing: 1 }}>
        <Typography variant="h5" color="text.primary">
          Grand-prix names:
        </Typography>
        {track.grandPrixNames.map((name, index) => (
          <Chip
            sx={{ m: 1, spacing: 1 }}
            key={index}
            label={name}
            variant="outlined"
          />
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 3,
          borderRadius: 1,
          background: "linear-gradient(90deg, #ff0000ff, #ffffffff)",
          mt: 1,
        }}
      />
      <Grid container sx={{ marginTop: 2 }}>
        <Grid size={7}>
          <Box>
            <Typography variant="h5" color="text.primary">
              Track Map
            </Typography>
            <Box
              component={"img"}
              sx={{ width: track.imageURL ? "90%" : "50%" }}
              src={track.imageURL ?? "/NoImage.png"}
            />
          </Box>
        </Grid>

        <Grid size={5} sx={{ borderLeft: " solid", p: 2 }}>
          <Box sx={{ display: "flex" }}>
            <Grid container spacing={5}>
              <Grid size={12} sx={{ borderBottom: " solid", p: 2 }}>
                <Typography color="text.primary">Length</Typography>
                <Typography variant="h4" color="text.primary">
                  {track.length}
                </Typography>
              </Grid>
              <Grid size={12} sx={{ borderBottom: " solid", p: 2 }}>
                <Typography color="text.primary">Type</Typography>
                <Typography variant="h4" color="text.primary">
                  {track.type}
                </Typography>
              </Grid>
              <Grid size={6} sx={{ borderRight: " solid", p: 2 }}>
                <Typography color="text.primary">Direction</Typography>
                <Typography variant="h4" color="text.primary">
                  {track.direction}
                </Typography>
              </Grid>
              <Grid size={6} sx={{ borderLeft: "0px solid", p: 2 }}>
                <Typography color="text.primary">Turns</Typography>
                <Typography variant="h4" color="text.primary">
                  {track.turns}
                </Typography>
              </Grid>
              <Grid size={12} sx={{ borderTop: "solid", p: 2 }}>
                <Typography color="text.primary">Expected laps *</Typography>
                <Typography variant="h4" color="text.primary">
                  {calculateTrackUnits(track.length, track.name)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/*Track Description */}
      <Box>
        <Typography variant="h5" color="text.primary">
          About the track
        </Typography>
        <Box
          sx={(theme) => ({
            ...theme.typography.body1,
            color: "text.primary",
            whiteSpace: "pre-line",
            mt: 2,
          })}
        >
          {track.description ?? "No description provided"}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 3,
          borderRadius: 1,
          background: "linear-gradient(90deg, #000000ff, #000000ff)",
          mt: 1,
        }}
      />
      <Typography color="text.primary" sx={{ mt: 5 }}>
        * Based on the 2025 formula 1 regulations, in which a total race
        distance is a maximum of 305 km, with the sole exception of Monaco which
        is 260 km
      </Typography>
    </>
  );
};

export default RaceTrackProfilePage;
