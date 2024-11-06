import MetroWall from "./MetroWall";
import MetroCeil from "./MetroCeil";
import MetroFloor from "./MetroFloor";
import { useHelper } from '@react-three/drei';
import { useRef } from "react";
import { SpotLightHelper } from "three";
import LightBulb from "../LightBulb";

interface MetroHallwayProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
}

function MetroHallway({ position, width, height, depth }: MetroHallwayProps) {
 
  return(
    <group position={position}>
      {
        [-23, -20, -15, -10, -5, 0, 5, 10, 15, 20].map(z => {
          return (
            <LightBulb
              key={z}
              position={[0, 3.25, z]}
            />);
        })
      
      }
      
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