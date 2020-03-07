import { GetEngine, GetDefaultCamera } from "./service/resource";
import { EngineDrawFrame, EngineDrawRect, EngineClear, EngineDrawLine, EngineDrawCircle } from "../lib/engine/base";
import { ToCameraStartPos } from "../lib/camera/utils";

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
    let cPos = ToCameraStartPos(camera, pos);
    EngineDrawFrame(GetEngine(), cPos, spriteFrame);
}

function DrawRect(pos = null, rect = null){
    DrawRectInCamera(
        GetDefaultCamera(), pos, rect);
}

function DrawRectInCamera(camera = null, pos = null, rect = null){
    let cPos = ToCameraStartPos(camera, pos);
    EngineDrawRect(GetEngine(), cPos, rect);
}

function DrawLine(posStart = null, posEnd = null){
    DrawLineInCamera(
        GetDefaultCamera(), posStart, posEnd);
}

function DrawLineInCamera(camera = null, posStart = null, posEnd = null){
    let cPos1 = ToCameraStartPos(camera, posStart);
    let cPos2 = ToCameraStartPos(camera, posEnd);
    EngineDrawLine(GetEngine(), cPos1, cPos2);
}

function DrawCircle(pos = null, radius = 0){
    DrawCircleInCamera(
        GetDefaultCamera(), pos, radius);
}

function DrawCircleInCamera(camera = null, pos = null, radius = 0){
    let cPos = ToCameraStartPos(camera, pos);
    EngineDrawCircle(GetEngine(), cPos, radius);
}

export{
    Clear, DrawFrame, DrawFrameInCamera,
    DrawRect, DrawRectInCamera, 
    DrawLine, DrawLineInCamera,
    DrawCircle, DrawCircleInCamera
}