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
 * 用于表示bitmap的一个区域，并非rect
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
    constructor(name = "", seg = null, bitmap = null) {
        this.name = name;
        this.seg = seg;
        this.bitmap = bitmap;
    }
}

function CreateSpriteFrame(name = "", bitmap = null, x = 0, y = 0, width = 0, height = 0){
    let seg = new Seg(x, y, width, height);
    let f = new SpriteFrame(name, seg, bitmap);
    return f;
}

/**
 * spriteFrame开始绘制的坐标，左上角开始，与pos无关
 * @param {*} spriteFrame 
 */
function GetSpriteFrameStartX(spriteFrame = null){
    return spriteFrame.seg.x;
}
function GetSpriteFrameStartY(spriteFrame = null){
    return spriteFrame.seg.y;
}

function GetSpriteFrameWidth(spriteFrame = null){
    return spriteFrame.seg.width;
}

function GetSpriteFrameHalfWidth(spriteFrame = null){
    return spriteFrame.seg.width * 0.5;
}

function GetSpriteFrameHeight(spriteFrame = null){
    return spriteFrame.seg.height;
}

function GetSpriteFrameHalfHeight(spriteFrame = null){
    return spriteFrame.seg.height * 0.5;
}

function GetSpriteFrameBitmapData(spriteFrame = null){
    return spriteFrame.bitmap.data;
}

export{
    CreateBitmap, CreateSpriteFrame, 
    GetSpriteFrameStartX, GetSpriteFrameStartY,
    GetSpriteFrameWidth, GetSpriteFrameHalfWidth, GetSpriteFrameHeight, GetSpriteFrameHalfHeight,
    GetSpriteFrameBitmapData
}