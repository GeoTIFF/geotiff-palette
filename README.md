# geotiff-palette
Get the Palette (aka Color Map) for a GeoTIFF

# install
```bash
npm install geotiff-palette
```

# usage
## downloaded GeoTIFF
```
import { readFileSync } from 'fs';
import { fromArrayBuffer } from 'geotiff';
import { getPalette } from 'geotiff-palette';

const data = readFileSync('image.tif');
const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
const geotiff = await fromArrayBuffer(arrayBuffer);
const image = await geotiff.getImage();
const palette = await getPalette(image);
console.log(palette);
```
palette contains an array of [R, G, B, A] values and looks like this:
```javascript
[
  [ 112, 108, 96, 255 ],  [ 112, 104, 80, 255 ],  [ 104, 104, 104, 255 ],
  [ 96, 88, 52, 255 ],    [ 104, 104, 112, 255 ], [ 128, 120, 108, 255 ],
  [ 160, 160, 160, 255 ], [ 152, 152, 144, 255 ], [ 104, 96, 72, 255 ],
  [ 96, 80, 44, 255 ],    [ 40, 48, 56, 255 ],    [ 152, 144, 144, 255 ],
  [ 32, 48, 56, 255 ],    [ 120, 120, 96, 255 ],  [ 112, 120, 104, 255 ],
  // ... 256 total items
]
```

## getting a color
The index number in the palette corresponds to a raster value. 
For example, if you have an 8-bit single-band GeoTIFF and you want to get the color for the first pixel with value 130
```javascript
const [ band ] = await image.readRasters();
const value = band[0]; // first pixel in the band, which is usually in the top-left of the image
// value is 130
const color = palette[value];
// color is [ 112, 108, 96, 255 ], which is the same as `rgba(112, 108, 96, 1)`
```

# support
Post an issue at https://github.com/GeoTIFF/geotiff-palette or email the package author at daniel.j.dufour@gmail.com
