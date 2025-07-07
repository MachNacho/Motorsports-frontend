import type React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./services/FBXModelLoader";

const ModelViewPage: React.FC = () => {
  return (
    <Canvas>
      <directionalLight position={[3, 8, 7]} intensity={0.5} />
      <ambientLight intensity={0.2} />
      <ModelLoader filename={"monacoGP.fbx"} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewPage;
