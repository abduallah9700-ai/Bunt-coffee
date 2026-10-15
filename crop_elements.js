ObjC.import('AppKit');

function cropImage(srcPath, dstPath, x, y, width, height) {
    var image = $.NSImage.alloc.initWithContentsOfFile(srcPath);
    if (!image) {
        throw new Error("Could not load image: " + srcPath);
    }
    
    var imageRep = image.representations.objectAtIndex(0);
    var totalHeight = imageRep.pixelsHigh;
    var cocoaY = totalHeight - (y + height);
    
    var croppedRect = $.NSMakeRect(x, cocoaY, width, height);
    var targetImage = $.NSImage.alloc.initWithSize($.NSMakeSize(width, height));
    targetImage.lockFocus;
    image.drawInRectFromRectOperationFraction(
        $.NSMakeRect(0, 0, width, height),
        croppedRect,
        $.NSCompositeCopy,
        1.0
    );
    targetImage.unlockFocus;
    
    var tiffData = targetImage.TIFFRepresentation;
    var bitmap = $.NSBitmapImageRep.imageRepsWithData(tiffData).objectAtIndex(0);
    var jpegData = bitmap.representationUsingTypeProperties($.NSJPEGFileType, $({}));
    jpegData.writeToFileAtomically(dstPath, true);
    console.log("Saved: " + dstPath + " (" + width + "x" + height + ")");
}

var full = "/Users/qeys/Bunt Coffee/images/design-full.jpg";

// Clean hero crop (y=72 avoids the navbar logo curve)
cropImage(full, "/Users/qeys/Bunt Coffee/images/hero-banner-exact.jpg", 0, 72, 959, 305);

// Hero right side (cup, saucer, beans, plant)
cropImage(full, "/Users/qeys/Bunt Coffee/images/hero-cup-full.jpg", 400, 72, 559, 305);

// Menu leaf left decoration
cropImage(full, "/Users/qeys/Bunt Coffee/images/menu-leaf-left.png", 0, 380, 140, 150);

// Menu leaf right decoration
cropImage(full, "/Users/qeys/Bunt Coffee/images/menu-leaf-right.png", 860, 380, 99, 160);

// About parchment background texture slice
cropImage(full, "/Users/qeys/Bunt Coffee/images/about-texture.jpg", 10, 740, 200, 200);

// Full right side of About Us (Cup, saucer, beans, leaves, script quote)
cropImage(full, "/Users/qeys/Bunt Coffee/images/about-composition.jpg", 480, 735, 479, 289);
