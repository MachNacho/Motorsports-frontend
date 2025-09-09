import { AppBar, Box, Button, Toolbar } from "@mui/material";

export function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Button
            variant="text"
            href="/Driver/List"
            key={"ss"}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            All drivers
          </Button>
          {/* <Button
            href="/Driver/:driverId"
            key={"ss"}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            A driver
          </Button> */}
          <Button
            href="/Register"
            key={"ss"}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Sign up
          </Button>
          <Button
            href="/Signin"
            key={"ss"}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Sign in
          </Button>
          <Button
            href="/TrackModel"
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
