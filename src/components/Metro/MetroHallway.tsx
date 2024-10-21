import MetroWall from "./MetroWall";
import MetroCeil from "./MetroCeil";
import MetroFloor from "./MetroFloor";
import { Box, useHelper } from '@react-three/drei';
import { useRef } from "react";
import { SpotLightHelper } from "three";

interface MetroHallwayProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
}

function MetroHallway({ position, width, height, depth }: MetroHallwayProps) {
  const light = useRef()
  useHelper(light, SpotLightHelper, 'cyan')
  return(
    <group position={position}>
      {/*<Lightformer
        form="rect" // circle | ring | rect (optional, default = rect)
        intensity={1} // power level (optional = 1)
        color="red" // (optional = white)
        scale={[4, 1]} // Scale it any way you prefer (optional = [1, 1])
        position={[0,height - 1,-10]}
        target={[0, 0,-5]} // Target position (optional = undefined)
      />*/}
      <spotLight ref={light} position={[0,2, 2]}/>

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