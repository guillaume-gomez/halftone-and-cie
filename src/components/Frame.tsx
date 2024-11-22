import { forwardRef, ReactNode } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Text } from '@react-three/drei';

interface FrameProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  children: ReactNode;
  widthTexture: number;
  heightTexture: number;
  padding? : number;
}

const Frame = forwardRef<{}, FrameProps>(({
    children,
    position,
    rotation=[0,0,0],
    widthTexture,
    heightTexture,
    padding = 0.5
  }: FrameProps,
  ref
  ) =>  {
  return (
    <mesh
      position={position as any}
      rotation={rotation as any}
      ref={ref}
    >
      <boxGeometry args={[1 + padding, heightTexture/widthTexture + padding, 0.1]} />
      <meshStandardMaterial color="brown" />
        <group position={[0, 0, 0.075]}>
          <Text
            //font={'/azonix.woff'}
            color={0xFFFFFF}
            fontSize={0.05}
            letterSpacing={0}
            anchorY="bottom"
            anchorX="center"
            lineHeight={0.8}
            position={[0, -heightTexture/widthTexture + 0.1, 0.1]}>
            powered by ads
          </Text>
          {children}
          {/*<mesh position={[0,0,0.0]} >
            <boxGeometry args={[1 + padding, heightTexture/widthTexture + padding, 0.01]} />
            <meshPhysicalMaterial
              transmission={1}
              thickness={1}
              roughness={0.1}
            />
          </mesh>*/}
        </group>
    </mesh>
  )
});


export default Frame;