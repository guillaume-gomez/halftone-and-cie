// re-maps a value from its original range [minA, maxA] to the range [minB, maxB]
function map(value: number, minA: number, maxA: number, minB: number, maxB: number) : number {
  return ((value - minA) / (maxA - minA)) * (maxB - minB) + minB;
}


function positionToDataIndex(x: number, y: number, width: number) : number {
  width = width || WIDTH;
  // data is arranged as [R, G, B, A, R, G, B, A, ...]
  return (y * width + x) * 4;
}

function getContext(canvasSource: HTMLCanvasElement) {
   const context = canvasSource.getContext('2d');
    if(!context) {
      console.error("Cannot find context");
      return;
    }
    return context;
}

export function halftone(canvasSource: HTMLCanvasElement, canvasTarget: HTMLCanvasElement, pixelsPerDot: number) : void {
  const width = canvasSource.width;
  const height = canvasSource.height;

  const contextSource = getContext(canvasSource);
  const contextTarget = getContext(canvasTarget);

  const sourceImageData = contextSource.getImageData(0, 0, width, height);

  for (let y = 0; y < height; y += pixelsPerDot) {
    for (let x = 0; x < width; x += pixelsPerDot) {
      const index = positionToDataIndex(x, y);
      // extract the R, G, B from the source image.
      // because it's grayscale, only the red channel needs to be sampled.
      const value = sourceImageData.data[index];
      const circleRadius = map(value, 0, 255, pixelsPerDot / 2, 0);
      contextTarget.beginPath();
      contextTarget.arc(x, y, circleRadius, 0, Math.PI * 2);
      contextTarget.closePath();
      contextTarget.fill();
    }
  }
}


export function loadImage(imagepath: string, canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  const image = new Image();
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);
    console.log('loaded')
  };
  image.src = imagepath;
}