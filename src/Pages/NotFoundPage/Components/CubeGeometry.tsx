import { useFrame } from "@react-three/fiber";
import type React from "react";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import {
  Edges,
  MeshTransmissionMaterial,
} from "@react-three/drei";

const CubeGeometry: React.FC<{
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
}> = ({ position = [0, 0, 0], size = [1, 1, 1], color = "Black" }) => {
  const ref = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 1;
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * speed;
      ref.current.rotation.y += delta / 3;
      ref.current.rotation.x += delta;
    }
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={size} />
      <Edges linewidth={4} scale={1.1} color="white" />
      <MeshTransmissionMaterial color={color}  />
    </mesh>
  );
};

export default CubeGeometry;
