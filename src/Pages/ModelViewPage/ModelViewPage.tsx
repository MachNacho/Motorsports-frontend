import type React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./services/FBXModelLoader";
import SphereGeometry from "./Geometry/SphereGeometry";
import CubeGeometry from "./Geometry/CubeGeometry";

const ModelViewPage: React.FC = () => {
  return (
    <Canvas>
      <directionalLight position={[3, 8, 7]} intensity={0.5} />
      <ambientLight intensity={0.2} />
      <SphereGeometry />
      <CubeGeometry />
      <ModelLoader filename={"monacoGP.fbx"} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewPage;
