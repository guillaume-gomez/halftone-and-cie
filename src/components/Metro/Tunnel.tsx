import { Gltf } from '@react-three/drei';
const { BASE_URL } = import.meta.env;

interface TunnelProps {
	position: [number, number, number];
}

function Tunnel({position} : TunnelProps) {
	const [x, y, z] = position;
	return (<>
		<Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[x,y,z]} />
      	<Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[x - (1 * 12),y,z]} />
      	<Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[x - (2 * 12),y,z]} />
      	<Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[x - (3 * 12),y,z]} />
      	<Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[x - (4 * 12),y,z]} />
      	<Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[x - (5 * 12),y,z]} />
	</>)
}

export default Tunnel;