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

/**
 * 初始数据
 */
var data = new Map();
function getDataByName(name = ""){
    return data.get(name);
}

function setDataByName(name = "", data = null){
    data.set(name, data);
}