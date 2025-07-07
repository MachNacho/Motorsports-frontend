import { Route, BrowserRouter, Routes } from "react-router-dom";
import AllDriversPage from "./Pages/DriverListPage/AllDriversPage";
import DriverProfilePage from "./Pages/DriverProfilePage/DriverProfilePage";
import { Container } from "@mui/material";
import ModelViewPage from "./Pages/ModelViewPage/ModelViewPage";

function App() {
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ width: "100vw", height: "100vh", padding: 0 }}
      >
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
            <Route path="/c" element={<ModelViewPage />} />
            <Route path="/" element={<AllDriversPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
