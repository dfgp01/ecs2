import { GetEngine, GetDefaultCamera } from "../service/resource";
import { ToCameraStartPos } from "../../lib/camera/utils";
import { EngineDrawRect, EngineClear, EngineDrawCircle, EngineDrawFrame, EngineDrawLine, EngineDrawText } from "../../foundation/component/engine";

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

function DrawRect(rectCenterPos = null, rect = null, style = 0){
    DrawRectInCamera(
        GetDefaultCamera(), rectCenterPos, rect, style);
}

function DrawRectInCamera(camera = null, rectCenterPos = null, rect = null, style = 0){
    let cPos = ToCameraStartPos(camera, rectCenterPos);
    EngineDrawRect(GetEngine(), cPos, rect, style);
}

function DrawLine(posStart = null, posEnd = null, style = 0){
    DrawLineInCamera(
        GetDefaultCamera(), posStart, posEnd, style);
}

function DrawLineInCamera(camera = null, posStart = null, posEnd = null, style = 0){
    let cPos1 = ToCameraStartPos(camera, posStart);
    let cPos2 = ToCameraStartPos(camera, posEnd);
    EngineDrawLine(GetEngine(), cPos1, cPos2, style);
}

function DrawText(textCenterPos = null, content = "", style = 0){
    DrawTextInCamera(
        GetDefaultCamera(), textCenterPos, content, style);
}

function DrawTextInCamera(camera = null, textCenterPos = null, content = "", style = 0){
    let cPos = ToCameraStartPos(camera, textCenterPos);
    EngineDrawText(GetEngine(), cPos, content, style);
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
    DrawText, DrawTextInCamera,
    DrawCircle, DrawCircleInCamera
}