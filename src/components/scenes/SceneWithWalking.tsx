import { useRef , useEffect, MutableRefObject } from 'react';
import { CameraControls } from '@react-three/drei';
import Ad from "../Ad";
import Frame from "../Frame";
import MetroHallway from "../Metro/MetroHallway";

interface SceneWithWalkingProps {
  widthTexture: number;
  heightTexture: number;
  texture: string;
}


function SceneWithWalking({ widthTexture, heightTexture, texture } : SceneWithWalkingProps) {
  const cameraControllerRef = useRef<CameraControls|null>(null);
  const frameRef = useRef(null);
  const originalCameraPosition = 20;
  
  useEffect(() => {
    if(!cameraControllerRef.current) {
      return;
    }

    cameraControllerRef.current.setTarget(-1000,0,0, false);
    cameraControllerRef.current.setPosition(10,0, originalCameraPosition, false);

    setTimeout(() => {
      recenter();
    }, 1000);

  },[texture, widthTexture, heightTexture, cameraControllerRef]);


  async function recenter() {
    if(!frameRef.current || !cameraControllerRef.current) {
      return;
    }

    await cameraControllerRef.current.setTarget(-1000,0,0, false);
    await cameraControllerRef.current.setPosition(10,0, originalCameraPosition, true);
    await cameraControllerRef.current.setPosition(0,0, originalCameraPosition, true);
    const position = cameraControllerRef.current.camera.position
    await cameraControllerRef.current.setTarget(position.x-0.1,position.y,position.z, false);

    await cameraControllerRef.current.rotate(-Math.PI/2,0,true);

    await cameraControllerRef.current.setTarget(0,0,0,false)
    await cameraControllerRef.current.fitToBox(frameRef.current, true,
      { paddingLeft: .1, paddingRight: .1, paddingBottom: .1, paddingTop: .1 }
    );
  }


  return (
		<>
		  <ambientLight intensity={0.30} />
      <CameraControls
        makeDefault
        smoothTime={0.25}
        restThreshold={0.1}
        ref={cameraControllerRef}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.9}
        maxDistance={3}
        makeDefault
      />
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
      <MetroHallway
        position={[8,0,20.4]}
        width={6}
        depth={10}
        height={4}
        rotation={[0, Math.PI/2, 0]}
        hideFaces={["back"]}
      />
      <MetroHallway
        position={[0,0,20.4]}
        width={6}
        depth={6}
        height={4}
        hideFaces={["right", "back"]}
      />
    </>
	);
}

export default SceneWithWalking;