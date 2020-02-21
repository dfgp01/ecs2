import { GetEngine } from "../component/engine";
import { GetCamera } from "../service/res";
import { GetRect } from "../../foundation/geometric/rect";


function Clear(){
    GetEngine().clear();
}

 /**
  * 获取精灵帧
  * TODO 可能会改成id形式
  */
function GetSpriteFrame(name = ""){
    return getSpriteFrameByName(name);
}

/**
 * TODO 可能会改成spriteFrameId参数
 */
function DrawFrame(spriteFrame = null, pos = null){
    let ng = GetEngine();
    getCameras().forEach(camera => {
        ng.drawFrame(
            spriteFrame,
            camera.toCameraPos(pos));
    });
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

export{Clear, GetSpriteFrame, DrawFrame, DrawRect, DrawLine, DrawCircle}