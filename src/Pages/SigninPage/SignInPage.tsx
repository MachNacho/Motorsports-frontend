import {
  Box,
  Card,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

const SignInPage: React.FC = () => {
  return (
    <Container
      sx={{
        height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
        minHeight: "100%",
        padding: "10px",
        display: "",
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
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="username">username</FormLabel>
            <TextField
              autoComplete="uname"
              name="uname"
              required
              fullWidth
              id="uname"
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
              autoComplete="password"
              variant="outlined"
            />
          </FormControl>
        </Box>
      </Card>
    </Container>
  );
};

export default SignInPage;
