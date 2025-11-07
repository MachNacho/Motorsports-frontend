import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { trackService } from "../../API/Services/trackService";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";

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
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        {track.name}
      </Typography>
      <Card
        sx={{
          height: 150,
          p: 2,
          mb: 2,
        }}
      >
        <Grid container sx={{ height: "100%" }} spacing={1}>
          <Grid size={4} sx={{ height: "100%" }}>
            <Typography fontWeight="bold">Track stats</Typography>
            <Typography>Legth used: {track.length}</Typography>
            <Typography>Track direction: {track.direction}</Typography>
            <Typography>
              Location: {track.location}, {track.nationName}
            </Typography>
            <Typography>Type: {track.type}</Typography>
            {}
          </Grid>
          <Grid size={4} sx={{ height: "100%" }}>
            <Typography fontWeight="bold">Grand prix names</Typography>
            {track.grandPrixNames.map((name) => (
              <Typography>{name}</Typography>
            ))}
          </Grid>
          <Grid size={4} sx={{ height: "100%" }}>
            <Box
              component="img"
              src={`https://flagcdn.com/${track.nationCode}.svg`}
              alt={track.nationName}
              sx={{ height: "80%" }}
            />
            <Typography>{track.nationName}</Typography>
          </Grid>
        </Grid>
      </Card>
      <Card
        sx={{
          height: "100%",
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
          <Grid size={6} spacing={2}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Track map
            </Typography>
            <img
              src={track.imageURL ? track.imageURL : "/NoImage.png"}
              style={{ borderRadius: 6, border: "solid" }}
              width={track.imageURL ? "90%" : "50%"}
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Description
            </Typography>
            <Typography gutterBottom>
              {track.description
                ? track.description
                : "No description provided"}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default RaceTrackProfilePage;
