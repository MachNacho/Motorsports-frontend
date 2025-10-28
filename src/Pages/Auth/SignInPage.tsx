import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  Snackbar,
  Alert,
  type SnackbarCloseReason,
  IconButton,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInSchemaType } from "./validation/signInSchema";
import { useMutation } from "@tanstack/react-query";
import { accountService } from "../../API/Services/accountService";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import LoginFormTextField from "./components/LoginFormTextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
  }>({ open: false, message: "", severity: "info" });

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    mode: "all",
    resolver: zodResolver(signInSchema),
    defaultValues: { username: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: (data: SignInSchemaType) => accountService.login(data),
    onSuccess: (result) => {
      setAuthUser(result.token);
      setSnackbar({
        open: true,
        message: "Login successful! Redirecting...",
        severity: "success",
      });
      setTimeout(() => navigate("/Driver/List"), 1000);
    },
    onError: (error: unknown) => {
      let message = "An unexpected error occurred.";
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;
        message =
          {
            400: "Invalid username or password.",
            401: "Unauthorized. Please check your credentials.",
            403: "Access denied. Contact administrator.",
            404: "Login service not found.",
            500: "Server error. Try again later.",
          }[status] ?? `Unexpected error (${status})`;
      }
      setSnackbar({ open: true, message, severity: "error" });
    },
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = (data) =>
    loginMutation.mutate(data);

  return (
    <Container>
      <Card
        variant="outlined"
        sx={{ maxWidth: 480, mx: "auto", mt: 6, p: 4, boxShadow: 3 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Sign in to your account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <LoginFormTextField
            name={"username"}
            label={"Username"}
            type={"text"}
            autoComplete={"username"}
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
            error={errors.username?.message}
            disabled={loginMutation.isPending}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <LoginFormTextField
              name={"password"}
              label={"Password"}
              type={showPassword ? "text" : "password"}
              autoComplete={"username"}
              register={
                register as unknown as ReturnType<typeof useForm>["register"]
              }
              error={errors.username?.message}
              disabled={loginMutation.isPending}
            />
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignInPage;
