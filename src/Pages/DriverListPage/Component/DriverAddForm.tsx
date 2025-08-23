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

interface DriverAddFormProps {
  nationalities: Nations[];
}

const DriverAddForm: React.FC<DriverAddFormProps> = ({ nationalities }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <FormControl>
        <FormLabel htmlFor="driverFName">Firstname</FormLabel>
        <TextField name="driverFName" required id="driverFName" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="driverLName">Lastname</FormLabel>
        <TextField name="driverLName" required id="driverLName" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="driverMName">Middle name</FormLabel>
        <TextField name="driverMName" required id="driverMName" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="driverGender">Gender</FormLabel>
        <RadioGroup name="driverGender" row>
          <FormControlLabel value="0" control={<Radio />} label="Female" />
          <FormControlLabel value="1" control={<Radio />} label="Male" />
          <FormControlLabel value="2" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="driverNationality">Nation</FormLabel>
        <TextField
          name="driverNationality"
          required
          id="driverNationality"
          select
        >
          {nationalities.map((nation) => (
            <MenuItem key={nation.code} value={nation.code}>
              {nation.name} - {nation.continent}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="driverTeam">Team</FormLabel>
        <TextField name="driverTeam" required id="driverTeam" select>
          <MenuItem value="1">Team 1</MenuItem>
          <MenuItem value="2">Team 2</MenuItem>
        </TextField>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="driverDescription">Description</FormLabel>
        <TextField id="driverDescription" name="driverDescription" multiline />
      </FormControl>
    </Box>
  );
};

export default DriverAddForm;
