import { Route, BrowserRouter, Routes } from "react-router-dom";
import AllDriversPage from "./Pages/DriverListPage/AllDriversPage";
import DriverProfilePage from "./Pages/DriverProfilePage/DriverProfilePage";
import { Container } from "@mui/material";
import ModelViewPage from "./Pages/ModelViewPage/ModelViewPage";
import { NavigationBar } from "./components/NavigationBar";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import SignInPage from "./Pages/SigninPage/SignInPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Container maxWidth={false}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/Driver/:driverId"
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
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/Driver/List" element={<AllDriversPage />} />
            <Route path="/TrackModel" element={<ModelViewPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
