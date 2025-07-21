import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/Addons.js";

const ModelLoader: React.FC<{ filename: string }> = ({ filename }) => {
  const result = useLoader(FBXLoader, filename);
  return <primitive object={result} scale={0.005} position={[50, -8, 7]} />;
};

export default ModelLoader;
