const getPalette = (image, { debug = false } = { debug: false }) => {
    if (debug) console.log("starting getPalette with image", image);
    const { fileDirectory } = image;
    const {
        BitsPerSample,
        ColorMap,
        ImageLength,
        ImageWidth,
        PhotometricInterpretation,
        SampleFormat,
        SamplesPerPixel
    } = fileDirectory;

    if (!ColorMap) {
        throw new Error("[geotiff-palette]: the image does not contain a color map, so we can't make a palette.");
    }

    const count = Math.pow(2, BitsPerSample);
    if (debug) console.log("[geotiff-palette]: count:", count);

    const bandSize = ColorMap.length / 3;
    if (debug) console.log("[geotiff-palette]: bandSize:", bandSize);

    if (bandSize !== count) {
        throw new Error("[geotiff-palette]: can't handle situations where the color map has more or less values than the number of possible values in a raster");
    }

    const greenOffset = bandSize;
    const redOffset = greenOffset + bandSize;

    const result = [];
    for (let i = 0; i < count; i++) {
        // colorMap[mapIndex] / 65536 * 256 equals colorMap[mapIndex] / 256
        // because (1 / 2^16) * (2^8) equals 1 / 2^8
        result.push([
            Math.floor(ColorMap[i] / 256), // red
            Math.floor(ColorMap[greenOffset + i] / 256), // green
            Math.floor(ColorMap[redOffset + i] / 256), // blue
            255 // alpha value is always 255
        ]);
    }
    if (debug) console.log("[geotiff-palette]: result is ", result);
    return result;
}

module.exports = { getPalette };
