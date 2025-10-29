import { FormControl, FormLabel, TextField } from "@mui/material";
import type { useForm } from "react-hook-form";
import type { RegisterSchemaType } from "../validation/registerSchema";

interface FormTextFieldProps {
  name: keyof RegisterSchemaType;
  label: string;
  type?: string;
  autoComplete: string;
  register: ReturnType<typeof useForm>["register"];
  error?: string;
  disabled: boolean;
}

const RegisterFormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type = "text",
  register,
  autoComplete,
  error,
  disabled,
}) => (
  <FormControl fullWidth>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <TextField
      {...register(name)}
      id={name}
      type={type}
      error={!!error}
      helperText={error}
      variant="outlined"
      disabled={disabled}
      autoComplete={autoComplete}
    />
  </FormControl>
);

export default RegisterFormTextField;
