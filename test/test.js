const { readFileSync } = require('fs');
const test = require('ava');
const { fromArrayBuffer } = require('geotiff');
const { getPalette } = require('../index.js');

test('reading RGB palette', async t => {
    const data = readFileSync('test/data/rgb_paletted.tiff');
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    const geotiff = await fromArrayBuffer(arrayBuffer);
    const image = await geotiff.getImage();
    const palette = await getPalette(image, { debug: false });
    console.log("palette:", palette);
    const metadata = JSON.parse(readFileSync('test/data/rgb_paletted.json'));
    const colorTable = metadata.bands[0].colorTable.entries;
    t.deepEqual(palette, colorTable);
});

// test('test file', async t => {
//     const data = readFileSync('test/data/test.tif');
//     const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
//     const geotiff = await fromArrayBuffer(arrayBuffer);
//     const image = await geotiff.getImage();
//     const palette = await getPalette(image, { debug: false });
//     const metadata = JSON.parse(readFileSync('test/data/test.json'));
//     const colorTable = metadata.bands[0].colorTable.entries;
//     t.deepEqual(palette, colorTable);
// });
