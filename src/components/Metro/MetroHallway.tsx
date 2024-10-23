import MetroWall, { FaceType } from "./MetroWall";
import MetroCeil from "./MetroCeil";
import MetroFloor from "./MetroFloor";
import { Box } from '@react-three/drei';



interface MetroHallwayProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  rotation?: [number, number, number];
  hideFaces?: FaceType[];
}

function MetroHallway({ position, width, height, depth, rotation = [0,0,0], hideFaces = [] }: MetroHallwayProps) {
  return(
    <group position={position} rotation={rotation}>
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