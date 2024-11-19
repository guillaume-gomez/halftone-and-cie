import { useCallback } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { MeshStandardMaterial, FrontSide } from "three";

interface PanelFramePros {
  position?: [number, number, number]
  ratio: number;
}

function PanelFrame({
  position = [0,0,0],
  ratio
}: PanelFrameProps) {
  const [texture] = useLoader(TextureLoader, [
    "panel-frame.png"
  ]);

  const material = useCallback(
    new MeshStandardMaterial({ map: texture, side: FrontSide})
  , [texture]);



  if(!texture) {
    return <></>;
  }

  
  return (
    <mesh
      position={position as any}
      material={material}
    >
      <planeGeometry args={[1, 0.5]} />
    </mesh>
  )
}

export default PanelFrame;