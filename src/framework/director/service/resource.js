import { NewRect, GetRectWidth, GetRectHeight } from "../../foundation/structure/geometric";

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
function GetSpriteFrameByName(name = "", defaultValue = true){
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
 * 摄像机
 */
var defaultCamera = null;
function SetDefaultCamera(camera = null){
    defaultCamera = camera;
}
function GetDefaultCamera(){
    return defaultCamera;
}

/**
 * 屏幕，暂时用rect
 */
var defaultScreen = null;
function SetScreen(width = 0, height = 0){
    defaultScreen = NewRect(width, height);
}
function GetScreenWidth(){
    return GetRectWidth(defaultScreen);
}
function GetScreenHeight(){
    return GetRectHeight(defaultScreen);
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

export {
    GetSpriteFrameByName, SetSpriteFrame,
    SetDefaultCamera, GetDefaultCamera,
    SetScreen, GetScreenWidth, GetScreenHeight,
    SetEngine, GetEngine, SetScene, GetScene
}