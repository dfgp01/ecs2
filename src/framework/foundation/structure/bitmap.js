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

function CreateSeg(x = 0, y = 0, width = 0, height = 0){
    return new Seg(x, y, width, height);
}

export{CreateBitmap, CreateSeg}