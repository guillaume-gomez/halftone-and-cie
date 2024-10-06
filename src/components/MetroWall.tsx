import { useCallback } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';

import { MeshStandardMaterial, BoxGeometry } from 'three';

interface MetroWallProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
}

const boxGeometry = new BoxGeometry(1.0, 1.0 , 0.1);

function generateWallParams(width: number, height: number, depth: number) {
  const coordinates =  Array.from(Array(width)).map((_x, x) => {
    return Array.from(Array(height)).map((_y, y) => {
      return [x,y, depth];
    });
  });

  return coordinates.flat();
}



function MetroWall({ position, width=10, height=3, depth=2 }: MetroWallProps) {
  const [displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'Subway_Tiles_002_SD/Subway_Tiles_002_height.png',
    'Subway_Tiles_002_SD/Subway_Tiles_002_normal.jpg',
    'Subway_Tiles_002_SD/Subway_Tiles_002_roughness.jpg',
    'Subway_Tiles_002_SD/Subway_Tiles_002_ambientOcclusion.jpg',
  ]);

  const material = useCallback(
    new MeshStandardMaterial({
      displacementScale: 0,
      map: aoMap,
      displacementMap,
      normalMap,
      roughnessMap,
      aoMap })
  , []);

  const wallsLeft = generateWallParams(width, height, depth).map((position, index) => {
      return (
        <mesh
          key={`${index}-left`}
          position={position}
          material={material}
          geometry={boxGeometry}
        >
        </mesh>
      );
  });

  const wallsRight = generateWallParams(width, height, depth).map((position, index) => {
      return (
        <mesh
          key={`${index}-right`}
          position={position}
          material={material}
          geometry={boxGeometry}
        >
        </mesh>
      );
  });

  const wallsForward = generateWallParams(2*depth, height, 0).map((position, index) => {
      return (
        <mesh
          key={`${index}-forward`}
          position={position}
          material={material}
          geometry={boxGeometry}
        >
        </mesh>
      );
  });

  const wallsBackward = generateWallParams(2*depth, height, 0).map((position, index) => {
      return (
        <mesh
          key={`${index}-backward`}
          position={position}
          material={material}
          geometry={boxGeometry}
        >
        </mesh>
      );
  });




  return (
    <group position={position as any}>
      <group
        rotation={[0,Math.PI/2,0]}
        position={[depth,0,0]}
      >
        {wallsLeft}
      </group>
      <group
        rotation={[0,Math.PI/2,0]}
        position={[-depth,0,0]}
      >
        {wallsRight}
      </group>
      <group
        rotation={[0,0,0]}
        position={[0.5,0,-width + 0.5]}
      >
        {wallsForward}
      </group>
      <group
        rotation={[0,0,0]}
        position={[0.5,0,0.5]}
      >
        {wallsBackward}
      </group>
    </group>
  );

/*
  return (
    <mesh
      position={position as any}
      material={material}
      geometry={boxGeometry}
    >
    </mesh>
  )*/
}

export default MetroWall;