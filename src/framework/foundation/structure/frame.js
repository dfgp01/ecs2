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
 * 一张图中的一个区域，纹理帧或精灵帧，单例，和引擎有关
 * 精灵帧用于标出一张纹理图的指定取材区域，以及相对的显示位置
 */
class SpriteFrame {
    constructor(name = "", rect = null, bitmap = null, x = 0, y = 0) {
        this.name = name;
        this.rect = rect;
        this.bitmap = bitmap;
        this.bitmapX = x;
        this.bitmapY = y;
    }
}

function CreateSpriteFrame(name = "", bitmap = null, x = 0, y = 0, width = 0, height = 0){
    let rect = NewRect(width, height);
    let f = new SpriteFrame(name, rect, bitmap, x, y);
    return f;
}

/**
 * spriteFrame开始绘制的坐标，左上角开始，与pos无关
 * @param {*} spriteFrame 
 */
function GetSpriteFrameStartX(spriteFrame = null){
    return spriteFrame.bitmapX;
}
function GetSpriteFrameStartY(spriteFrame = null){
    return spriteFrame.bitmapY;
}

function GetSpriteFrameRect(spriteFrame = null){
    return spriteFrame.rect;
}

function GetSpriteFrameWidth(spriteFrame = null){
    return GetRectWidth(spriteFrame.rect);
}

function GetSpriteFrameHalfWidth(spriteFrame = null){
    return GetRectHalfWidth(spriteFrame.rect);
}

function GetSpriteFrameHeight(spriteFrame = null){
    return GetRectHeight(spriteFrame.rect);
}

function GetSpriteFrameHalfHeight(spriteFrame = null){
    return GetRectHalfHeight(spriteFrame.rect);
}

function GetSpriteFrameBitmapData(spriteFrame = null){
    return spriteFrame.bitmap.data;
}

export{
    CreateBitmap, CreateSpriteFrame, 
    GetSpriteFrameStartX, GetSpriteFrameStartY, GetSpriteFrameRect,
    GetSpriteFrameWidth, GetSpriteFrameHalfWidth, GetSpriteFrameHeight, GetSpriteFrameHalfHeight,
    GetSpriteFrameBitmapData
}