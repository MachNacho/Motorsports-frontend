import { Canvas } from "@react-three/fiber";
import CubeGeometry from "./Components/CubeGeometry";
import { Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{ margin: "20px", width: "100%", textAlign: "center" }}
      >
        Page not found
      </Typography>
      <Canvas style={{ height: "80vh" }}>
        <CubeGeometry position={[0, 0, 0]} />
      </Canvas>
    </>
  );
};

export default NotFoundPage;
