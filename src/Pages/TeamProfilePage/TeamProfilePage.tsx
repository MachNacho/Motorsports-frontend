import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_KEYS } from "../../Constants/queryKeys";
import { teamService } from "../../API/Services/teamService";
import { QUERY_CONFIG } from "../../Constants/queryConfig";
import { Grid, CircularProgress, Typography, Card, Box } from "@mui/material";
import type { FullTeamDTO } from "../../types/Team/FullTeamDTO";

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
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        gutterBottom
        color="text.primary"
      >
        {team.teamName}
      </Typography>
      <Card
        sx={{
          backgroundImage: `url(/TEAMDRS.webp)`,
          backgroundBlendMode: "multiply",
          backgroundColor: team.colour ?? "#000000ff",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          height: 300,
          p: 2,
          mb: 2,
        }}
      >
        <Grid
          container
          height={"100%"}
          spacing={2}
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Grid size={2}>
            <Box
              component={"img"}
              sx={{
                width: "60%",
                borderRadius: 6,
              }}
              src={`/logo3.avif`}
              alt={team.teamName}
            />
          </Grid>
          <Grid size={9}>
            <Box
              component={"img"}
              src={team.imageURL}
              sx={{ width: "60%" }}
              alt={`${team.teamName} car`}
            />
          </Grid>

          <Grid size={1}>
            <Box
              component={"img"}
              sx={{
                width: "100%",
                borderRadius: 4,
              }}
              src={`https://flagcdn.com/${team.nationCode}.svg`}
              alt={team.nationName}
            />

            <Typography variant="subtitle2" color="text.primary">
              {team.nationName}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={3}>
        <Grid
          size={6}
          sx={{
            padding: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h2" gutterBottom color="text.primary">
            About {team.teamName}
          </Typography>
          <Typography variant="h6" gutterBottom color="text.primary">
            Headquarters: {team.headquarters}, {team.nationName}
          </Typography>
          <Typography variant="h6" gutterBottom color="text.primary">
            Founded: {team.foundedDate}
          </Typography>
          <Box
            sx={(theme) => ({
              ...theme.typography.body1,
              color: "text.primary",
              whiteSpace: "pre-line",
            })}
          >
            {team.description}
          </Box>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ lineHeight: 1.6 }}
          ></Typography>
        </Grid>
        <Grid size={6}>
          <Box
            sx={{
              overflow: "hidden",
              backgroundColor: "transparent",
            }}
          >
            <Typography variant="h2" gutterBottom color="text.primary">
              Drivers
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 2,
                maxHeight: 300,
                overflowY: "auto",
                pr: 1,
                pt: 1,
              }}
            >
              {team.drivers.map((driver) => (
                <Card
                  key={driver.id}
                  onClick={() => navigation(`/Driver/${driver.id}`)}
                  sx={{
                    cursor: "pointer",
                    width: "90%",
                    p: 2,
                    overflow: "hidden",
                    flexShrink: 0,
                    height: 50,
                    background: `linear-gradient(135deg,${
                      team.colour ?? "#ca0500"
                    } 70%, 
                       #000000ff 30%)`,
                    transition: "all 0.4s ease-in-out",
                    backgroundSize: "130% 200%",
                    "&:hover": {
                      backgroundPosition: "30% 100%",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid size={10}>
                      <Typography variant="h5" fontStyle={"italic"} fontWeight="bold">
                        {driver.firstname} {driver.lasstname}
                      </Typography>
                    </Grid>
                    <Grid size={2}>
                      <Box
                        component="img"
                        sx={{ width: "50%", borderRadius: 2 }}
                        src={`https://flagcdn.com/${driver.nationCode}.svg`}
                        alt={driver.nationCode}
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Info card */}
    </>
  );
};
export default TeamProfilePage;
