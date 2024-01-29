import { Vector2 } from "./utils";

// re-maps a value from its original range [minA, maxA] to the range [minB, maxB]
function map(value: number, minA: number, maxA: number, minB: number, maxB: number) : number {
  return ((value - minA) / (maxA - minA)) * (maxB - minB) + minB;
}

function positionToDataIndex(x: number, y: number, width: number) : number {
  // data is arranged as [R, G, B, A, R, G, B, A, ...]
  return (y * width + x) * 4;
}

function rotatePointAboutPosition([x, y]: Vector2, [rotX, rotY] : Vector2, angle: number) : Vector2 {
  return [
    (x - rotX) * Math.cos(angle) - (y - rotY) * Math.sin(angle) + rotX,
    (x - rotX) * Math.sin(angle) + (y - rotY) * Math.cos(angle) + rotY,
  ];
}

function computeBoundaries(width: number, height: number, angle: number): [Vector2, Vector2, Vector2, Vector2] {
  const tl = [0, 0];
  const tr = [width, 0];
  const br = [width, height];
  const bl = [0, height];
  // rotate the screen, then find the minimum and maximum of the values.
  return [tl, br, tr, bl].map(([x, y]) => {
    return rotatePointAboutPosition([x, y], [width / 2, height / 2], angle);
  });
}

function getContext(canvasSource: HTMLCanvasElement) : CanvasRenderingContext2D {
   const context = canvasSource.getContext('2d');
    if(!context) {
      throw new Error("Cannot find context");
    }
    return context;
}

function resizeWithRatio(width: number, height: number, maxSize: number) : [number, number] {
  if(width > maxSize) {
    const aspectRatio = height / width;
    const newWidth = Math.min(width, maxSize);

    return [newWidth, newWidth * aspectRatio];
  } else if(height > maxSize) {
    const aspectRatio = width / height;
    const newHeight = Math.min(height, maxSize);

    return [newHeight * aspectRatio, newHeight];
  } else {
    return [width, height];
  }
}

function duatone(canvasSource: HTMLCanvasElement) : [HTMLCanvasElement, HTMLCanvasElement] {
  const duotoneThreshold = 127;
  const canvasLayerOne = document.createElement('canvas');
  const canvasLayerTwo = document.createElement('canvas');

  canvasLayerOne.width = canvasSource.width;
  canvasLayerTwo.width = canvasSource.width;

  canvasLayerOne.height = canvasSource.height;
  canvasLayerTwo.height = canvasSource.height;

  const contextCanvasSource = getContext(canvasSource);
  const contextLayerOne = getContext(canvasLayerOne);
  const contextLayerTwo = getContext(canvasLayerTwo);

  const dataCanvasSource = contextCanvasSource.getImageData(
    0,
    0,
    canvasSource.width,
    canvasSource.height
  );

  const dataLayerOne = contextLayerOne.getImageData(
    0,
    0,
    canvasSource.width,
    canvasSource.height
  );

    const dataLayerTwo = contextLayerTwo.getImageData(
    0,
    0,
    canvasSource.width,
    canvasSource.height
  );

  for (let y = 0; y < canvasSource.height; y++) {
    for (let x = 0; x < canvasSource.width; x++) {
      const index = positionToDataIndex(x, y, canvasSource.width);
      const [r, g, b, a] = [
        dataCanvasSource.data[index + 0],
        dataCanvasSource.data[index + 1],
        dataCanvasSource.data[index + 2],
        dataCanvasSource.data[index + 3],
      ];
      const value = (r + g + b) / 3;
      if (value < duotoneThreshold) {
        const adjustedValue = map(value, 0, duotoneThreshold, 0, 255);
        dataLayerTwo.data[index + 0] = adjustedValue;
        dataLayerTwo.data[index + 1] = adjustedValue;
        dataLayerTwo.data[index + 2] = adjustedValue;
        dataLayerTwo.data[index + 3] = 255;
      }
      dataLayerOne.data[index + 0] = value;
      dataLayerOne.data[index + 1] = value;
      dataLayerOne.data[index + 2] = value;
      dataLayerOne.data[index + 3] = 255;
    }
  }
  contextLayerOne.putImageData(dataLayerOne, 0, 0);
  contextLayerTwo.putImageData(dataLayerTwo, 0, 0);

  return [canvasLayerOne, canvasLayerTwo];
}



interface HalftoneParams {
  dotSize: number;
  angle: number;
  dotResolution: number;
  backgroundColor: string;
  dotColor: string;
  clear: boolean;
}

interface HalftoneDuatoneParams extends HalftoneParams {
  colorLayer1: string;
  colorLayer2: string;
}

export function halftoneDuatone(canvasSource: HTMLCanvasElement,
  canvasTarget: HTMLCanvasElement, halftoneDuatoneParams: HalftoneDuatoneParams) {
  const [canvasLayerOne, canvasLayerTwo] = duatone(canvasSource);

  const { colorLayer1, colorLayer2, ...rest } = halftoneDuatoneParams;

  const width = canvasSource.width;
  const height = canvasSource.height;

  canvasTarget.width = width;
  canvasTarget.height = height;


  const contextTarget = getContext(canvasTarget);
  const contextTargetLayerOne = getContext(canvasLayerOne);
  const contextTargetLayerTwo = getContext(canvasLayerTwo);

  contextTarget.globalAlpha = 0.8;

  contextTarget.fillStyle = halftoneDuatoneParams.backgroundColor;
  contextTarget.fillRect(0, 0, canvasTarget.width, canvasTarget.height);

  halftone(contextTargetLayerOne, contextTarget, width, height, { ...rest, dotColor: colorLayer1 });
  halftone(contextTargetLayerTwo, contextTarget, width, height, { ...rest, dotColor: colorLayer2 });
}

function halftone(
  contextSource: CanvasRenderingContext2D,
  contextTarget: CanvasRenderingContext2D,
  width: number,
  height: number,
  { dotSize, angle, dotResolution, backgroundColor ="transparent", dotColor="red" } : HalftoneParams
) : void {

  const sourceImageData = contextSource.getImageData(0, 0, width, height);

  const angleInRadian = (angle * Math.PI) / 180;

  contextTarget.fillStyle = dotColor;



  const boundaries = computeBoundaries(width, height, angleInRadian);
  const minX = Math.min(...boundaries.map((point) => point[0])) | 0;
  const minY = Math.min(...boundaries.map((point) => point[1])) | 0;
  const maxY = Math.max(...boundaries.map((point) => point[1])) | 0;
  const maxX = Math.max(...boundaries.map((point) => point[0])) | 0;

  for (let y = minY; y < maxY; y += dotResolution) {
    for (let x = minX; x < maxX; x += dotResolution) {

      const [rotatedX, rotatedY] = rotatePointAboutPosition(
        [x, y],
        [width / 2, height / 2],
        -angleInRadian
      );

      if (
        rotatedX < 0 ||
        rotatedY < 0 ||
        rotatedX > width ||
        rotatedY > height
      ) {
        continue;
      }

      const index = positionToDataIndex(Math.floor(rotatedX), Math.floor(rotatedY), width);
      // extract the R, G, B from the source image.
      // because it's grayscale, only the red channel needs to be sampled.
      const value = sourceImageData.data[index];
      const alpha = sourceImageData.data[index + 3];
      if (alpha) {
        const circleRadius = map(value, 0, 255, dotSize / 2, 0);
        contextTarget.beginPath();
        contextTarget.arc(rotatedX, rotatedY, circleRadius, 0, Math.PI * 2);
        contextTarget.closePath();
        contextTarget.fill();
      }
    }
  }
}


export function loadImage(imagepath: string, canvas: HTMLCanvasElement, maxSize: number) {
  const context = canvas.getContext("2d");
  const image = new Image();
  image.onload = () => {
    const [width, height] = resizeWithRatio(image.width, image.height, maxSize)

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);
  };
  image.src = imagepath;
}