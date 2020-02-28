/**
 * 全局单例资源
 */


var _spriteFrameMap = new Map();
function getSpriteFrameByName(name = ""){
    _spriteFrameMap.get(name);
}
function setSpriteFrameByName(name = "", spriteFrame = null){
    _spriteFrameMap.set(name, f);
}