import { Route, BrowserRouter, Routes } from "react-router-dom";
import AllDriversPage from "./Pages/DriverListPage/AllDriversPage";
// import DriverProfilePage from "./Pages/DriverProfilePage/DriverProfilePage";
import { Container } from "@mui/material";
import ModelViewPage from "./Pages/ModelViewPage/ModelViewPage";
// import { NavigationBar } from "./components/NavigationBar";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "./components/NavigationBar";
import DriverProfilePage from "./Pages/DriverProfilePage/DriverProfilePage";
import AllTeamPage from "./Pages/TeamListPage/AllTeamsPage";
import NationStatsPage from "./Pages/NationStatsPage/NationStatsPage";
import TeamProfilePage from "./Pages/TeamProfilePage/TeamProfilePage";
import SignInPage from "./Pages/Auth/SignInPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import RaceTrackPage from "./Pages/RaceTrackPage/RaceTrackPage";
import RaceTrackProfilePage from "./Pages/RaceTrackProfilePage/RaceTrackProfilePage";
import DriverTable from "./Pages/Admin/Driver/DriverTable";
import "./App.css";
import FooterBar from "./components/FooterBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ca0500",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00c7ca",
    },
    background: {
      default: "#34343b",
    },
    info: {
      main: "#ccccd4",
    },
    text: {
      primary: "#ffffffff",
      secondary: "#000000ff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1636,
    },
  },
  typography: {
    fontFamily: "Stack Sans Notch",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/Driver/:ID" element={<DriverProfilePage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/Driver/List" element={<AllDriversPage />} />
            <Route path="/TrackModel" element={<ModelViewPage />} />
            <Route path="/Teams" element={<AllTeamPage />} />
            <Route path="/Team/:ID" element={<TeamProfilePage />} />
            <Route path="/Tracks" element={<RaceTrackPage />} />
            <Route path="/Track/:ID" element={<RaceTrackProfilePage />} />
            <Route path="/DriverTable" element={<DriverTable />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<NationStatsPage />} />
          </Routes>
          <FooterBar />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
