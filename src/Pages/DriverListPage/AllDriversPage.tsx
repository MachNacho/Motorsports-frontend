import type React from "react";
import { useEffect, useState } from "react";
import type { Driver } from "./Interfaces/Driver";
import {
  getAllDrivers,
  getNationalities,
  getTeams,
} from "./Services/APIDriverList";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import DriverAddForm from "./Component/DriverAddForm";
import type { Nations } from "./Interfaces/Nations";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverAddFormSchema, type DriverAddFormSchema } from "./schema";
import type { Team } from "./Interfaces/Team";
import { getFlagFromName } from "../../utils/CountryFlagUtil";

const AllDriversPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nations, setNations] = useState<Nations[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const navigation = useNavigate();

  const { register, watch, handleSubmit } = useForm<DriverAddFormSchema>({
    resolver: zodResolver(driverAddFormSchema),
  });

  const onSubmit: SubmitHandler<DriverAddFormSchema> = (data) =>
    console.log(data);

  useEffect(() => {
    const fetchAllDrivers = async (): Promise<void> => {
      try {
        const data: Driver[] = await getAllDrivers();
        const dataNations: Nations[] = await getNationalities();
        const dataTeams: Team[] = await getTeams();

        setDrivers(data);
        setNations(dataNations);
        setTeams(dataTeams);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    };

    fetchAllDrivers();
  }, []);

  return (
    <>
      <Typography variant="h1" align="center">
        List of Drivers
      </Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setIsModalOpen(true)}
      >
        Add driver
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 500,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" align="center">
            Add Driver Modal (to be implemented)
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DriverAddForm
              nationalities={nations}
              teams={teams}
              register={register}
            />
            <Box>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, ml: 2 }}
                // onClick={}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 2, ml: 2 }}
                //onClick={}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        {drivers.length === 0 ? (
          <Typography variant="h1">No results</Typography>
        ) : (
          drivers.map((driver) => (
            <Card sx={{ width: 476, height: 256, backgroundColor: "gray" }}>
              <CardContent>
                <Box
                  //Driver name and Avatar
                  sx={{
                    display: "flex",
                    overflow: "auto",
                    gap: 1.5,
                    alignItems: "Baseline",
                  }}
                >
                  <Avatar sx={{ background: "blue" }}>
                    {driver.firstName.charAt(0)}
                    {driver.lastName.charAt(0)}
                  </Avatar>
                  <Typography gutterBottom variant="h5">
                    {driver.firstName} {driver.lastName}
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid size={8}>
                    <Typography variant="h6">{driver.teamName}</Typography>
                  </Grid>
                  <Grid size={4}># {driver.raceNumber}</Grid>
                  <Grid size={8}>
                    <img src={getFlagFromName(driver.nationality)} alt={driver.nationality} />
                    {driver.nationality}
                  </Grid>
                  <Grid size={4}>{driver.birthDate}</Grid>
                </Grid>
                <Button onClick={() => navigation(`/Driver/${driver.id}`)}>
                  Profile
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </>
  );
};

export default AllDriversPage;
