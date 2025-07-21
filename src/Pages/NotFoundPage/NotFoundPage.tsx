import { Canvas } from "@react-three/fiber";
import CubeGeometry from "./Components/CubeGeometry";
import { Typography } from "@mui/material";
import TextGeometry from "./Components/TextGeometry";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", textAlign: "center" }}
        
      >
        Page Error......
      </Typography>
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", textAlign: "left" }}
        color="Red"
      >
       ......... Bug Found
      </Typography>
      <Canvas style={{ height: "80vh" }}>
        <directionalLight position={[3, 8, 7]} intensity={0.5} />
        <ambientLight intensity={0.2} />
        <TextGeometry position={[-3, 0, 0]} text="Not Found" />
        <CubeGeometry position={[0, 0, -5]} size={[2, 2, 2]} color="blue" />
      </Canvas>
    </>
  );
};

export default NotFoundPage;
