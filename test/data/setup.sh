wget https://github.com/EOxServer/autotest/raw/f8d9f4bde6686abbda09c711d4bf5239f5378aa9/autotest/data/meris/mosaic_MER_FRS_1P_RGB_reduced/mosaic_ENVISAT-MER_FRS_1PNPDE20060816_090929_000001972050_00222_23322_0058_RGB_reduced.tif -O rgb.tiff
rgb2pct.py rgb.tiff rgb_paletted.tiff

gdalinfo rgb_paletted.tiff -json > rgb_paletted.json
