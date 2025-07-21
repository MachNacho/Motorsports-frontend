import { useFrame } from "@react-three/fiber";
import type React from "react";
import { useRef } from "react";
import type { Mesh } from "three";
import { Text3D } from "@react-three/drei";

const TextGeometry: React.FC<{
  position?: [number, number, number];
  text?: string;
}> = ({ position = [0, 0, 0], text = "Example text" }) => {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
      ref.current.rotation.x += Math.sin(state.clock.elapsedTime) * 0.002;
      //ref.current.rotation.x += delta*speed;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <Text3D font="https://cdn.jsdelivr.net/npm/three@0.150.1/examples/fonts/helvetiker_regular.typeface.json">
        {text}
        <meshNormalMaterial />
      </Text3D>
    </mesh>
  );
};

export default TextGeometry;
