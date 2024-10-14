//usage
// const lighterColor = newShade(`#000000`, 50); // Returns "#323232"
// const lighterColor = newShade(`#ffffff`, -50); // Returns "#cdcdcd"

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
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
}

function createMaskPoints(canvasSource: HTMLCanvasElement, pointRadius: number) : void {
    const { width, height } = canvasSource;

    const pointDiameterAndPadding = 2*(pointRadius) + 2*(pointRadius); // diameter + the padding
    const originX = width % pointDiameterAndPadding;
    const originY = height % pointDiameterAndPadding;

    const context = canvasSource.getContext("2d");

    for(let x=0; x < width; x += pointDiameterAndPadding) {
        for(let y=0; y < height; y += pointDiameterAndPadding) {
            context.beginPath();
            context.arc(originX + x , originY + y ,pointRadius, 0, 2*Math.PI);
            context.fillStyle = "red";
            context.fill();
        }
    }
}