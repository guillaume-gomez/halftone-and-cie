import MetroWall from "./MetroWall";
import MetroCeil from "./MetroCeil";
import MetroFloor from "./MetroFloor";
import { useHelper } from '@react-three/drei';
import { useRef } from "react";
import { SpotLightHelper } from "three";

interface MetroHallwayProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
}

function MetroHallway({ position, width, height, depth }: MetroHallwayProps) {
  const light = useRef();

  useHelper(light, SpotLightHelper, 'blue');

  return(
    <group position={position}>
        <spotLight
          ref={light}
          position={[0,3.5, -9.5]}
          castShadow={true}
          args={[ 0xffffff, 5, 1, Math.PI/2, 0.1, 0.9]}
        />
        
        <spotLight
          ref={light}
          position={[0,3.5, -9.5]}
          castShadow={true}
          args={[ 0xfA00ff, 5, 1, Math.PI/2, 0.1, 0.9]}
        />
        
        <spotLight
          position={[0,3.5, 0]}
          castShadow={true}
          args={[ 0xffff00, 7, 1000, Math.PI/2, 0.1, 0.9]}
        />

        <spotLight
          position={[0,3.5, 5]}
          castShadow={true}
          args={[ 0xff0000, 5, 1000, Math.PI/2, 0.5, 0.9]}
        />
        
        <spotLight
          position={[0,3.5, 10]}
          castShadow={true}
          args={[ 0x0000ff, 5, 1000, Math.PI/2, 0.5, 0.9]}
        />

        <spotLight
          position={[0,3.5, 15]}
          castShadow={true}
          args={[ 0x0000ff, 5, 1000, Math.PI/2, 0.5, 0.9]}
        />

        <spotLight
          position={[0,3.5, 20]}
          castShadow={true}
          args={[ 0x0000ff, 5, 1000, Math.PI/2, 0.5, 0.9]}
        />

        <spotLight
          position={[0,3.5, 25]}
          castShadow={true}
          args={[ 0x0000ff, 5, 1000, Math.PI/2, 0.5, 0.9]}
        />

        <spotLight
          position={[0,3.5, 30]}
          castShadow={true}
          args={[ 0x0000ff, 5, 1000, Math.PI/2, 0.5, 0.9]}
        />


      <MetroWall
        position={[0,0,0]}
        width={width}
        height={height}
        depth={depth}
      />
      <MetroCeil
        position={[0,height,0]}
        width={width}
        height={height}
        depth={depth}
      />
      <MetroFloor
        position={[0,0,0]}
        width={width}
        height={height}
        depth={depth}
      />
    </group>
  );
}

export default MetroHallway;