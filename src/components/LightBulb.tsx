import { Gltf } from '@react-three/drei';
import { Vector3 } from "three";

interface LightBulbProps {
  position?: [number, number, number]
}

function LightBulb({
  position = [0,0,0],
  }: LightBulbProps) {

  return (
      <group position={position}>
       <Gltf src="lightBulb.glb"  scale={2.5} visible={true}>
       </Gltf>
          <rectAreaLight
          //ref={light}
          position={[0,-0.01,0]}
          rotation={[-Math.PI/2,0, 0]}
          lookAt={new Vector3(0,-1,0)}
          castShadow={true}
          args={[ 0xffffff, 5, 3, 1]}
        />
       </group>
  )
}

export default LightBulb;