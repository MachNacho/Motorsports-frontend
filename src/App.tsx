import { Route, BrowserRouter, Routes } from "react-router-dom";
import AllDriversPage from "./Pages/DriverListPage/AllDriversPage";
import DriverProfilePage from "./Pages/DriverProfilePage/DriverProfilePage";

function App() {
  return (
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
        <Route path="/" element={<AllDriversPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
