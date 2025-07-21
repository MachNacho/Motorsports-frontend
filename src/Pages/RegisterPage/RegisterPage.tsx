import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const RegisterPage: React.FC = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const fname = document.getElementById("fname") as HTMLInputElement;
    //const lname = document.getElementById("lname") as HTMLInputElement;
    //const uname = document.getElementById("uname") as HTMLInputElement;

    let isvalid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isvalid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      isvalid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!fname.value || fname.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isvalid;
  };
  return (
    <Container
      sx={{
        height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
        minHeight: "100%",
        padding: "10px",
        display: ""
      }}
    >
      <Card
        variant="outlined"
        sx={{
          margin: "auto",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Register
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="firstname">First name</FormLabel>
            <TextField
              autoComplete="fname"
              name="fname"
              required
              fullWidth
              id="fname"
              placeholder="John"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? "error" : "primary"}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="lastname">Last name</FormLabel>
            <TextField
              autoComplete="lname"
              name="lname"
              required
              fullWidth
              id="lname"
              placeholder="Snow"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? "error" : "primary"}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              autoComplete="uname"
              name="uname"
              required
              fullWidth
              id="uname"
              placeholder="Tim"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? "error" : "primary"}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/" variant="body2" sx={{ alignSelf: "center" }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default RegisterPage;
