import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import type { Nations } from "../Interfaces/Nations";
import { UseFormRegister } from "react-hook-form";
import type { DriverAddFormSchema } from "../schema";

interface DriverAddFormProps {
  nationalities: Nations[];
  register: UseFormRegister<DriverAddFormSchema>;
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
  register,
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
        <RadioGroup {...register('driverGender')}  row>
          <FormControlLabel value="0" control={<Radio />} label="Female" />
          <FormControlLabel value="1" control={<Radio />} label="Male" />
          <FormControlLabel value="2" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Nation</FormLabel>
        <TextField {...register("driverNationality")} select>
          {nationalities.map((nation) => (
            <MenuItem key={nation.code} value={nation.code}>
              {nation.name} - {nation.continent}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

      <FormControl>
        <FormLabel>Team</FormLabel>
        <TextField {...register("driverTeam")} select>
          <MenuItem value="1">Team 1</MenuItem>
          <MenuItem value="2">Team 2</MenuItem>
        </TextField>
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <TextField {...register("driverDescription")} multiline />
      </FormControl>
    </Box>
  );
};

export default DriverAddForm;
