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
class SpriteFrame extends Rectangle {
    constructor(width = 0, height = 0, name = "", bitmap = null, x = 0, y = 0) {
        super(width, height);
        this.name = name;
        this.bitmap = bitmap;
        this.x = x;
        this.y = y;
    }
}

function CreateSpriteFrame(name = "", bitmap = null, x = 0, y = 0, width = 0, height = 0){
    let f = new SpriteFrame(width, height, name, bitmap, x, y);
    return f;
}

/**
 * spriteFrame开始绘制的坐标，左上角开始，与pos无关
 * @param {*} spriteFrame 
 */
function GetSpriteFrameX(spriteFrame = null){
    return spriteFrame.x;
}
function GetSpriteFrameY(spriteFrame = null){
    return spriteFrame.y;
}

export{
    CreateBitmap, CreateSpriteFrame, 
    GetSpriteFrameX, GetSpriteFrameY
}