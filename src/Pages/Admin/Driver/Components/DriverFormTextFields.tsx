import type { useForm } from "react-hook-form";
import type { driverFormSchemaType } from "../validation/driverFormSchema";
import type React from "react";
import { FormControl, TextField } from "@mui/material";

interface FormTextFieldProps {
  name: keyof driverFormSchemaType;
  label: string;
  type?: string;
  autoComplete: string;
  register: ReturnType<typeof useForm>["register"];
  error?: string;
  disabled: boolean;
  multiline: boolean;
}

const DriverFormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type = "text",
  register,
  autoComplete,
  error,
  disabled,
  multiline,
}) => (
  <FormControl fullWidth>
    {/* <FormLabel htmlFor={name}>{label}</FormLabel> */}
    <TextField
      {...register(name)}
      id={name}
      type={type}
      error={!!error}
      helperText={error}
      variant="outlined"
      slotProps={{ inputLabel: { shrink: true } }}
      label={label}
      disabled={disabled}
      autoComplete={autoComplete}
      multiline={multiline}
    />
  </FormControl>
);

export default DriverFormTextField;
