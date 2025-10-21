import { useRef , useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  CameraControls,
  PerspectiveCamera,
  Stage,
  Grid,
  Stats,
  GizmoHelper,
  GizmoViewport,
  Gltf
} from '@react-three/drei';
import { useFullscreen } from "rooks";
import { 
  animated, 
  useSpring,
} from '@react-spring/three';
import Ad from "./Ad";
import Frame from "./Frame";
import MetroHallway from "./Metro/MetroHallway";

const { BASE_URL, MODE } = import.meta.env;

interface ThreejsRenderingProps {
  texture?: string;
  widthTexture: number;
  heightTexture: number;
}

const exampleTexture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";

const AnimatedGltf = animated(Gltf);
const AnimatedCamera = animated(PerspectiveCamera);

function ThreejsRendering({
    texture = exampleTexture,
    widthTexture,
    heightTexture
  } : ThreejsRenderingProps) {
  const width = 750;
  const height = 750;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toggleFullscreen } = useFullscreen({ target: canvasRef });
  const cameraControllerRef = useRef<PerspectiveCamera|null>(null);
  const frameRef = useRef(null);
  const backgroundColor = "purple";
  const originalCameraPosition = 20;

  const propsTrain = useSpring({
    from: { x: -70 },
    to: [
      { x: -10 },
      { x: -5 },
      { x: 4.55 },
    ],
    config: {
      duration: 2000,
    },
    loop: true
  });

  const propsCamera = useSpring({
    from: { x: -70 },
    to: [
      { x: -10 },
      { x: -2 },
      { x: 0.75 },
    ],
    config: {
      duration: 2000,
    },
    loop: false
  });


  useEffect(() => {
    if(!cameraControllerRef.current) {
      return;
    }

    // cameraControllerRef.current.setTarget(-1000,0,0, false);
    // cameraControllerRef.current.setPosition(10,0, originalCameraPosition, false);

    // setTimeout(() => {
    //   recenter();
    //}, 1000);

  },[texture, widthTexture, heightTexture, cameraControllerRef]);


  async function recenter() {
    // if(!frameRef.current || !cameraControllerRef.current) {
    //   return;
    // }

    // await cameraControllerRef.current.setTarget(-1000,0,0, false);
    // await cameraControllerRef.current.setPosition(10,0, originalCameraPosition, true);
    // await cameraControllerRef.current.setPosition(0,0, originalCameraPosition, true);

    // const position = cameraControllerRef.current._camera.position
    // await cameraControllerRef.current.setTarget(position.x-0.1,position.y,position.z, false);

    // await cameraControllerRef.current.rotate(-Math.PI/2,0,true);

    // await cameraControllerRef.current.setTarget(0,0,0,false)
    // await cameraControllerRef.current.fitToBox(frameRef.current, true,
    //   { paddingLeft: .1, paddingRight: .1, paddingBottom: .1, paddingTop: .1 }
    // );
  }



  return (
    <div className="flex flex-col gap-5 w-full">
      <Canvas
        camera={{ position: [10, 2, originalCameraPosition], target:[0,10,-10], fov: 75, far: 1000 }}
        dpr={window.devicePixelRatio}
        onDoubleClick={toggleFullscreen}
        ref={canvasRef}
        style={{width, height}}
      >
        <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={0.30} />
        <AnimatedCamera
          makeDefault
          ref={cameraControllerRef}
          position-x={propsCamera.x}
          position-y={4}
          position-z={-1.5}

        />
        {/*<CameraControls makeDefault />*/}
        <Stage environment={null} adjustCamera={false} shadows="contact">
          <Frame
            position={[0.95,3.5, -16]}
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
          <Grid  args={[50, 50]} position={[0,-0.5,0]} cellColor='white' />


          <group rotation={[0, Math.PI, 0]}>
            <AnimatedGltf 
            src={`${BASE_URL}/train.glb`}
            scale={0.005}
            position-x={propsTrain.x}
            position-y={0}
            position-z={.5}
            rotation={[ 0, -Math.PI/28, 0]}
          />
          <Gltf src={`${BASE_URL}/japanese-train-station.glb`} scale={5} position={[0,4,0]}  rotation={[ 0, 0, 0]}/>
          <Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[10,-6,0]}  rotation={[ 0, 0, 0]}/>
          <Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[22,-6,0]}  rotation={[ 0, 0, 0]}/>
          <Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[34,-6,0]}  rotation={[ 0, 0, 0]}/>
          <Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[46,-6,0]}  rotation={[ 0, 0, 0]}/>
          <Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[58,-6,0]}  rotation={[ 0, 0, 0]}/>
          <Gltf src={`${BASE_URL}/connector.glb`} scale={4} position={[70,-6,0]}  rotation={[ 0, 0, 0]}/>
          </group>
        </Stage>
        {/*<MetroHallway
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
        />*/}

        <Stats showPanel={0} className="stats"/>
         <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      </Canvas>
      <ul className="text-xs">
        <li>Double click to switch to fullscreen</li>
        <li>Use your mouse or finger to move the camera</li>
      </ul>
    </div>

  );
}

export default ThreejsRendering;