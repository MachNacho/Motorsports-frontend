import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  styled,
  Toolbar,
} from "@mui/material";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export function NavigationBar() {
  return (
    <AppBar
      position="relative"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                href="/Driver/List"
              >
                Drivers
              </Button>
              <Button variant="text" color="info" size="small" href="/Teams">
                Teams
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                href="/TrackModel"
              >
                Circuts
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
                href="/something"
              >
                FAQ
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
                href="/something"
              >
                Blog
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "end",
              }}
            >
              <Button
                color="primary"
                variant="text"
                size="small"
                href="/Signin"
              >
                Sign in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                href="/Register"
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
