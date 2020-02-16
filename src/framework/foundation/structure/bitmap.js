/**
 * data就是图片文件
 * width, height可选，最好有
 */
class Bitmap {
    constructor(data = null, width = 0, height = 0) {
        this.data = data;
        this.width = width;
        this.height = height;
    }
}

function CreateBitmap(bitmapData = null, width = 0, height = 0){
    return new Bitmap(bitmapData, width, height);
}

/**
 * 暂定名
 */
class Seg {
    constructor(x = 0, y = 0, width = 0, height = 0){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Texture {
    constructor(bitmap = null, seg = null) {
        this.bitmap = bitmap;
        this.seg = seg;
    }
}

function CreateTexture(bitmap = null, x = 0, y = 0, width = 0, height = 0){
    let seg = new Seg(x, y, width, height);
    return new Texture(bitmap, seg);
}

export{CreateBitmap, CreateTexture}