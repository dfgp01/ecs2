import { GetEngine, GetDefaultCamera } from "../service/resource";
import { ToCameraStartPos } from "../../lib/camera/utils";
import { EngineDrawRect, EngineClear, EngineDrawCircle } from "../../foundation/component/engine";
import { NewRectORCenter } from "../../foundation/utils/rect";
import { GetRectOffsetRelationRect } from "../../foundation/unit/rect";

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

function DrawRect(unit = null, rectOR = null, style = 0){
    DrawRectInCamera(
        GetDefaultCamera(), unit, rectOR, style);
}

function DrawRectInCamera(camera = null, unit = null, rectOR = null, style = 0){
    let cPos = ToCameraStartPos(camera,
        NewRectORCenter(unit, rectOR));
    EngineDrawRect(GetEngine(), cPos, GetRectOffsetRelationRect(rectOR), style);
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