import MetroWall, { FaceType } from "./MetroWall";
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
  rotation?: [number, number, number];
  hideFaces?: FaceType[];
}

function MetroHallway({ position, width, height, depth, rotation = [0,0,0], hideFaces = [] }: MetroHallwayProps) {

  function computeLightsZ() {
    const spacingBetweenLights = 5;
    const numberOfLights = Math.floor(depth / spacingBetweenLights);
    return Array.from({length: numberOfLights}, (_v, index) => (index * 5)  - depth/2);
  }

  return(
    <group position={position} rotation={rotation}>
      {
        computeLightsZ().map(z => {
          return (
            <LightBulb
              key={z}
              position={[0, 3.45, z]}
            />);
        })

      }

        <MetroWall
          position={[0,0,0]}
          width={width}
          height={height}
          depth={depth}
          hideFaces={hideFaces}
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