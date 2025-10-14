import { Box, Card, Grid, Typography } from "@mui/material";
import type { TeamDTO } from "../../types/Team/TeamDTO";
import { useEffect, useState } from "react";
import { teamService } from "../../API/Services/teamService";

const AllTeamPage: React.FC = () => {
  const [teams, setTeams] = useState<TeamDTO[]>([]);

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const data: TeamDTO[] = await teamService.getAll();
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    fetchAllTeams();
  }, []);

  return (
    <>
      <Typography variant="h1" align="center">
        Teams {new Date().getFullYear()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {teams.length === 0 ? (
          <Typography variant="h1">No results</Typography>
        ) : (
          teams.map((team) => (
            <Card sx={{ width: 600 }}>
              <Grid spacing={2}>
                <Grid size={2}>
                  <Typography>{team.name}</Typography>
                </Grid>
                <Grid size={10} sx={{ bgcolor: "yellow" }}>
                  {team.yearFounded}
                  {team.country}
                </Grid>
              </Grid>
            </Card>
          ))
        )}
      </Box>
    </>
  );
};

export default AllTeamPage;
