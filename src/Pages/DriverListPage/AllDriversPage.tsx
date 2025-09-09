import type React from "react";
import { useEffect, useState } from "react";
import type { Driver } from "./Interfaces/Driver";
import { getAllDrivers, getNationalities } from "./Services/APIDriverList";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Modal, Typography } from "@mui/material";
import DriverAddForm from "./Component/DriverAddForm";
import type { Nations } from "./Interfaces/Nations";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverAddFormSchema, DriverAddFormSchema } from "./schema";

const AllDriversPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nations, setNations] = useState<Nations[]>([]);
  const navigation = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm<DriverAddFormSchema>({
    resolver: zodResolver(driverAddFormSchema),
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    "&.MuiTableCell-head": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: "bold",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    const fetchAllDrivers = async (): Promise<void> => {
      try {
        const data: Driver[] = await getAllDrivers();
        const dataNations: Nations[] = await getNationalities();
        setDrivers(data);
        setNations(dataNations);
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

            <DriverAddForm nationalities={nations} register={register} />


          <Box>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              //onClick={}
            >
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
        </Box>
      </Modal>
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 700 }} aria-label="drivers table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Birth Date</StyledTableCell>
              <StyledTableCell align="right">Nationality</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="right">Race Number</StyledTableCell>
              <StyledTableCell align="right">Button</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {drivers.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  No drivers found.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              drivers.map((driver) => (
                <StyledTableRow key={driver.id}>
                  <StyledTableCell>{driver.id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {driver.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {driver.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(driver.birthDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {driver.nationality}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {driver.gender}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {driver.raceNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => navigation(`/Driver/${driver.id}`)}
                    >
                      Profile
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AllDriversPage;
