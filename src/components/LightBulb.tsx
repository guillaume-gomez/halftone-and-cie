import { useRef } from "react";
import { useHelper } from '@react-three/drei';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

interface LightBulbProps {
  position?: [number, number, number]
}

function LightBulb({
  position = [0,0,0],
  }: LightBulbProps) {
  //const light = useRef();
  //useHelper(light, RectAreaLightHelper, 'blue');
  

  return (
    <mesh position={position}>
      <boxGeometry  args={[3, 0.1, 1]} />
      <meshStandardMaterial color={0xF00FFF} />
      <rectAreaLight
        //ref={light}
        rotation={[-Math.PI/2,0, 0]}
        lookAt={[0,-1,0]}
        castShadow={true}
        args={[ 0xffffff, 5, 3, 1]}
      />
    </mesh>
  )
}

export default LightBulb;