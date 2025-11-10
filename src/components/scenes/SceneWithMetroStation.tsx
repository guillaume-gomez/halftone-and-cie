import { useRef , useEffect } from 'react';
import { DoubleSide, MathUtils } from "three";
import { animated, useSpring } from "@react-spring/three";
import {
  CameraControls,
  Gltf,
  PerspectiveCamera,
  Stars,
  Stage,
} from '@react-three/drei';
import Ad from "../Ad";
import Frame from "../Frame";
import Tunnel from "../Metro/Tunnel";
import MetroHallway from "../Metro/MetroHallway";
import Train from "../Train";

const { BASE_URL, MODE } = import.meta.env;

const AnimatedGltf = animated(Gltf);
const AnimatedCamera = animated(PerspectiveCamera);

interface SceneWithWalkingProps {
  widthTexture: number;
  heightTexture: number;
  texture: string;
}


function SceneWithMetroStation({ widthTexture, heightTexture, texture } : SceneWithWalkingProps) {
  const cameraControllerRef = useRef<CameraControls|null>(null);
  const frameRef = useRef(null);
  const originalCameraPosition = 20;
  const backgroundColor = "#100d36";
  
  const [propsTrain, apiTrain] = useSpring(
    () => (
      {}),
      []
    );
  const [propsCamera, apiCamera] = useSpring(
     () => ({}),
    []
  );

  async function move() {
    await cameraControllerRef.current.setTarget(0, 0, -10000, false);
    const {x, y, z } = cameraControllerRef.current.camera.position
    await cameraControllerRef.current.setTarget(x, y, z-0.1, false);
    await cameraControllerRef.current.rotate(180 * MathUtils.DEG2RAD, 0, true )
    await cameraControllerRef.current.setTarget(0,3,0, true);
    await cameraControllerRef.current.setPosition(0,3, -2, true);
    await cameraControllerRef.current.setTarget(6,3,-1, true);
    
    const {x:xx, y: yy, z: zz } = cameraControllerRef.current.camera.position
    
    apiTrain.start({
      from: { x: 7.55 },
      to: [
        { x: -70 },
      ],
      config: {
        duration: 2000,
      },
      loop: false,
      onRest: () => {
        apiTrain.start({
         from: { x: 70 },
          to: [
            { x: 10 },
            { x: 8 },
            { x: 7.55 },
          ],
          config: {
            duration: 2000,
          },
          loop: false,
        });
      }
    });

    apiCamera.start({
      from: { x: -(7.55 - 7), y: 2, z: -2 },
      to: [
        { x: -(-70 -7), y: 2, z: -2 },
      ],
      config: {
        duration: 2000,
      },
      loop: false,
      onStart: () => {
        cameraControllerRef.current.setTarget(0, 0, -10000, false);
      },
      onChange: ({value}, spring) => {
        cameraControllerRef.current && cameraControllerRef.current.setPosition(value.x, value.y, value.z, false)
      },
      onRest: () => {
        apiCamera.start({
          from: { x: -(70 - 7), z: -2, y: 2.2 },
          to: [
              { x: -(10 - 7), },
              { x: -(8 - 7),  },
              { x: -(7.55 - 7), },
          ],
          config: {
            duration: 2000,
          },
          loop: false,
          onStart: () => {
            cameraControllerRef.current.setTarget(0, 0, -10000, false);
          },
          onChange: ({value}, spring) => {
            cameraControllerRef.current && cameraControllerRef.current.setPosition(value.x, value.y, value.z, false)
          },
          onRest: () => {
            cameraControllerRef.current.fitToBox(frameRef.current, true, { paddingLeft: .1, paddingRight: .1, paddingBottom: .1, paddingTop: .1 })
          }
        });
      }
    });  
  }

  useEffect(() => {
    move();
  },[texture, widthTexture, heightTexture, cameraControllerRef]);


  return (
		<>
      <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={0.30} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
          <Frame
            position={[0.95,3.5, -8.5]}
            scale={1.5}
            widthTexture={widthTexture}
            heightTexture={heightTexture}
            ref={frameRef}
            hasWindow={false}
            hasBackLight={false}
          >
            <Ad
              base64Texture={texture}
              widthTexture={widthTexture}
              heightTexture={heightTexture}
            />
          </Frame>
          <CameraControls ref={cameraControllerRef} makeDefault />
          <group rotation={[0, Math.PI, 0]}>
            {/*<AnimatedCamera
              makeDefault
              ref={cameraControllerRef}
              position-x={propsCamera.x}
              position-y={propsCamera.y}
              position-z={propsCamera.z}
              position={[-0.5, 2, 1]}
              rotation={[0, Math.PI, 0]}
            />*/}
            
            {/*<>
              <CameraControls makeDefault canPan />
              <animated.mesh position-x={propsCamera.x} position-y={propsCamera.y} position-z={propsCamera.z}>
                <meshStandardMaterial color="blue" />
                <boxGeometry args={[1,1,1]} />
              </animated.mesh>
            </>*/}
          <Tunnel position={[70,-6,0]}/>
          <Train position={[propsTrain.x, 0, -0.5]}></Train>
          <Gltf src={`${BASE_URL}/japanese-train-station.glb`} scale={5} position={[0,4,0]}  rotation={[ 0, 0, 0]}/>
          <Tunnel position={[-20, -6, 0]}/>

          </group>
    </>
	);
}

export default SceneWithMetroStation;