import { useCallback } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';

import { MeshStandardMaterial, BoxGeometry } from 'three';

interface MetroFloorProps {
  position: [number, number, number];
  width: number;
  height: number;
}

const boxGeometry = new BoxGeometry(1.0, 1.0 , 0.1);


function generateCeilParams(width: number, height: number, depth: number) {
  const coordinates =  Array.from(Array(width)).map((_x, x) => {
    return Array.from(Array(height)).map((_y, y) => {
      return [y, depth, x];
    });
  });

  return coordinates.flat();
}


function MetroFloor({ position, depth, width, height }: MetroFloorProps) {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'Concrete_019_SD/Concrete_019_BaseColor.jpg',
    'Concrete_019_SD/Concrete_019_Height.png',
    'Concrete_019_SD/Concrete_019_Normal.jpg',
    'Concrete_019_SD/Concrete_019_Roughness.jpg',
    'Concrete_019_SD/Concrete_019_AmbientOcclusion.jpg',
  ]);

  const material = useCallback(
    new MeshStandardMaterial({
      displacementScale: 0,
      map: colorMap,
      displacementMap,
      normalMap,
      roughnessMap,
      aoMap })
  , []);

  /*return ( <mesh
              key={`-ceil`}
              position={position}
              material={material}
              geometry={boxGeometry}
            ></mesh>);*/

  return (
    <group position={position} rotation={[0,0,0]}>
      {
        generateCeilParams(depth, width, 0).map(([x,y,z], index) => {
          return (
            <mesh
              key={`${index}-ceil`}
              position={[x-(width/2) + 0.5,y -0.5,z - depth/2 + 0.5]}
              material={material}
              rotation={[Math.PI/2,0,0]}
              geometry={boxGeometry}
            >
            </mesh>
          )
        })
      }
    </group>
  )
}

export default MetroFloor;