import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';

interface AdProps {
  base64Texture: string;
  position: [number, number, number]
}

function Ad({ base64Texture, position }: AdProps) {
  const [texture] = useLoader(TextureLoader, [
    base64Texture
  ]);


  if(!texture) {
    return <></>;
  }

  
  return (
    <mesh
      position={position as any}
    >
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default Ad;