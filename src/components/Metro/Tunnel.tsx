import { useEffect } from "react";
import { DoubleSide, type Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { animated } from '@react-spring/three';

const { BASE_URL } = import.meta.env;

interface TunnelProps {
	position: [number, number, number];
}

function Tunnel({position} : TunnelProps) {
	const [x, y, z] = position;
	const gltf = useLoader(GLTFLoader, `${BASE_URL}/connector.glb`);
	useEffect(() => {
		if(gltf.scene) {
			doubleSide(gltf.scene)
		}
	}, [gltf])
	
	function doubleSide(mesh: Mesh) {
		mesh.traverse((child) => {
			if(child.isMesh) {
				child.material.side = DoubleSide;
			}
		})
	}

	return (<>
		<primitive object={gltf.scene.clone()} scale={4} position={[x, y, z]} />
      	<primitive object={gltf.scene.clone()} scale={4} position={[x - (1 * 12), y, z]} />
      	<primitive object={gltf.scene.clone()} scale={4} position={[x - (2 * 12), y, z]} />
      	<primitive object={gltf.scene.clone()} scale={4} position={[x - (3 * 12), y, z]} />
      	<primitive object={gltf.scene.clone()} scale={4} position={[x - (4 * 12), y, z]} />
      	<primitive object={gltf.scene.clone()} scale={4} position={[x - (5 * 12), y, z]} />
	</>)
}

export default Tunnel;