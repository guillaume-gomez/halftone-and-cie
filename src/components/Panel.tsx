import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { FrontSide } from "three";

interface PanelProps {
  path: string
  position?: [number, number, number]
}

function Panel({
  position = [0,0,0],
  path
}: PanelProps) {
  const [texture] = useLoader(TextureLoader, [
    path
  ]);


  if(!texture) {
    return <></>;
  }

  
  return (
    <mesh
      position={position as any}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={texture} side={FrontSide} />
    </mesh>
  )
}

export default Panel;