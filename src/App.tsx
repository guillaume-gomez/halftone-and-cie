import { useState, useRef, useEffect } from 'react';
import Slider from "./components/Slider";
import ColorInput from "./components/ColorInput";
import InputFileWithPreview from "./components/InputFileWithPreview";
import Card from "./components/Card";
import SaveImageButton from "./components/SaveImageButton";
import ThreeJsRenderer from "./components/ThreeJsRenderer";
import Navbar from "./components/Navbar";
import { reloadCanvasPreview } from "./utils";
import { halftoneDuatone, fromRGBToCMYK } from "./halftone";
import { addNoise } from "./noise";

function App() {
  const canvasBufferRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();

  const [imageProcessingMode, setImageProcessingMode] = useState<string>("CMYK+Noise");
  const [angle, setAngle] = useState<number>(0);
  const [dotSize, setDotSize] = useState<number>(5);
  const [dotResolution, setDotResolution] = useState<number>(3);
  const [dotColorOne, setDotColorOne] = useState<string>("#FF0000");
  const [dotColorTwo, setDotColorTwo] = useState<string>("#0000FF");
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent");
  const [maxSize, setMaxSize] = useState<number>(1000);
  const [cyanAngle, setCyanAngle] = useState<number>(15);
  const [yellowAngle, setYellowAngle] = useState<number>(2);
  const [magentaAngle, setMagentaAngle] = useState<number>(75);
  const [keyAngle, setKeyAngle] = useState<number>(45);

  useEffect(() => {
    if(canvasBufferRef.current && image) {
      reloadCanvasPreview(image, canvasBufferRef.current, maxSize);
    }
  }, [canvasBufferRef, maxSize, image]);

  function generateButton() {
    if(!canvasBufferRef.current || !canvasRef.current) {
      return;
    }
    switch(imageProcessingMode) {
      case "Duatone":
      default:
        return halftoneDuatone(canvasBufferRef.current, canvasRef.current, {
          angle,
          dotSize,
          dotResolution,
          backgroundColor,
          colorLayer1: dotColorOne,
          colorLayer2: dotColorTwo
        });
      case "CMYK":
        return fromRGBToCMYK(canvasBufferRef.current, canvasRef.current, {
          dotSize,
          dotResolution,
          cyanAngle,
          magentaAngle,
          yellowAngle,
          keyAngle,
          backgroundColor
        });
      case "Noise":
        return addNoise(canvasBufferRef.current, canvasRef.current, 0.15);
      case "CMYK+Noise":
        return CMYKNoise();
    };
  }

  function CMYKNoise() {
    if(!canvasBufferRef.current || !canvasRef.current) {
      return;
    }
    fromRGBToCMYK(canvasBufferRef.current, canvasRef.current, {
        dotSize,
        dotResolution,
        cyanAngle,
        magentaAngle,
        yellowAngle,
        keyAngle,
        backgroundColor
    });
    addNoise(canvasRef.current, canvasRef.current, 0.20);
  }

  function uploadImage(newImage: HTMLImageElement) {
    setImage(newImage);
  }

  return (
    <div className="bg-base-300 flex flex-col gap-4">
      <Navbar />
      <div className="flex md:flex-row flex-col gap-4">
        <Card title="Settings" className="border-primary">
          <InputFileWithPreview onChange={uploadImage} value={image} />
            <div
              role="tablist"
              className="tabs tabs-bordered tabs-lg"
            >
              {
                ["CMYK+Noise", "Duatone", "CMYK", "Noise"].map(mode =>
                  <a
                    role="tab"
                    className={`tab ${mode === imageProcessingMode ? "tab-active" : "tab"}`}
                    onClick={() => {
                      if(mode === "Duatone") {
                        setBackgroundColor("#000000");
                      } else {
                        setBackgroundColor("#FFFFFF");
                      }
                      setImageProcessingMode(mode);
                    }}
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
                  <ColorInput value={backgroundColor} onChange={(value) => setBackgroundColor(value)} label="Background Color" />
                </>
              }
              </div>
              <button
                className="btn btn-primary w-full text-xl"
                onClick={generateButton}
              >
                Generate
              </button>
        </Card>
        <Card title="Result" className="bg-base-200 w-full border-secondary">
          <canvas ref={canvasBufferRef} style={{display: "none"}} />
          <ThreeJsRenderer />
          <canvas ref={canvasRef} style={{maxWidth: maxSize, maxHeight: maxSize}} />
          <div className="flex flex-row justify-end">
            <SaveImageButton
             label={"Save"}
             canvasRef={canvasRef}
             filename={"halftone-and-cie"}
             disabled={!canvasRef.current}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
