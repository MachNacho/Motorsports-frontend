import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";

const SphereGeometry: React.FC<{
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
}> = ({ position = [0, 0, 0], size = [1, 30, 30], color = "Black" }) => {
  const ref = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    const speed = isHovered ? 1 : 1;
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * speed;
    }
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};
export default SphereGeometry;
