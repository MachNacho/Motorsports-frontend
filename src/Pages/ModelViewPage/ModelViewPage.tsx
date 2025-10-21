import type React from "react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import ModelLoader from "./services/FBXModelLoader";
import SectorDRSLoader from "./Components/SectorDRSLoader";
import { Button, Typography, Stack } from "@mui/material";

const ModelViewPage: React.FC = () => {
  // Manage visibility state for each sector + DRS
  const [visibility, setVisibility] = useState({
    drs: true,
    sector1: true,
    sector2: true,
    sector3: true,
  });

  // Toggles a specific sector/DRS visibility
  const handleToggle = (key: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{ margin: "20px", width: "100%", textAlign: "center" }}
      >
        Track Viewer
      </Typography>

      {/* Control Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Button
          variant={visibility.sector1 ? "contained" : "outlined"}
          onClick={() => handleToggle("sector1")}
        >
          Sector 1
        </Button>

        <Button
          variant={visibility.sector2 ? "contained" : "outlined"}
          onClick={() => handleToggle("sector2")}
        >
          Sector 2
        </Button>

        <Button
          variant={visibility.sector3 ? "contained" : "outlined"}
          onClick={() => handleToggle("sector3")}
        >
          Sector 3
        </Button>

        <Button
          variant={visibility.drs ? "contained" : "outlined"}
          onClick={() => handleToggle("drs")}
        >
          DRS
        </Button>
      </Stack>

      {/* 3D Canvas */}
      <Canvas style={{ height: "80vh", background: "#121212" }}>
        <directionalLight position={[3, 8, 7]} intensity={0.5} />
        <ambientLight intensity={0.3} />

        <PresentationControls global speed={1.5} zoom={11.2} snap>
          <ModelLoader filename="monacoGP.fbx" />
          {/* Pass visibility state into the loader */}
          <SectorDRSLoader visibility={visibility} />
        </PresentationControls>

        <OrbitControls />
      </Canvas>
    </>
  );
};

export default ModelViewPage;
