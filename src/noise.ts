import { getContext, positionToDataIndex } from "./utils";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function addNoise(canvas: HTMLCanvasElement, percentage: number) : void {
    const context = getContext(canvas);
    const data = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = positionToDataIndex(x, y, canvas.width);
          const [r, g, b, a] = [
            data[index + 0],
            data[index + 1],
            data[index + 2],
            data[index + 3],
          ];
          const random = randomNumber(0, percentage);



          data[index + 0] = Math.min(255, random * r);
          data[index + 1] = Math.min(255, random * g);
          data[index + 2] = Math.min(255, random * b);
          data[index + 3] = Math.min(255, random * a);
        }
    }

    context.putImageData(data, 0, 0);
}