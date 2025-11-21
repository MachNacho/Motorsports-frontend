import {
  Box,
  Card,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { trackService } from "../../API/Services/trackService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PAGE_SIZE } from "../../Constants/constants";

const RaceTrackPage: React.FC = () => {
  const navigation = useNavigate();

  // Local UI pagination state
  const [page, setPage] = useState(1);

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

  // Calculate pagination boundaries:
  // current slice of tracks to display on screen
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const paginatedTracks = tracks.slice(startIdx, endIdx);

  return (
    <>
      <Typography variant="h1" align="center" gutterBottom color="text.primary">
        Circuts
      </Typography>

      {/* Pagination control */}
      <Box
        display="flex"
        justifyContent="center"
        mt={4}
        sx={{ marginBottom: 1 }}
      >
        <Pagination
          count={Math.ceil(tracks.length / PAGE_SIZE)} // total pages
          page={page} // current page
          onChange={(_, value) => setPage(value)} // update state
          color="primary"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {paginatedTracks.map((track) => (
          <Card
            key={track.id}
            onClick={() => navigation(`/Track/${track.id}`)}
            sx={{
              width: 700,
              height: 100,
              cursor: "pointer",
              justifyContent: "space-between",
              backgroundColor: "black",
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component={"img"}
                  src={`https://flagcdn.com/${track.nationCode}.svg`}
                  alt={track.nationName}
                  sx={{ width: "5%" }}
                  style={{ borderRadius: 4 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {track.trackName.toUpperCase()}
                </Typography>
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
              <Typography fontWeight="bold">
                {track.location}, {track.nationName}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};
export default RaceTrackPage;
