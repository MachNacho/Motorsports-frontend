import { Route, BrowserRouter, Routes } from "react-router-dom";
import AllDriversPage from "./Pages/DriverListPage/AllDriversPage";
import DriverProfilePage from "./Pages/DriverProfilePage/DriverProfilePage";
import { Container } from "@mui/material";
import ModelViewPage from "./Pages/ModelViewPage/ModelViewPage";
import { NavigationBar } from "./components/NavigationBar";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import SignInPage from "./Pages/SigninPage/SignInPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#04386bff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <Container maxWidth={false}>
        <BrowserRouter>
          <Routes>
            <Route path="/Driver/:ID" element={<DriverProfilePage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/Driver/List" element={<AllDriversPage />} />
            <Route path="/TrackModel" element={<ModelViewPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
