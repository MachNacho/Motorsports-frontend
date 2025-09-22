import type React from "react";
import { useEffect, useState } from "react";
import type { Driver } from "./Interfaces/Driver";
import {
  getAllDrivers,
  getNationalities,
  getTeams,
} from "./Services/APIDriverList";
import {
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
import { getRandomDriverPhoto } from "../../utils/PhotoAssigner";
const AllDriversPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nations, setNations] = useState<Nations[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const navigation = useNavigate();

  const { register, handleSubmit, reset, watch, control } =
    useForm<DriverAddFormSchema>({
      resolver: zodResolver(driverAddFormSchema),
    });
  console.log(watch("driverGender"));
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
        Drivers {new Date().getFullYear()}
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
              control={control}
            />
            <Box>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, ml: 2 }}
                onClick={() => reset()}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 2, ml: 2 }}
                onClick={() => setIsModalOpen(false)}
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
          justifyContent: "left",
          gap: 3.75,
        }}
      >
        {drivers.length === 0 ? (
          <Typography variant="h1">No results</Typography>
        ) : (
          drivers.map((driver) => (
            <Box
              onClick={() => navigation(`/Driver/${driver.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <Card sx={{ width: 476, height: 256, bgcolor: "#43547c1a" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    {/* Left */}
                    <Grid size={7}>
                      <Typography variant="h4">{driver.firstName}</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {driver.lastName}
                      </Typography>
                      <Typography> {driver.teamName}</Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                          fontSize: 20,
                        }}
                      >
                        # {driver.raceNumber}
                      </Typography>
                      <Box sx={{}}>
                        <img
                          src={getFlagFromName(driver.nationality)}
                          alt={driver.nationality}
                        />
                      </Box>
                    </Grid>
                    {/* Left */}
                    <Grid size={5}>
                      <Box alignContent={"center"}>
                        <img
                          src={getRandomDriverPhoto(driver.gender)}
                          alt={driver.firstName}
                          width={200}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default AllDriversPage;
