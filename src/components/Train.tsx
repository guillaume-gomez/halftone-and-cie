import { useEffect } from "react";
import { DoubleSide, type Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { animated } from '@react-spring/three';

const { BASE_URL } = import.meta.env;

interface TrainProps {
	position: any
}

function Train ({position} : TrainProps ) {
	const gltf = useLoader(GLTFLoader, `${BASE_URL}/train.glb`);
	console.log(position)
	const [x, y, z] = position;

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

	return <animated.primitive
		position-x={x}
		position-y={y}
		position-z={z}
		object={gltf.scene}
		scale={0.0075}
		rotation={[ 0, -Math.PI/28, 0]}
	/>
}

export default Train;