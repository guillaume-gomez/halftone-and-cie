import { useCallback } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { MeshStandardMaterial, BoxGeometry } from 'three';

interface MetroWallProps {
  position: [number, number, number]
}

const boxGeometry = new BoxGeometry(1.0, 1.0 , 0.1);


function MetroWall({ position }: MetroWallProps) {
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

  const walls = Array.from(Array(10)).map((x, index) => {
      return (
        <mesh
          key={index}
          position={[index, 0, 0]}
          material={material}
          geometry={boxGeometry}
        >
        </mesh>
      );
  });

  return (
    <group position={position as any}>
      {walls}
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