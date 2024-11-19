import { useCallback } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { MeshStandardMaterial, BoxGeometry } from 'three';

export type FaceType = "front" | "back" | "left" | "right";

interface MetroWallProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  hideFaces?: FaceType[];
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



function MetroWall({ position, width, height, depth, hideFaces = [] }: MetroWallProps) {
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

  const wallsLeft = generateWallParams(depth, height, 0).map((position, index) => {
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

  const wallsRight = generateWallParams(depth, height, 0).map((position, index) => {
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

  const wallsForward = generateWallParams(width, height, depth).map((position, index) => {
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

  const wallsBackward = generateWallParams(width, height, depth).map((position, index) => {
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
      {
        !hideFaces.includes("left") &&
        <group
          rotation={[0,Math.PI/2,0]}
          position={[-width/2,0,depth/2-0.5]}
        >
          {wallsLeft}
        </group>
      }
      {
        !hideFaces.includes("right") &&
        <group
          rotation={[0,Math.PI/2,0]}
          position={[width/2,0,depth/2 -0.5]}
        >
          {wallsRight}
        </group>
      }
      {
        !hideFaces.includes("front") &&
        <group
          rotation={[0,0,0]}
          position={[-width/2 + 0.5,0,-depth/2]}
        >
          {wallsForward}
        </group>
      }
      {
        !hideFaces.includes("back") &&
        <group
          rotation={[0,0,0]}
          position={[-width/2 + 0.5,0,-depth - depth/2]}
        >
          {wallsBackward}
        </group>
      }
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