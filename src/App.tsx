import { Route, BrowserRouter, Routes } from "react-router-dom";
import AllDriversPage from "./Pages/DriverListPage/AllDriversPage";
import DriverProfilePage from "./Pages/DriverProfilePage/DriverProfilePage";
import { Container } from "@mui/material";
import ModelViewPage from "./Pages/ModelViewPage/ModelViewPage";
import { NavigationBar } from "./components/NavigationBar";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Container maxWidth={false} disableGutters sx={{}}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/a"
              element={
                <DriverProfilePage
                  driverId={"3117ef54-00d2-4ad4-962a-08ddac30ae06"}
                />
              }
            />
            <Route
              path="/B"
              element={
                <DriverProfilePage
                  driverId={"72a5abe3-79d4-4424-9629-08ddac30ae06"}
                />
              }
            />
            <Route path="/c" element={<RegisterPage />} />
            <Route path="/" element={<AllDriversPage />} />
            <Route path="/d" element={<ModelViewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
