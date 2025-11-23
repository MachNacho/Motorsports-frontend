import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import type { TeamDTO } from "../../types/Team/TeamDTO";
import { teamService } from "../../API/Services/teamService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { useNavigate } from "react-router-dom";

const AllTeamPage: React.FC = () => {
  const navigation = useNavigate();
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
      <Typography align="center" variant="h5" mt={4} color="text.primary">
        No teams available.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h3" align="center" color="text.primary">
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
            onClick={() => navigation(`/Team/${team.id}`)}
            sx={{
              cursor: "pointer",
              width: 650,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1,
              backgroundImage: `url(/TEAMDRS.webp)`,
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "multiply",
              WebkitBackgroundSize: "cover",
              backgroundColor: team.colour ?? "#ca0500",
              transition: "all 0.6s ease-in-out",

              "&:hover": {
                backgroundPosition: "140% 0%",
                boxShadow: 6,
              },
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid size={5}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                  {team.name}
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  Founded: {team.yearFounded ?? "N/A"}
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  Drivers: {team.driverCount}
                </Typography>
              </Grid>

              <Grid size={7} display="flex" justifyContent="center">
                <Box
                  component={"img"}
                  src={team.imageURL}
                  alt={`${team.name} car`}
                  width={380}
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
//Nations
