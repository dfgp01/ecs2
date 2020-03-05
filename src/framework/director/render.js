import { GetEngine, GetDefaultCamera } from "./resource";
import { EngineDrawFrame, EngineDrawRect } from "../lib/engine/base";

/**
 * 清除画布
 */
function Clear(){
    EngineClear(GetEngine());
}

/**
 * TODO 可能会改成spriteFrameId参数
 */
function DrawFrame(pos = null, spriteFrame = null){
    DrawFrameInCamera(
        GetDefaultCamera(), pos, spriteFrame);
}

function DrawFrameInCamera(camera = null, pos = null, spriteFrame = null){
    let cPos = ToCameraPosStart(camera, pos);
    EngineDrawFrame(GetEngine(),
        cPos.x, cPos.y, spriteFrame);
}

function DrawRect(pos = null, rect = null){
    DrawRectInCamera(
        GetDefaultCamera(), pos, rect);
}

function DrawRectInCamera(camera = null, pos = null, rect = null){
    let cPos = ToCameraPosStart(camera, pos);
    EngineDrawRect(GetEngine(), cPos, rect);
}

/**
 * ###################################### 下面的还没改，运行起来先
*/

function DrawLine(pos = null, vec = null){
    DrawLineInCamera(
        GetDefaultCamera(), pos, vec);
}

function DrawLineInCamera(camera = null, pos = null, vec = null){
    let cPos = ToCameraPos(camera, pos);
    let cPos2 = ToCameraPos(camera, NewPos(pos.x + vec.x, pos.y + vec.y));
    EngineDrawLine(getEngine(),
        cPos.x, cPos.y, cPos2.x, cPos2.y);
}

function DrawCircle(circle = null){
    GetEngine().drawCircle(
        circle,
        GetCamera().toCameraPos(
            GetCirclePosStart(circle)));
}

export{
    Clear, DrawFrame, DrawFrameInCamera,
    DrawRect, DrawRectInCamera
}