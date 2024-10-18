import { ReactNode } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';

interface FrameProps {
  position: [number, number, number];
  children: ReactNode;
}

function Frame({ children, position }: FrameProps) {
  return (
    <mesh
      position={position as any}
    >
      <boxGeometry args={[1.5, 1.5, 0.1]} />
      <meshStandardMaterial color="brown" />
        <group position={[0, 0, 0.2]}>
          {children}
        </group>
    </mesh>
  )
}

export default Frame;