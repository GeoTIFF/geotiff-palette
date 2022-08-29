import { readFileSync } from 'fs';
import test from 'flug';
import { fromArrayBuffer } from 'geotiff';
import { getPalette } from '../index.js';

test('reading RGB palette', async ({ eq }) => {
    const data = readFileSync('test/data/rgb_paletted.tiff');
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    const geotiff = await fromArrayBuffer(arrayBuffer);
    const image = await geotiff.getImage();
    const palette = await getPalette(image, { debug: false });
    console.log("palette:", palette);
    const metadata = JSON.parse(readFileSync('test/data/rgb_paletted.json', { encoding: "utf-8" }));
    const colorTable = metadata.bands[0].colorTable.entries;
    eq(palette, colorTable);
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
