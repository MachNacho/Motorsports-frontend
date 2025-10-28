import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  registerSchema,
  type RegisterSchemaType,
} from "./validation/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { accountService } from "../../API/Services/accountService";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RegisterFormTextField from "./components/RegisterFormTextField";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterSchemaType) => accountService.register(data),
    onSuccess: (result) => {
      setAuthUser(result.token);
      setTimeout(() => navigate("/Driver/List"), 7000);
    },
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) =>
    registerMutation.mutate(data);

  return (
    <Container>
      <Card
        variant="outlined"
        sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 4, boxShadow: 3 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <RegisterFormTextField
            name={"username"}
            label={"Username"}
            type={"text"}
            autoComplete={"username"}
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
            error={errors.username?.message}
            disabled={registerMutation.isPending}
          />

          <RegisterFormTextField
            name={"email"}
            label={"Email"}
            type={"email"}
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
            error={errors.email?.message}
            autoComplete={"email"}
            disabled={registerMutation.isPending}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <RegisterFormTextField
              name={"password"}
              label={"Password"}
              type={showPassword ? "text" : "password"}
              register={
                register as unknown as ReturnType<typeof useForm>["register"]
              }
              error={errors.password?.message}
              autoComplete={"new-password"}
              disabled={registerMutation.isPending}
            />
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>

          <RegisterFormTextField
            name={"firstname"}
            label={"Firstname"}
            type="Text"
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
            error={errors.firstname?.message}
            autoComplete={"given-name"}
            disabled={registerMutation.isPending}
          />
          <RegisterFormTextField
            name={"lastname"}
            label={"Lastname"}
            type="Text"
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
            error={errors.lastname?.message}
            autoComplete={"family-name"}
            disabled={registerMutation.isPending}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </Button>
          {registerMutation.isError && (
            <Typography color="error" variant="body2">
              {(registerMutation.error as Error).message ||
                "Registration failed"}
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default RegisterPage;
