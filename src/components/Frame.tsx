import { forwardRef, ReactNode } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface FrameProps {
  position: [number, number, number];
  children: ReactNode;
  widthTexture: number;
  heightTexture: number;
  padding? : number;
}

const HEIGHT_FRAME= 0.4

const Frame = forwardRef<{}, FrameProps>(({
    children,
    position,
    widthTexture,
    heightTexture,
    padding = 0.7
  }: FrameProps,
  ref
  ) =>  {
  console.log(widthTexture/heightTexture)
  console.log(heightTexture/widthTexture)
  return (
    <group
      position={position as any}
      ref={ref}
      castShadow

    >
      <group>
        <mesh position={[0,(0.5*heightTexture/widthTexture) + HEIGHT_FRAME/2,0]}>
          <boxGeometry args={[1+padding, HEIGHT_FRAME, 0.3]} />
          <meshStandardMaterial color="brown" wireframe={false}/>
        </mesh>
        <mesh position={[0,-(0.5*heightTexture/widthTexture) - HEIGHT_FRAME/2,0]}>
          <boxGeometry args={[1+padding, HEIGHT_FRAME, 0.3]} />
          <meshStandardMaterial color="brown" wireframe={false} />
        </mesh>
        <mesh position={[-padding+0.025, 0,0]}>
          <boxGeometry args={[padding/2, heightTexture/widthTexture, 0.3]} />
          <meshStandardMaterial color="brown" wireframe={false} />
        </mesh>
        <mesh position={[+padding-0.025, 0,0]}>
          <boxGeometry args={[padding/2, heightTexture/widthTexture, 0.3]} />
          <meshStandardMaterial color="brown" wireframe={false} />
        </mesh>
      </group>
          <group position={[0, 0, -0.05]}>
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
            <mesh position={[0,0,0.225]} >
              <boxGeometry args={[1 + padding, heightTexture/widthTexture + padding + 0.1, 0.05]} />
              {/*<meshStandardMaterial color="blue" wireframe={true} />*/}
              <meshPhysicalMaterial
                transmission={1}
                thickness={0.1}
                roughness={0.1}
              />
            </mesh>
          </group>

    </group>
  )
});


export default Frame;