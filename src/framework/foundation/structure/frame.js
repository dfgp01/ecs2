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


/**
 * 一张图中的一个区域，纹理帧或精灵帧，单例，和引擎有关
 * 精灵帧用于标出一张纹理图的指定取材区域，以及相对的显示位置
 */
class SpriteFrame {
    constructor(name = "", bitmap = null, seg = null) {
        this.name = name;
        this.bitmap = bitmap;
        this.seg = seg;
    }
}

function CreateSpriteFrame(name = "", bitmap = null, x = 0, y = 0, width = 0, height = 0){
    let f = new SpriteFrame(name, bitmap,
        new Seg(x, y, width, height));
    return f;
}

function GetSpriteFrameWidth(spriteFrame = null){
    return spriteFrame.seg.width;
}
function GetSpriteFrameHeight(spriteFrame = null){
    return spriteFrame.seg.height;
}

export{CreateBitmap, CreateSpriteFrame, GetSpriteFrameWidth, GetSpriteFrameHeight}