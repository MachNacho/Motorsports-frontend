import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import type { TeamDTO } from "../../types/Team/TeamDTO";
import { teamService } from "../../API/Services/teamService";
import { getRandomCar } from "../../utils/CarAssigner";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { QUERY_CONFIG } from "../../Constants/queryConfig";

const AllTeamPage: React.FC = () => {
  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery<TeamDTO[]>({
    queryKey: [QUERY_KEYS.TEAMS.LIST],
    queryFn: () => teamService.getAll(),
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
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

  if (!teams || teams.length === 0) {
    return (
      <Typography align="center" variant="h5" mt={4}>
        No teams available.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h1" align="center">
        Teams {new Date().getFullYear()}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 3,
          mt: 4,
        }}
      >
        {teams.map((team) => (
          <Card
            key={team.id}
            sx={{
              width: 650,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1,
              background: "linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%)",
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid xs={5}>
                <Typography variant="h4" fontWeight="bold">
                  {team.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Founded: {"N/A"}
                </Typography>
                <Typography variant="subtitle1">Drivers: {0}</Typography>
              </Grid>

              <Grid xs={7} display="flex" justifyContent="center">
                <img
                  src={getRandomCar()}
                  alt={`${team.name} car`}
                  width={300}
                  style={{ borderRadius: 8 }}
                />
              </Grid>
            </Grid>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default AllTeamPage;
