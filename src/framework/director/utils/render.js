import { GetEngine } from "../component/engine";
import { GetCamera } from "../service/res";
import { GetRect } from "../../foundation/geometric/rect";

/**
 * 清除画布
 */
function Clear(){
    GetEngine().clear();
}

/**
 * 先不考虑是否在摄像机内了
 * x, y 是世界坐标
 * @param {*} displayObject
 */
function Draw(displayObject = null, x = 0, y = 0){
    //TODO 这个很java
    DrawInCamera(GetCamera(), GetEngine(), displayObject, x, y);
}

 /**
  * 获取精灵帧
  * TODO 
  *     可能会改成id形式
  *     引入默认资源机制，找不到帧时的默认空帧，可以是一张红叉图片，
  */
function GetSpriteFrame(name = ""){
    let f = getSpriteFrameByName(name);
    return f ? f : getSpriteFrameByName("defalut");
}


/**
 * TODO 可能会改成spriteFrameId参数
 */
function DrawFrame(spriteFrame = null, pos = null){
    GetEngine().drawFrame(
        spriteFrame,
        GetCamera().toCameraPos(pos)
    );
}

function DrawRect(rectPosTuple = null){
    GetEngine().drawRect(
        GetRect(rectPosTuple),
        GetCamera().toCameraPos(
            GetRectPosStart(rectPosTuple)));
}

function DrawLine(line = null){
    GetEngine().drawLine(
        line,
        GetCamera().toCameraPos(
            GetLinePosStart(line)));
}

function DrawCircle(circle = null){
    GetEngine().drawCircle(
        circle,
        GetCamera().toCameraPos(
            GetCirclePosStart(circle)));
}

export{Clear, Draw, GetSpriteFrame, DrawFrame, DrawRect, DrawLine, DrawCircle}