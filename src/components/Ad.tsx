import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';

interface AdProps {
  base64Texture: string;
  widthTexture: number;
  heightTexture: number;
  position?: [number, number, number]
}

function Ad({
  base64Texture,
  position = [0,0,0],
  widthTexture,
  heightTexture
}: AdProps) {
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
      <boxGeometry args={[1, heightTexture/widthTexture, 0.1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default Ad;