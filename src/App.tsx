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

const theme = createTheme({
  palette: {
    primary: {
      main: "#930c0cff",
    },
  },
  typography: {
    fontFamily: "Formula1",
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
            <Route path="/Nation/stats" element={<NationStatsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
