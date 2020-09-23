import { DrawFrame, Clear, DrawRect } from "../../director/utils/render";
import { System } from "../../foundation/component/ecs";
import { IteratorLayers } from "./component/layer";
import { GetDisplayIsoPos, GetDisplaySpriteFrame, GetDisplayCenterPos, UpdateIsoPos, IsDisplayISOmetrics } from "./component/render";
import { drawDebug, drawIsoDebug } from "./debug";
import { SYSTEM_PRIORITY_RENDER_UPDATE } from "../../foundation/const";

/**
 * 渲染系统，逻辑步骤：
 * 1.   清除画布
 * 2.   重定位摄像机
 * 3.   计算单位显示矩形是否在摄像机矩形内
 * 4.   转换为画布坐标
 * 5.   画出图像
 */
class RenderUpdateSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_RENDER_UPDATE)
    }
    onUpdate(dt = 0){
        Clear();
        LinkIterator(GetDisplayList(), displayTuple => {
            let pos = GetPos(displayTuple.entityId);
            UpdateRectPosByUnit(displayTuple.displayArea, pos.x, pos.y);
            DrawFrame(displayTuple.spriteFrame, displayTuple.pos);
        });
    }
}

class LayerRenderUpdateSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_RENDER_UPDATE)
    }
    onUpdate(dt = 0){
        Clear();
        IteratorLayers(displayTuple => {
            if(IsDisplayISOmetrics(displayTuple)){
                drawIso(displayTuple);
            }else{
                draw(displayTuple);
            }
        });
    }
}

function drawIso(displayTuple = null){
    UpdateIsoPos(displayTuple);
    DrawFrame(
        GetDisplayIsoPos(displayTuple),
        GetDisplaySpriteFrame(displayTuple));
    drawIsoDebug(displayTuple);
}

function draw(displayTuple = null){
    DrawFrame(
        GetDisplayCenterPos(displayTuple),
        GetDisplaySpriteFrame(displayTuple));
    drawDebug(displayTuple);
}

var renderSys = null;
function GetRenderUpdateSystem(){
    if(!renderSys){
        //renderSys = new LayerRenderUpdateSystem();
        renderSys = new Tmp();
    }
    return renderSys;
}

/**
 * todo 临时
 */
class Tmp extends System {
    constructor(){
        super(SYSTEM_PRIORITY_RENDER_UPDATE)
    }
    onUpdate(dt = 0){
        Clear();
    }
}

export {
    GetRenderUpdateSystem
}