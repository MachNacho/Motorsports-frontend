import { Canvas } from "@react-three/fiber";
import { Typography } from "@mui/material";
import TextGeometry from "./Components/TextGeometry";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", textAlign: "center" }}
        color="text.primary"
      >
        Page Error......
      </Typography>
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", textAlign: "left" }}
        color="Red"
      >
       ......... Bug Found: PAGE NOT FOUND
      </Typography>
      <Canvas style={{ height: "70vh" }}>
        <directionalLight position={[3, 8, 7]} intensity={0.5} />
        <ambientLight intensity={0.2} />
        <TextGeometry position={[-3, 0, 0]} text="Not Found" />
      </Canvas>
    </>
  );
};

export default NotFoundPage;
