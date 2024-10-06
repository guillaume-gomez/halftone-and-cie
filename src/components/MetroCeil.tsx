import { useCallback } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';

import { MeshStandardMaterial, BoxGeometry } from 'three';

interface MetroCeilProps {
  position: [number, number, number]
}

const boxGeometry = new BoxGeometry(1.0, 1.0 , 0.1);


function MetroCeil({ position }: MetroCeilProps) {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_basecolor.jpg',
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_height.png',
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_normal.jpg',
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_roughness.jpg',
    'Concrete_Ceiling_001_SD/Concrete_Ceiling_001_ambientOcclusion.jpg',
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

  return (
    <mesh
      position={position as any}
      material={material}
      geometry={boxGeometry}
      rotation={[Math.PI/2,0,0]}
    >
    </mesh>
  )
}

export default MetroCeil;