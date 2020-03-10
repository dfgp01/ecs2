import { NewLink } from "../../lib/list/linklist";

/**
 * 全局单例资源
 */


 /**
 * 获取精灵帧
 * TODO 
 * 可能会改成id形式
 * 引入默认资源机制，找不到帧时的默认空帧，可以是一张红叉图片，
 */
var spriteFrameMap = new Map();
function GetSpriteFrame(name = "", defaultValue = true){
    let f = spriteFrameMap.get(name);
    return f ? f : 
        defaultValue ? spriteFrameMap.get("defalut") : null;
}
function SetSpriteFrame(name = "", spriteFrame = null, check = true){
    let f = spriteFrameMap.get(name);
    if(f && check){
        console.error("frame: %s exists.", name);
        return;
    }
    spriteFrameMap.set(name, spriteFrame);
}

/**
 * 自定义数据定义
 */
var defMap = new Map();
function GetDef(key = ""){
    return defMap.get(key);
}
function SetDef(key = 0, data = null){
    defMap.set(key, data);
}

/**
 * 自定义数据
 */
var dataMap = new Map();
function GetData(name = ""){
    return dataMap.get(name);
}
function SetData(name = "", data = null, check = true){
    let d = dataMap.get(name);
    if(d && check){
        console.error("data: %s exists.", name);
        return;
    }
    dataMap.set(name, data);
}


/**
 * 摄像机
 */
var defaultCamera = null;
function SetDefaultCamera(camera = null){
    defaultCamera = camera;
}
function GetDefaultCamera(){
    return defaultCamera;
}

var cameras = [];
function AddCamera(camera = null){
    cameras.push(camera);
}
function GetCameras(){
    return cameras;
}


/**
 * 外部引擎
 */
var currEngine = null;
function SetEngine(engineObj = null){
    currEngine = engineObj;
}
function GetEngine(){
    return currEngine;
}

/**
 * 当前场景
 */
var currScene = null;
function SetScene(scene = null){
    currScene = scene;
}
function GetScene(){
    return currScene;
}

/**
 * 监听器
 */
var listenerMap = new Map();
function getListenerList(eventType = 0){
    let lisList = listenerMap.get(eventType);
    if(!lisList){
        lisList = NewLink();
        listenerMap.set(eventType, lisList);
    }
    return lisList;
}

export {
    GetSpriteFrame, SetSpriteFrame,
    GetDef, SetDef, GetData, SetData, 
    SetDefaultCamera, GetDefaultCamera, AddCamera, GetCameras,
    SetEngine, GetEngine, SetScene, GetScene,
    getListenerList
}