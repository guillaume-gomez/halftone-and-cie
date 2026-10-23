import { useState, useRef, useEffect } from 'react';
import Slider from "./components/Slider";
import ColorInput from "./components/ColorInput";
import InputFileWithPreview from "./components/InputFileWithPreview";
import Card from "./components/Card";
import SaveImageButton from "./components/SaveImageButton";
import ThreeJsRenderer from "./components/ThreeJsRenderer";
import CustomSettingsCard from "./components/CustomSettingsCard";
import Toggle from "./components/Toggle";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { reloadCanvasPreview } from "./utils";
import { halftoneDuatone, fromRGBToCMYK } from "./halftone";
import { addNoise } from "./noise";
import { createMaskPoints } from "./point-layer";
function App() {
  const canvasBufferRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();
  const [texture, setTexture] = useState<string>();

  const [imageProcessingMode, setImageProcessingMode] = useState<string>("CMYK+Noise");
  const [angle, setAngle] = useState<number>(0);
  const [dotSize, setDotSize] = useState<number>(5);
  const [dotResolution, setDotResolution] = useState<number>(3);
  const [dotColorOne, setDotColorOne] = useState<string>("#4AC3E8");
  const [dotColorTwo, setDotColorTwo] = useState<string>("#E75CA2");
  const [backgroundColor, setBackgroundColor] = useState<string>("transparent");
  const [maxSize, setMaxSize] = useState<number>(1000);
  const [cyanAngle, setCyanAngle] = useState<number>(15);
  const [yellowAngle, setYellowAngle] = useState<number>(2);
  const [magentaAngle, setMagentaAngle] = useState<number>(75);
  const [keyAngle, setKeyAngle] = useState<number>(45);

  const [display2DView, setDisplay2DView] = useState<boolean>(false);
  const [widthTexture, setWidthTexture] = useState<number>(100);
  const [heightTexture, setHeightTexture] = useState<number>(100);

  useEffect(() => {
    if(canvasBufferRef.current && image) {
      reloadCanvasPreview(image, canvasBufferRef.current, maxSize);
    }
  }, [canvasBufferRef, maxSize, image]);

  useEffect(() => {
    if(imageProcessingMode === "CMYK+Noise") {
      setBackgroundColor("#FFFFFF");
    } else {
      setBackgroundColor("transparent");
    }
  }, [imageProcessingMode]);

  function generateButton() {
    if(!canvasBufferRef.current || !canvasRef.current) {
      return;
    }

    switch(imageProcessingMode) {
      case "Duatone":
      default:
        halftoneDuatone(canvasBufferRef.current, canvasRef.current, {
          angle,
          dotSize,
          dotResolution,
          backgroundColor,
          colorLayer1: dotColorOne,
          colorLayer2: dotColorTwo
        });
        break;
      case "CMYK":
        fromRGBToCMYK(canvasBufferRef.current, canvasRef.current, {
          dotSize,
          dotResolution,
          cyanAngle,
          magentaAngle,
          yellowAngle,
          keyAngle,
          backgroundColor
        });
        break;
      case "Noise":
        addNoise(
          canvasBufferRef.current,
          canvasRef.current,
          0.15
        );
        break;
      case "CMYK+Noise":
        CMYKNoise();
        break;
      case "maskPoints":
        createMaskPoints(
          canvasBufferRef.current,
          canvasRef.current,
          {
            pointRadius: 1,
            padding: 2
          }
        );
        break;
    };
    const base64Image = canvasRef.current.toDataURL();
    setWidthTexture(canvasRef.current.width);
    setHeightTexture(canvasRef.current.height);
    setTexture(base64Image);
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

  function renderGenerateButton() {
    const button = (
      <button
        className="custom-shadow btn btn-secondary w-full text-xl"
        onClick={generateButton}
        disabled={!image}
      >
        Generate
      </button>
    );

    if(!image) {
      return (<div className="tooltip tooltip-warning" data-tip="Upload an image first !">{button}</div>)
    }

    return button;
  }

  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <div className="flex md:flex-row flex-col gap-4">
        <Card title="Settings" className="bg-primary basis-1/4">
          <div className="py-2">
            <InputFileWithPreview onChange={uploadImage} value={image} />
          </div>
          <select
            className="select"
            onChange={(e)=> setImageProcessingMode(e.target.value)}
            value={imageProcessingMode}
          >
            <option disabled>Select the filter</option>
            {
              ["CMYK+Noise", "Duatone", "CMYK", "Noise", "maskPoints"].map(mode =>
                <option
                  key={mode}
                  value={mode}
                >
                  {mode}
                </option>
              )
            }
            </select>
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
                  <ColorInput value={backgroundColor} onChange={(value) => setBackgroundColor(value)} label="Background Color" />
                </>
              }
              </div>
              </CustomSettingsCard>

              <Toggle value={display2DView} label="2D view" toggle={() => setDisplay2DView(!display2DView)}/>

              {renderGenerateButton()}
        </Card>
        <Card title="Result" className="bg-secondary w-full">
          { 
            !display2DView && <ThreeJsRenderer
              texture={texture}
              widthTexture={widthTexture}
              heightTexture={heightTexture}
            />
          }
          <canvas ref={canvasBufferRef} style={{display: "none"}} />
          <canvas ref={canvasRef} style={{maxWidth: maxSize, maxHeight: maxSize, display: display2DView ? "" : "none"}} />
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
      <Footer />
    </div>
  )
}

export default App
