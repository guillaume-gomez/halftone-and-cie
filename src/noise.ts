import { getContext, positionToDataIndex } from "./utils";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function addNoise(canvasInput: HTMLCanvasElement, canvasOutput: HTMLCanvasElement, percentage: number) : void {
  const context = getContext(canvasInput);
  const image = context.getImageData(
    0,
    0,
    canvasInput.width,
    canvasInput.height
  );

  for (let y = 0; y < canvasInput.height; y++) {
        for (let x = 0; x < canvasInput.width; x++) {
          const index = positionToDataIndex(x, y, canvasInput.width);
          const [r, g, b, a] = [
            image.data[index + 0],
            image.data[index + 1],
            image.data[index + 2],
            image.data[index + 3],
          ];
          const random = randomNumber(0, percentage);

          image.data[index + 0] = Math.min(255, (1-random) * r);
          image.data[index + 1] = Math.min(255, (1-random) * g);
          image.data[index + 2] = Math.min(255, (1-random) * b);
          image.data[index + 3] = Math.min(255, (1-random) * a);
        }
    }

    canvasOutput.width = canvasInput.width;
    canvasOutput.height = canvasInput.height;
    const contextOuptut = getContext(canvasOutput);
    contextOuptut.putImageData(image, 0, 0);
}