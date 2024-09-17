import { Vector2 } from "./utils";

// re-maps a value from its original range [minA, maxA] to the range [minB, maxB]
function map(value: number, minA: number, maxA: number, minB: number, maxB: number) : number {
  return ((value - minA) / (maxA - minA)) * (maxB - minB) + minB;
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

export function reloadCanvasPreview(image: HTMLImageElement, canvas: HTMLCanvasElement, maxSize: number) {
  const [width, height] = resizeWithRatio(image.width, image.height, maxSize)
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, width, height);
}


export function loadImage(imagepath: string, canvas: HTMLCanvasElement, maxSize: number) {
  const context = canvas.getContext("2d");
  const image = new Image();
  image.onload = () => {
    const [width, height] = resizeWithRatio(image.width, image.height, maxSize)

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);
    console.log("image loaded");
  };
  image.src = imagepath;
}

export function getContext(canvasSource: HTMLCanvasElement) : CanvasRenderingContext2D {
   const context = canvasSource.getContext('2d');
    if(!context) {
      throw new Error("Cannot find context");
    }
    return context;
}

export function positionToDataIndex(x: number, y: number, width: number) : number {
  // data is arranged as [R, G, B, A, R, G, B, A, ...]
  return (y * width + x) * 4;
}
