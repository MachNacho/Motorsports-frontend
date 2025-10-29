import type { useForm } from "react-hook-form";
import type { SignInSchemaType } from "../validation/signInSchema";
import { FormControl, FormLabel, TextField } from "@mui/material";

interface FormTextFieldProps {
  name: keyof SignInSchemaType;
  label: string;
  type?: string;
  autoComplete: string;
  register: ReturnType<typeof useForm>["register"];
  error?: string;
  disabled: boolean;
}

const LoginFormTextField: React.FC<FormTextFieldProps> = ({
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

export default LoginFormTextField;
