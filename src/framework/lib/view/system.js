import { DrawFrame, Clear } from "../../director/render";
import { System } from "@/framework/foundation/component/ecs";
import { GetCameras } from "@/framework/director/resource";
import { ListIterator } from "@/framework/foundation/container/list";
import { GetLayerList, GetLayerDataList, IteratorLayers } from "./component/layer";
import { GetDisplayIsoPos, GetDisplaySpriteFrame, GetDisplayCenterPos } from "./component/render";

/**
 * 渲染系统，逻辑步骤：
 * 1.   清除画布
 * 2.   重定位摄像机
 * 3.   计算单位显示矩形是否在摄像机矩形内
 * 4.   转换为画布坐标
 * 5.   画出图像
 */
class RenderUpdateSystem extends System {
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
    onUpdate(dt = 0){
        Clear();
        IteratorLayers(displayTuple => {
            if(IsDisplayISOmetrics(displayTuple)){
                drawIso(camera, displayTuple);
            }else{
                draw(camera, displayTuple);
            }
        });
    }
}

function drawIso(displayTuple = null){
    UpdateIsoPos(displayTuple);
    DrawFrame(
        GetDisplayIsoPos(displayTuple),
        GetDisplaySpriteFrame(displayTuple));
}

function draw(displayTuple = null){
    DrawFrame(
        GetDisplayCenterPos(displayTuple),
        GetDisplaySpriteFrame(displayTuple));
}

function GetRenderUpdateSystem(){
    if(!renderSys){
        renderSys = new LayerRenderUpdateSystem();
    }
    return renderSys;
}

export {GetRenderUpdateSystem}