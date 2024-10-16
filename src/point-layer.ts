import { positionToDataIndex, getContext } from "./utils"
//usage
// const lighterColor = newShade(`#000000`, 50); // Returns "#323232"
// const darkerColor = newShade(`#ffffff`, -50); // Returns "#cdcdcd"

function newShade(hexColor: string, magnitude: number) : string {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return rgbToHex(r, g, b);
    } else {
        return hexColor;
    }
}

function componentToHex(c: number) : string {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) : string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

interface maskPointParams {
    pointRadius: number;
    padding?: number;
    opacity?: string;
    shading?: number;
}

export function createMaskPoints(
    canvasSource: HTMLCanvasElement,
    canvasTarget: HTMLCanvasElement,
    {
        pointRadius,
        padding = 1,
        opacity = "AA",
        shading = -50
    }: maskPointParams
) : void {
    const { width, height } = canvasSource;

    const pointDiameterAndPadding = 2*(pointRadius) + 2*(padding); // diameter + the padding
    const originX = width % pointDiameterAndPadding;
    const originY = height % pointDiameterAndPadding;

    const context = getContext(canvasSource);

    const image = context.getImageData(
        0,
        0,
        width,
        height
      );

    canvasTarget.width = width;
    canvasTarget.height = height;
    const contextTarget = getContext(canvasTarget);
    contextTarget.putImageData(image, 0, 0);

    for(let x = originX; x < width; x += pointDiameterAndPadding) {
        for(let y = originY; y < height; y += pointDiameterAndPadding) {
            const index = positionToDataIndex(x + pointRadius, y + pointRadius, width);
            const [r, g, b] = [
                image.data[index + 0],
                image.data[index + 1],
                image.data[index + 2],
            ];

            contextTarget.beginPath();
            contextTarget.arc(x ,y ,pointRadius, 0, 2 * Math.PI);
            const color = newShade(rgbToHex(r,g,b), shading);
            contextTarget.fillStyle = color + opacity;
            contextTarget.fill();
        }
    }
}