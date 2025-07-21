import type React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import ModelLoader from "./services/FBXModelLoader";
import SectorDRSLoader from "./Components/SectorDRSLoader";
import { Button, Typography } from "@mui/material";

const ModelViewPage: React.FC = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{ margin: "20px", width: "100%", textAlign: "center" }}
      >
        Track viewer
      </Typography>
      <Button>Sector 1</Button>
      <Button>Sector 2</Button>
      <Button>Sector 3</Button>
      <Button>DRS</Button>

      <Canvas style={{ height: "80vh", outline: "SOLID" }}>
        <directionalLight position={[3, 8, 7]} intensity={0.5} />
        <ambientLight intensity={0.2} />
        <PresentationControls global={true} speed={1.5} zoom={11.2} snap={true} >
          <ModelLoader filename={"monacoGP.fbx"} />
          <SectorDRSLoader />
        </PresentationControls>

        <OrbitControls />
      </Canvas>
    </>
  );
};

export default ModelViewPage;
