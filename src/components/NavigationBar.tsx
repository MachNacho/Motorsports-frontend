import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: theme.spacing(1.5),
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: theme.spacing(1, 2),
}));

const NAV_ITEMS = [
  { label: "Drivers", to: "/Driver/List" },
  { label: "Teams", to: "/Teams" },
  { label: "3D Track Model", to: "/TrackModel" },
  { label: "Nations", to: "/Nation/stats" },
  { label: "Circuits", to: "/Circuits" },
];

export function NavigationBar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  console.log(user);
  return (
    <AppBar
      position="relative"
      sx={{
        boxShadow: "none",
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar variant="dense" disableGutters>
          {/* Nav Buttons */}
          <Box sx={{ display: "flex", gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                size="small"
                sx={{
                  color:
                    location.pathname.startsWith(item.to) ||
                    location.pathname === item.to
                      ? "primary.main"
                      : "info.main",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    color: "primary.main",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {!isAuthenticated ? (
              <>
                <Button
                  component={RouterLink}
                  to="/Signin"
                  variant="text"
                  size="small"
                >
                  Sign in
                </Button>
                <Button
                  component={RouterLink}
                  to="/Register"
                  variant="contained"
                  size="small"
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Typography color="black">Hello {user?.name}</Typography>
                <Button variant="outlined" onClick={logout} sx={{ ml: 2 }}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
