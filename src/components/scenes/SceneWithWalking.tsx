import { MutableRefObject } from 'react';
import { CameraControls, Stage } from '@react-three/drei';
import Ad from "../Ad";
import Frame from "../Frame";
import MetroHallway from "../Metro/MetroHallway";

interface SceneWithWalkingProps {
  cameraRef: MutableRefObject<CameraControls | null>;
  frameRef: any;
  widthTexture: number;
  heightTexture: number;
  texture: string;
}


function SceneWithWalking({ cameraRef, frameRef, widthTexture, heightTexture, texture } : SceneWithWalkingProps) {
	return (
		<>
		  <ambientLight intensity={0.30} />
      <CameraControls
        makeDefault
        smoothTime={0.25}
        restThreshold={0.1}
        ref={cameraRef}
      />
      <Stage environment={null} adjustCamera={false} shadows="contact">
        <Frame
          position={[0,1, -25]}
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
      </Stage>

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