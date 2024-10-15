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

function componentToHex(c: string) : string {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) : string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function createMaskPoints(canvasSource: HTMLCanvasElement, pointRadius: number) : void {
    console.log("myColor, ", newShade(`#ffffff`, -50))
    console.log("myColor, ", newShade(`#000000`, -50))
    const { width, height } = canvasSource;

    const pointDiameterAndPadding = 2*(pointRadius) + 2*(pointRadius); // diameter + the padding
    const originX = width % pointDiameterAndPadding;
    const originY = height % pointDiameterAndPadding;

    const context = getContext(canvasSource);

    const image = context.getImageData(
        0,
        0,
        width,
        height
      );

    for(let x = originX; x < width; x += pointDiameterAndPadding) {
        for(let y = originY; y < height; y += pointDiameterAndPadding) {
            const index = positionToDataIndex(x + pointRadius, y + pointRadius, width);
            const [r, g, b] = [
                image.data[index + 0],
                image.data[index + 1],
                image.data[index + 2],
            ];

            context.beginPath();
            context.arc(x ,y ,pointRadius, 0, 2 * Math.PI);
            const color = newShade(rgbToHex(r,g,b), -10);
            //console.log("myColor, ", color)
            context.fillStyle = color + "AA"; //"#00000010";
            context.fill();
        }
    }
}