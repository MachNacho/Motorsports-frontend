import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import type { Nations } from "../Interfaces/Nations";
import type { Control, UseFormRegister } from "react-hook-form";
import type { DriverAddFormSchema } from "../schema";
import type { Team } from "../Interfaces/Team";
import { Controller } from "react-hook-form";

interface DriverAddFormProps {
  nationalities: Nations[];
  teams: Team[];
  register: UseFormRegister<DriverAddFormSchema>;
  control: Control<DriverAddFormSchema>;
}

export interface DriverFormData {
  driverFName: string;
  driverLName: string;
  driverMName: string;
  driverGender: string;
  driverNationality: string;
  driverTeam: string;
  driverDescription: string;
}

const DriverAddForm: React.FC<DriverAddFormProps> = ({
  nationalities,
  teams,
  register,
  control,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <FormControl>
        <FormLabel>Firstname</FormLabel>
        <TextField {...register("driverFName")} />
      </FormControl>

      <FormControl>
        <FormLabel>Lastname</FormLabel>
        <TextField {...register("driverLName")} />
      </FormControl>
      <FormControl>
        <FormLabel>Middle name</FormLabel>
        <TextField {...register("driverMName")} />
      </FormControl>

      <FormControl>
        <FormLabel>Gender</FormLabel>
        <Controller
          name="driverGender"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value="0" control={<Radio />} label="Female" />
              <FormControlLabel value="1" control={<Radio />} label="Male" />
              <FormControlLabel value="2" control={<Radio />} label="Other" />
            </RadioGroup>
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Nation</FormLabel>
        <Select {...register("driverNationality")}>
          {nationalities.map((nation) => (
            <MenuItem key={nation.code} value={nation.code}>
              {nation.name} - {nation.continent}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Team</FormLabel>
        <Select {...register("driverTeam")}>
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <TextField {...register("driverDescription")} multiline />
      </FormControl>
    </Box>
  );
};

export default DriverAddForm;
