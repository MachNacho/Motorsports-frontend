import type { NationalityStatsDTO } from "../../types/Nationality/NationalityStatsDTO";
import { nationalityService } from "../../API/Services/nationalityService";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { getFlag4x3 } from "../../utils/flagUtils";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { QUERY_CONFIG } from "../../Constants/queryConfig";

const NationStatsPage: React.FC = () => {
  const {
    data: nations,
    isLoading,
    isError,
    error,
  } = useQuery<NationalityStatsDTO[]>({
    queryKey: QUERY_KEYS.NATIONALITIES.ALL_STATS,
    queryFn: nationalityService.getAllStats,
    staleTime: QUERY_CONFIG.STALE_TIME.LONG,
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
    console.error("Failed to fetch nation stats:", error);
    return (
      <Typography color="error" align="center" mt={5}>
        Failed to load nation stats. Please try again later.
      </Typography>
    );
  }

  if (!nations || nations.length === 0) {
    return (
      <Typography align="center" mt={5}>
        No results available.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Nation Stats {new Date().getFullYear()}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        mb={3}
      >
        Nation driver, track, and team counts
      </Typography>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 3.75,
        }}
      >
        {nations.map((nation) => (
          <Card
            key={nation.code}
            sx={{ width: { xs: 280, sm: 320, md: 365 }, boxShadow: 3 }}
          >
            <CardMedia
              sx={{ height: 220 }}
              image={getFlag4x3(nation.code)}
              title={nation.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6">
                {nation.name} ({nation.code})
              </Typography>
              <Typography variant="body2">
                Drivers: {nation.driverCount}
              </Typography>
              <Typography variant="body2">Teams: {nation.teamCount}</Typography>
              <Typography variant="body2">
                Tracks: {nation.circutCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Continent: {nation.continent}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default NationStatsPage;
