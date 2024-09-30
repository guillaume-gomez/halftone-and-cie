import React, { useRef , useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Grid } from '@react-three/drei';
import { useFullscreen } from "rooks";
import ThreeJsStripe from "./ThreeJsStripe";
import { stripeDataInterface, ImageSize } from "../interfaces";
import PanCursor from "../panCursor.png";
import Help3D from "./Help3D";


interface ThreejsRenderingProps {
  texture: string;
}

function ThreejsRendering({ texture } : ThreejsRenderingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toggleFullscreen } = useFullscreen({ target: canvasRef });
  const backgroundColor = "red";
  
  return (
    <div className="flex flex-col gap-5 w-full">
      <Canvas
        camera={{ position: [0, 0.0, 1], fov: 75, far: 5 }}
        dpr={window.devicePixelRatio}
        onDoubleClick={toggleFullscreen}
        ref={canvasRef}
        style={{width, height}}
      >
        <color attach="background" args={[backgroundColor]} />
        <OrbitControls makeDefault />
        {/*<Grid />*/}
        <Stage environment={null} adjustCamera shadows="contact">
          
        </Stage>
      </Canvas>
      <img className="absolute opacity-75" src={PanCursor} width="44px" />
      <Help3D />
      <ul className="text-xs">
        <li>Double click to switch to fullscreen</li>
        <li>Use your mouse or finger to move the camera</li>
      </ul>
    </div>
  );
}

export default ThreejsRendering;