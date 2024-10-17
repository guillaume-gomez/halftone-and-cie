import { forwardRef, ReactNode } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';

interface FrameProps {
  position: [number, number, number];
  children: ReactNode;
  widthTexture: number;
  heightTexture: number;
  padding? : number;
}

const Frame = forwardRef<{}, FrameProps>(({
    children,
    position,
    widthTexture,
    heightTexture,
    padding = 0.5
  }: FrameProps,
  ref
  ) =>  {
  return (
    <mesh
      position={position as any}
      ref={ref}
    >
      <boxGeometry args={[1 + padding, heightTexture/widthTexture + padding, 0.1]} />
      <meshStandardMaterial color="brown" />
        <group position={[0, 0, 0.2]}>
          {children}
        </group>
    </mesh>
  )
});


export default Frame;