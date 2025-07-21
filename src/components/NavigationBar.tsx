import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

export function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Button
            variant="text"
            href="/"
            key={"ss"}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            All drivers
          </Button>
          <Button
            href="/a"
            key={"ss"}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            A driver
          </Button>
          <Button
            href="/c"
            key={"ss"}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Sign up
          </Button>
          <Button
            href="/d"
            key={"ss"}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Model
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
