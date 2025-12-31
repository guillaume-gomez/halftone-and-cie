import { forwardRef, ReactNode, useRef } from 'react';
import { Text } from '@react-three/drei';
import { MeshPhysicalMaterial } from "three";

interface FrameProps {
  position: [number, number, number];
  children: ReactNode;
  widthTexture: number;
  heightTexture: number;
  padding? : number;
  hasBackLight?: boolean;
  hasWindow?: boolean;
}

const materialFrame = new MeshPhysicalMaterial({
  thickness:0.1,roughness:0.35, metalness: 0.6,reflectivity: 0.4, color: 0x060f14, emissive: 0x000000
});

const Frame = forwardRef<{}, FrameProps>(({
    children,
    position,
    widthTexture,
    heightTexture,
    padding = 0.4,
    hasBackLight = true,
    hasWindow = true
  }: FrameProps,
  ref
  ) => {
  const light = useRef<any>();
  //useHelper(light, RectAreaLightHelper, 'green');


  return (
    <group
      position={position as any}
      ref={ref as any}
      castShadow

    >
      <group>
        <mesh
          position={[0,(0.5*heightTexture/widthTexture) + padding/4,0]}
          material={materialFrame}
        >
          <boxGeometry args={[1+padding, padding/2, 0.3]} />
        </mesh>
        <mesh
          position={[0,-(0.5*heightTexture/widthTexture) - padding/4,0]}
          material={materialFrame}
        >
          <boxGeometry args={[1+padding, padding/2, 0.3]} />
        </mesh>
        <mesh
          position={[0.5 + padding/4, 0,0]}
          material={materialFrame}
          >
          <boxGeometry args={[padding/2, heightTexture/widthTexture, 0.3]} />
        </mesh>
        <mesh
          position={[-0.5 -padding/4,0,0]}
          material={materialFrame}
        >
          <boxGeometry args={[padding/2, heightTexture/widthTexture, 0.3]} />
        </mesh>
        <Text
          font={'Playfulist_1.woff'}
          color={0xFFFFFF}
          fontSize={0.04}
          letterSpacing={0}
          anchorY="bottom"
          anchorX="center"
          lineHeight={0.8}
          position={[0, -(0.5*heightTexture/widthTexture) - padding/4, hasWindow ? 0.18 : 0.16]}>
          You're better than ads ™
        </Text>
      </group>
          <group position={[0, 0, -0.05]}>
            {children}
            { hasWindow && <mesh position={[0,0,0.215]} >
                <boxGeometry args={[1 + padding, heightTexture/widthTexture + padding, 0.025]} />
                {/*<meshStandardMaterial color="blue" wireframe={true} />*/}
                <meshPhysicalMaterial
                  transmission={1}
                  thickness={0.1}
                  roughness={0.1}
                />
              </mesh>
            }
            {hasBackLight && <rectAreaLight
              ref={light}
              position={[0, 0,0.225]}
              lookAt={[0,0,-1]}
              castShadow={true}
              args={[ 0xffffff, 0.4, 1, heightTexture/widthTexture]}
            />}
          </group>

    </group>
  )
});


export default Frame;