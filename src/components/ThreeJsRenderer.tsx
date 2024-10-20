import React, { useRef , useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Stage, Grid, Stats, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useFullscreen } from "rooks";
import Ad from "./Ad";
import Frame from "./Frame";
import MetroHallway from "./Metro/MetroHallway";



interface ThreejsRenderingProps {
  texture?: string;
  widthTexture: number;
  heightTexture: number;
}


const exampleTexture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";

function ThreejsRendering({
    texture = exampleTexture,
    widthTexture,
    heightTexture
  } : ThreejsRenderingProps) {
  const width = 750;
  const height = 750;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toggleFullscreen } = useFullscreen({ target: canvasRef });
  const cameraControllerRef = useRef<CameraControls|null>(null);
  const frameRef = useRef(null);
  const backgroundColor = "purple";


  useEffect(() => {
    recenter()
  },[texture, widthTexture, heightTexture]);

  async function recenter() {
    if(!frameRef.current || !cameraControllerRef.current) {
      return;
    }

    await cameraControllerRef.current.setLookAt(
        0, 0, 20,
        0,0, 0,
        false
      );


    await cameraControllerRef.current.fitToBox(frameRef.current, true,
      { paddingLeft: 1, paddingRight: 1, paddingBottom: 1, paddingTop: 1 }
    );
  }
  
  return (
    <div className="flex flex-col gap-5 w-full">
      <Canvas
        camera={{ position: [0, 0.0, 1], fov: 75, far: 1000 }}
        dpr={window.devicePixelRatio}
        onDoubleClick={toggleFullscreen}
        ref={canvasRef}
        style={{width, height}}
      >
        <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={0.75} />
        <CameraControls
          makeDefault
          ref={cameraControllerRef}
        />
        <Stage environment={null} adjustCamera={false} shadows="contact">
          <Frame
            position={[0,1, -4.65]}
            widthTexture={widthTexture}
            heightTexture={heightTexture}
            ref={frameRef}
          >
            <Ad
              base64Texture={texture}
              widthTexture={widthTexture}
              heightTexture={heightTexture}
            />
          </Frame>
          <Grid  args={[20, 20]} position={[0,-0.5,0]} cellColor='white' />
        </Stage>
        <MetroHallway position={[0,0,7.5]} width={6} depth={20} height={4} />
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