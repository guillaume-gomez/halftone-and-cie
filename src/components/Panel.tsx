import { useMemo } from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { FrontSide } from "three";

interface PanelProps {
  path: string
  position?: [number, number, number]
  rotation?: [number, number, number]
}

function Panel({
  position = [0,0,0],
  rotation = [0,0,0],
  path
}: PanelProps) {
  const [texture] = useLoader(TextureLoader, [
    path
  ]);

  const imageRatio = useMemo(() => texture.image.width / texture.image.height, [path]);

  if(!texture) {
    return <></>;
  }
  
  return (
    <mesh
      position={position as any}
      rotation={rotation as any}
    >
      <planeGeometry args={[imageRatio, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export default Panel;