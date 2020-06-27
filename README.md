# geotiff-palette
Get the Palette (aka Color Map) for a GeoTIFF

# install
```bash
npm install geotiff-palette
```

# usage
## downloaded GeoTIFF
```
const { readFileSync } = require('fs');
const { fromArrayBuffer } = require('geotiff');
const { getPalette } = require('geotiff-palette');

const data = readFileSync('image.tif');
const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
const geotiff = await fromArrayBuffer(arrayBuffer);
const image = await geotiff.getImage();
const palette = await getPalette(image);
console.log(palette);
```
palette will look something like this:
```
[
  [ 112, 108, 96, 255 ],  [ 112, 104, 80, 255 ],  [ 104, 104, 104, 255 ],
  [ 96, 88, 52, 255 ],    [ 104, 104, 112, 255 ], [ 128, 120, 108, 255 ],
  [ 160, 160, 160, 255 ], [ 152, 152, 144, 255 ], [ 104, 96, 72, 255 ],
  [ 96, 80, 44, 255 ],    [ 40, 48, 56, 255 ],    [ 152, 144, 144, 255 ],
  [ 32, 48, 56, 255 ],    [ 120, 120, 96, 255 ],  [ 112, 120, 104, 255 ],
  ... 256 total items
]
```

# support
Post an issue at https://github.com/GeoTIFF/geotiff-palette or email the package author at daniel.j.dufour@gmail.com
