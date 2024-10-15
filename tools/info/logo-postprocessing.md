1. convert U.png -fuzz 60% -transparent white logo_1563x.png (make white bar transparent)
1.5 (optional) manually remove sharp edges of white bar
2. convert logo_1563x.png -resize 500x500 -crop 500x400+0+50 +repage logo_500x400.png