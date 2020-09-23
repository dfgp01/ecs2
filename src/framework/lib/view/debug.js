import { DrawRect } from "../../director/utils/render";
import { GetDisplayCenterPos, GetDisplayIsoPos } from "./component/render";
import { GetGameUnitByClz } from "../../director/utils/boot";
import { NewLink } from "../list/linklist";
import { ListIterator } from "../../foundation/container/list";
import { UnitComponent, System } from "../../foundation/component/ecs";
import { SYSTEM_PRIORITY_DEBUG_RENDER } from "../../foundation/const";

function drawIsoDebug(displayTuple = null){
    DrawRect(
        GetDisplayIsoPos(displayTuple),
        GetRect(displayTuple.rectPosRel)
    );
}

function drawDebug(displayTuple = null){
    DrawRect(
        GetDisplayCenterPos(displayTuple),
        GetRect(displayTuple.rectPosRel)
    );
}



class DebugDisplayer extends UnitComponent {
    constructor(entityId = 0, rectOR = null, style = 0){
        super(entityId);
        this.rectOR = rectOR;
        this.style = style;
    }
}
function NewDebugDisplayer(entityId = 0, rectOR = null, style = 0){
    return new DebugDisplayer(entityId, rectOR, style);
}

function GetDebugDisplayerRectOR(dis = null){
    return dis.rectOR;
}

function GetDebugDisplayerStyle(dis = null){
    return dis.style;
}

var debugDisplayerList = NewLink();
function GetDebugDisplayerList(){
    return debugDisplayerList;
}

class RenderDebugSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_DEBUG_RENDER);
    }
    onUpdate(dt = 0){
        ListIterator(debugDisplayerList, dis => {
            DrawRect(
                    GetGameUnitByClz(dis), dis.rectOR, dis.style);
        });
    }
}

var renderDebugSys = null;
function GetRenderDebugSystem(){
    if(!renderDebugSys){
        renderDebugSys = new RenderDebugSystem();
    }
    return renderDebugSys;
}

export {
    drawIsoDebug, drawDebug,
    NewDebugDisplayer, GetDebugDisplayerRectOR, GetDebugDisplayerStyle,
    GetDebugDisplayerList, GetRenderDebugSystem
}