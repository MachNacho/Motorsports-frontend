import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { teamService } from "../../API/Services/teamService";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { Grid, CircularProgress, Typography, Card, Box } from "@mui/material";
import type { FullTeamDTO } from "../../types/Team/FullTeamDTO";
import { getFlag4x3 } from "../../utils/flagUtils";
import { getRandomCar } from "../../utils/CarAssigner";

const TeamProfilePage: React.FC = () => {
  const { ID } = useParams<{ ID: string }>();
  const navigation = useNavigate();
  const {
    data: team,
    isLoading,
    isError,
  } = useQuery<FullTeamDTO>({
    queryKey: QUERY_KEYS.TEAMS.DETAILS(ID ?? ""),
    queryFn: () => teamService.getById(ID!),
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
  if (isError || !team) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ mt: 4, textAlign: "center" }}
      >
        team not found or failed to load.
      </Typography>
    );
  }
  // --------------------------- Team Profile--------------------------------
  return (
    <>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        {team.teamName}
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
          <Grid size={10}>
            <img
              src={getRandomCar()}
              alt={`${team.teamName} car`}
              width={"100%"}
            />
          </Grid>
          <Grid size={2}>
            <img
              src={getFlag4x3(team.nationCode)}
              alt={team.nationName}
              style={{ borderRadius: 6 }}
            />
            <Typography variant="subtitle2">{team.nationName}</Typography>
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
          About {team.teamName}
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
          Drivers
        </Typography>
        <Box
          sx={{
            marginTop: 1,
            padding: 1,
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {team.drivers.map((driver) => (
            <Card
              onClick={() => navigation(`/Driver/${driver.id}`)}
              sx={{
                cursor: "pointer",
                width: { sm: "100%", md: "30%" },
                transition: "all 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                  background:
                    "linear-gradient(135deg, #dfe7fd 0%, #8b1a1a 100%)",
                },
                background:
                  "linear-gradient(135deg, #bacdfbff 0%, #471e1eff 100%)",
              }}
            >
              <Grid
                container
                sx={{
                  padding: 1,
                }}
              >
                <Grid size={10}>
                  <Typography variant="h4">
                    {driver.firstname} {driver.lasstname}
                  </Typography>
                </Grid>
                <Grid size={2}>
                  <img
                    src={getFlag4x3(driver.nationCode)}
                    alt={driver.nationCode}
                    width={"100%"}
                    style={{ borderRadius: 6 }}
                  />
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
      </Card>
    </>
  );
};
export default TeamProfilePage;
