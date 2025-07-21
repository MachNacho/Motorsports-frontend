import type React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./services/FBXModelLoader";
import SectorDRSLoader from "./Components/SectorDRSLoader";
import { Typography } from "@mui/material";

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
      <Canvas style={{ height: "80vh", outline: "SOLID" }}>
        <directionalLight position={[3, 8, 7]} intensity={0.5} />
        <ambientLight intensity={0.2} />
        <ModelLoader filename={"monacoGP.fbx"} />
        <SectorDRSLoader />
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default ModelViewPage;
