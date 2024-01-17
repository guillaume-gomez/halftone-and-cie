import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import frida from '/frida.jpg';
import Slider from "./components/Slider";
import './App.css';
import { halftone, loadImage } from "./utils";

function App() {
  const imageRef = useRef<HTMLCanvasElement>(null);
  const canvasBufferRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [angle, setAngle] = useState<number>(0);

  useEffect(() => {
    if(canvasBufferRef.current) {
      loadImage(frida, canvasBufferRef.current);
    }
  }, [canvasBufferRef]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Slider min={0} max={180} value={angle} onChange={(value) => setAngle(value)} label="Angle" />
      <button onClick={() => halftone(canvasBufferRef.current, canvasRef.current, { angle, dotSize: 10, dotResolution: 10 } )}>Generate</button>
      <canvas ref={canvasBufferRef} style={{display: "none"}} />
      <canvas ref={canvasRef} />
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
