import { useMemo } from "react";
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

import { MeshStandardMaterial, BoxGeometry } from 'three';

interface MetroCeilProps {
  position: [number, number, number];
  width: number;
  depth: number;
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


function MetroCeil({ position, depth, width }: MetroCeilProps) {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_basecolor.jpg',
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_height.png',
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_normal.jpg',
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_roughness.jpg',
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_ambientOcclusion.jpg',
  ]);

  const material = useMemo(
    () => new MeshStandardMaterial({
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

export default MetroCeil;