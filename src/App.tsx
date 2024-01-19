import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import frida from '/frida.jpg';
import Slider from "./components/Slider";
import ColorInput from "./components/ColorInput";
import './App.css';
import { halftone, loadImage } from "./utils";

function App() {
  const imageRef = useRef<HTMLCanvasElement>(null);
  const canvasBufferRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [angle, setAngle] = useState<number>(0);
  const [dotSize, setDotSize] = useState<number>(10);
  const [dotResolution, setDotResolution] = useState<number>(10);
  const [dotColor, setDotColor] = useState<string>("red");
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent");
  const [maxSize, setMaxSize] = useState<number>(300);

  useEffect(() => {
    if(canvasBufferRef.current) {
      loadImage(frida, canvasBufferRef.current, maxSize);
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
      <Slider min={1} max={20} value={dotSize} onChange={(value) => setDotSize(value)} label="Dot size" />
      <Slider min={1} max={20} value={dotResolution} onChange={(value) => setDotResolution(value)} label="Dot resolution" />
      <Slider min={1} max={1920} value={maxSize} onChange={(value) => setMaxSize(value)} label="Max size" />
      <ColorInput value={dotColor} onChange={(value) => setDotColor(value)} label="Dot Color" />
      <ColorInput value={backgroundColor} onChange={(value) => setBackgroundColor(value)} label="Background Color" />
      <button onClick={() => halftone(canvasBufferRef.current, canvasRef.current, { angle, dotSize, dotResolution, dotColor, backgroundColor, maxSize } )}>Generate</button>
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
