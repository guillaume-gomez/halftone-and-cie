import { useState, useRef, useEffect } from 'react';
import Slider from "./components/Slider";
import ColorInput from "./components/ColorInput";
import InputFileWithPreview from "./components/InputFileWithPreview";
import Card from "./components/Card";
import SaveImageButton from "./components/SaveImageButton";
import CustomSettingsCard from "./components/CustomSettingsCard";
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
        return halftoneDuatone(canvasBufferRef.current, canvasRef.current, { angle, dotSize, dotResolution, backgroundColor, colorLayer1: dotColorOne, colorLayer2: dotColorTwo } );
      case "CMYK":
        return fromRGBToCMYK(canvasBufferRef.current, canvasRef.current, { dotSize, dotResolution, cyanAngle, magentaAngle, yellowAngle, keyAngle});
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
    fromRGBToCMYK(canvasBufferRef.current, canvasRef.current, { dotSize, dotResolution, cyanAngle, magentaAngle, yellowAngle, keyAngle});
          addNoise(canvasRef.current, canvasRef.current, 0.20);
  }

  function uploadImage(newImage: HTMLImageElement) {
    setImage(newImage);
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex lg:flex-row lg:p-0 p-4 flex-col">
        <Card title="Settings" className="bg-primary">
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
                    onClick={() => setImageProcessingMode(mode)}
                  >
                    {mode}
                  </a>
                )
              }
            </div>
            <CustomSettingsCard>
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
              </div>
              </CustomSettingsCard>

              <button
                className="btn-custom btn btn-secondary w-full text-xl custom-button"
                onClick={generateButton}
              >
                Generate
              </button>
        </Card>
        <Card title="Result" className="bg-secondary w-full">
          <canvas ref={canvasBufferRef} style={{display: "none"}} />
          <canvas ref={canvasRef} />
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
