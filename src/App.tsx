import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import frida from '/frida.jpg';
import Slider from "./components/Slider";
import ColorInput from "./components/ColorInput";
import './App.css';
import { halftone, loadImage, halftoneDuatone, fromRGBToCMYK } from "./utils";

function App() {
  const imageRef = useRef<HTMLCanvasElement>(null);
  const canvasBufferRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imageProcessingMode, setImageProcessingMode] = useState<string>("Duatone");
  const [angle, setAngle] = useState<number>(0);
  const [dotSize, setDotSize] = useState<number>(5);
  const [dotResolution, setDotResolution] = useState<number>(3);
  const [dotColorOne, setDotColorOne] = useState<string>("#FF0000");
  const [dotColorTwo, setDotColorTwo] = useState<string>("#0000FF");
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent");
  const [maxSize, setMaxSize] = useState<number>(500);
  const [cyanAngle, setCyanAngle] = useState<number>(15);
  const [yellowAngle, setYellowAngle] = useState<number>(2);
  const [magentaAngle, setMagentaAngle] = useState<number>(75);
  const [keyAngle, setKeyAngle] = useState<number>(45);

  useEffect(() => {
    if(canvasBufferRef.current) {
      loadImage(frida, canvasBufferRef.current, maxSize);
    }
  }, [canvasBufferRef, maxSize]);

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
      <div
        role="tablist"
        className="tabs tabs-bordered"
      >
        {
          ["Duatone", "CMYK"].map(mode =>
            <a
              role="tab"
              className={`tab ${mode === imageProcessingMode ? "tab-active" : "tab"}`}
              onClick={(e) => setImageProcessingMode(mode)}
            >
              {mode}
            </a>
          )
        }
      </div>
      <div className="Options">
        <Slider min={1} max={20} value={dotSize} onChange={(value) => setDotSize(value)} label="Dot size" />
        <Slider min={1} max={20} value={dotResolution} onChange={(value) => setDotResolution(value)} label="Dot resolution" />
        <Slider min={1} max={1920} value={maxSize} onChange={(value) => setMaxSize(value)} label="Max size" />

        {
          imageProcessingMode === "Duatone" ?
          <>
            <Slider min={0} max={180} value={angle} onChange={(value) => setAngle(value)} label="Angle" />
            <ColorInput value={dotColorOne} onChange={(value) => setDotColorOne(value)} label="Dot Color 1" />
            <ColorInput value={dotColorTwo} onChange={(value) => setDotColorTwo(value)} label="Dot Color 2" />
            <ColorInput value={backgroundColor} onChange={(value) => setBackgroundColor(value)} label="Background Color" />
          </>
          :
          <>
            <Slider min={0} max={90} value={cyanAngle} onChange={(value) => setCyanAngle(value)} label="Cyan Angle" />
            <Slider min={0} max={90} value={yellowAngle} onChange={(value) => setYellowAngle(value)} label="Yellow Angle" />
            <Slider min={0} max={90} value={magentaAngle} onChange={(value) => setMagentaAngle(value)} label="Magenta Angle" />
            <Slider min={0} max={90} value={keyAngle} onChange={(value) => setKeyAngle(value)} label="Key Angle" />
          </>
        }
        { imageProcessingMode === "Duatone" ?
          <button onClick={() => halftoneDuatone(canvasBufferRef.current, canvasRef.current, { angle, dotSize, dotResolution, backgroundColor, maxSize, colorLayer1: dotColorOne, colorLayer2: dotColorTwo } )}>Generate Duatone</button>
          :
          <button onClick={() => fromRGBToCMYK(canvasBufferRef.current, canvasRef.current)}>Generate CMYK</button>
        }
      </div>
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
