import { useRef , useEffect, MutableRefObject } from 'react';
import { Color } from "three";
import { CameraControls, Stage } from '@react-three/drei';
import { useControls } from 'leva';
import Ad from "../Ad";
import Frame from "../Frame";
import MetroHallway from "../Metro/MetroHallway";

interface SceneWithWalkingProps {
  widthTexture: number;
  heightTexture: number;
  texture: string;
}


function MinimalScene({ widthTexture, heightTexture, texture } : SceneWithWalkingProps) {
  const cameraControllerRef = useRef<CameraControls|null>(null);
  const frameRef = useRef(null);
  const pointRef = useRef()
  useControls('Point Light', {
    visible: {
      value: true,
      onChange: (v) => {
        if(pointRef.current) {
          pointRef.current.visible = v  
        }
      },
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
      onChange: (v) => {
        pointRef?.current?.position.copy(v)
      },
    },
    color: {
      value: 'white',
      onChange: (v) => {
        if(pointRef.current) {
          pointRef.current.color = new Color(v) 
        }
      },
    },
  });
  useEffect(() => {
    if(!cameraControllerRef.current) {
      return;
    }
    recenter();
  },[texture, widthTexture, heightTexture, cameraControllerRef]);


  async function recenter() {
    if(!frameRef.current || !cameraControllerRef.current) {
      return;
    }
    const { x, y, z } = cameraControllerRef.current.camera.position
    await cameraControllerRef.current.setPosition(x,y, z+3, false);
    await cameraControllerRef.current.fitToBox(frameRef.current, true,
      { paddingLeft: .1, paddingRight: .1, paddingBottom: .1, paddingTop: .1 }
     );
  }

  const originalCameraPosition = 3;
  

  return (
		<>
		  <ambientLight intensity={0.1} />
        <CameraControls
          makeDefault
          smoothTime={0.25}
          restThreshold={0.1}
          ref={cameraControllerRef}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.9}
          minAzimuthAngle={0}
          maxAzimuthAngle={0.55}
          makeDefault
          maxDistance={3}
        />
        <pointLight ref={pointRef} position={[0, 1, -14.1]} />
        <Frame
          position={[0,1.5, -12.4]}
          widthTexture={widthTexture}
          heightTexture={heightTexture}
          ref={frameRef}
          hasWindow={true}
          hasBackLight={true}
        >
          <Ad
            base64Texture={texture}
            widthTexture={widthTexture}
            heightTexture={heightTexture}
          />
        </Frame>
        <MetroHallway
          position={[0,0,2.4]}
          width={6}
          depth={30}
          height={4}
          hideFaces={["front"]}
        />
    </>
	);
}

export default MinimalScene;