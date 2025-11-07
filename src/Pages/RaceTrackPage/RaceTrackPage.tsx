import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { trackService } from "../../API/Services/trackService";
import { useNavigate } from "react-router-dom";

const RaceTrackPage: React.FC = () => {
  const navigation = useNavigate();
  const {
    data: tracks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.TRACKS.LIST,
    queryFn: () => trackService.getAll(),
    staleTime: QUERY_CONFIG.STALE_TIME.LONG,
    retry: QUERY_CONFIG.RETRY,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load teams. Please try again later.
      </Typography>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <Typography align="center" variant="h5" mt={4}>
        No track available.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Circuts {new Date().getFullYear()}
      </Typography>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {tracks.map((track) => (
          <Card
            key={track.id}
            onClick={() => navigation(`/Track/${track.id}`)}
            sx={{
              background:
                "linear-gradient(135deg, #bacdfbff 0%, #5f5d5dff 100%)",
              width: "45%",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
              }}
            >
              <Typography variant="h5" gutterBottom>
                {track.trackName}
              </Typography>
              <img
                src={`https://flagcdn.com/${track.nationCode}.svg`}
                alt={track.nationName}
                style={{ borderRadius: 6 }}
                width={"10%"}
              />
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};
export default RaceTrackPage;
