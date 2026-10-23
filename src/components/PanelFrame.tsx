import { useMemo } from "react";
import { useLoader } from '@react-three/fiber';
import { MeshStandardMaterial, FrontSide, TextureLoader } from "three";

interface PanelFrameProps {
  position?: [number, number, number]
}

function PanelFrame({
  position = [0,0,0],
}: PanelFrameProps) {
  const [texture] = useLoader(TextureLoader, [
    "panel-frame.png"
  ]);

  const material : MeshStandardMaterial = useMemo(() =>
    new MeshStandardMaterial({ map: texture, side: FrontSide})
  , [texture]);


  if(!texture) {
    return <></>;
  }

  return (
    <mesh
      position={position}
      material={material}
    >
      <planeGeometry args={[1, 0.5]} />
    </mesh>
  )
}

export default PanelFrame;