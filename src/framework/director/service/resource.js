/**
 * 全局单例资源
 */


 /**
  * 精灵帧
  */
var _spriteFrameMap = new Map();
function getSpriteFrameByName(name = ""){
    _spriteFrameMap.get(name);
}
function setSpriteFrameByName(name = "", spriteFrame = null){
    _spriteFrameMap.set(name, spriteFrame);
}


/**
 * 自定义数据
 */
var data = new Map();
function getDataByName(name = ""){
    return data.get(name);
}

function setDataByName(name = "", data = null){
    data.set(name, data);
}


/**
 * 摄像机
 */
var defaultCamera = null;
function setDefaultCamera(camera = null){
    defaultCamera = camera;
}
function getDefaultCamera(){
    return defaultCamera;
}

var cameras = [];
function addCamera(camera = null){
    cameras.push(camera);
}
function getCameras(){
    return cameras;
}


/**
 * 外部引擎
 */
var currEngine = null;
function setEngine(engineObj = null){
    currEngine = engineObj;
}
function getEngine(){
    return currEngine;
}

/**
 * 当前场景
 */
var currScene = null;
function setScene(scene = null){
    currScene = scene;
}
function getScene(){
    return currScene;
}

export {
    getSpriteFrameByName, setSpriteFrameByName,
    getDataByName, setDataByName,
    setDefaultCamera, getDefaultCamera, addCamera, getCameras,
    setEngine, getEngine,
    setScene, getScene
}