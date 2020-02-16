
/**
 * 一张图中的一个区域，纹理帧或精灵帧，单例，和引擎有关
 * 精灵帧用于标出一张纹理图的指定取材区域，以及相对的显示位置
 */
class SpriteFrame {
    constructor(name = "", texture = null) {
        this.name = name;
        this.texture = texture;
    }
}


/**
 * 找不到帧时的默认空帧，可以是一张红叉图片，
 * TODO 引入默认资源机制
 */
var _spriteFrameMap = new Map();
function getSpriteFrameByName(name = ""){
    let f = _spriteFrameMap.get(name);
    return f ? f : _spriteFrameMap.get("defalut");
}

function CreateSpriteFrame(name = "", bitmapData = null, x = 0, y = 0, width = 0, height = 0){
    if(_spriteFrameMap.get(name)){
        console.err("frame: %s is exists.", name);
        return null;
    }
    let f = new SpriteFrame(name, bitmapData, new TextureArea(x, y, width, height));
    _spriteFrameMap.set(name, f);
    return f;
}

function GetSpriteFrameWidth(spriteFrame = null){
    return spriteFrame.textureArea.width;
}
function GetSpriteFrameHeight(spriteFrame = null){
    return spriteFrame.textureArea.height;
}

export{getSpriteFrameByName, CreateSpriteFrame, GetSpriteFrameWidth, GetSpriteFrameHeight}