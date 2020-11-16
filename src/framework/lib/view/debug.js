import { DrawLine, DrawRect, DrawText } from "../../director/utils/render";
import { CollectionIterator } from "../../foundation/component/collection";
import { UnitComponent, System } from "../../foundation/component/ecs";
import { SYSTEM_PRIORITY_DEBUG_RENDER } from "../../foundation/const";
import { NewVec } from "../../foundation/structure/geometric";
import { NewLinkList } from "../collection/linklist";
import { GetGameUnitByClz, NewPosWithUnitOffset } from "../unit/utils";

const TYPE_RECT = 1;
const TYPE_CIRCLE = 2;
const TYPE_TEXT = 3;
const TYPE_LINE = 4;

class DebugDisplayer extends UnitComponent {
    constructor(entityId = 0, style = 0, offset = null, type = 0){
        super(entityId);
        this.style = style;
        this.offset = offset;
        this.type = type;
    }
}

class RectDisplayer extends DebugDisplayer {
    constructor(entityId = 0, style = 0, offset = null, rect = null){
        super(entityId, style, offset, TYPE_RECT);
        this.rect = rect;
    }
}

class LineDisplayer extends DebugDisplayer {
    constructor(entityId = 0, style = 0, offset = null, offsetEnd = null){
        super(entityId, style, offset, TYPE_LINE);
        this.offsetEnd = offsetEnd;
    }
}

class TextDisplayer extends DebugDisplayer {
    constructor(entityId = 0, style = 0, offset = null, content = null){
        super(entityId, style, offset, TYPE_TEXT);
        this.content = content;
    }
}

class CircleDisplayer extends DebugDisplayer {
    constructor(entityId = 0, style = 0, offset = null, radius = null){
        super(entityId, style, offset, TYPE_CIRCLE);
        this.radius = radius;
    }
}

function NewRectDisplayer(entityId = 0, style = 0, rect = null, offset = null){
    if(!rect){
        //log here
        return null;
    }
    offset = offset ? offset : NewVec();
    return new RectDisplayer(entityId, style, offset, rect);
}

function NewLineDisplayer(entityId = 0, style = 0, offsetEnd = null, offset = null){
    if(!offsetEnd){
        //log here
        return null;
    }
    offset = offset ? offset : NewVec();
    return new LineDisplayer(entityId, style, offset, offsetEnd);
}

function NewTextDisplayer(entityId = 0, style = 0, content = "", offset = null){
    offset = offset ? offset : NewVec();
    return new TextDisplayer(entityId, style, offset, content);
}

function NewCircleDisplayer(entityId = 0, style = 0, radius = 0, offset = null){
    if(!radius){
        //log here
        return null;
    }
    offset = offset ? offset : NewVec();
    return new CircleDisplayer(entityId, style, offset, radius);
}

var debugDisplayerList = NewLinkList();
function GetDebugDisplayerList(){
    return debugDisplayerList;
}

class RenderDebugSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_DEBUG_RENDER);
    }
    onUpdate(dt = 0){
        CollectionIterator(debugDisplayerList, dis => {
            let centerPos = NewPosWithUnitOffset(
                GetGameUnitByClz(dis), dis.offset);
            drawDebug(dis, centerPos);
        });
    }
}

function drawDebug(displayer = null, centerPos = null){
    switch(displayer.type){
        case TYPE_RECT:
            DrawRect(centerPos, displayer.rect, displayer.style);
        break;
        case TYPE_LINE:
            let posEnd = NewPosWithUnitOffset(GetGameUnitByClz(displayer), displayer.offsetEnd);
            DrawLine(centerPos, posEnd, displayer.style);
        break;
        case TYPE_TEXT:
            DrawText(centerPos, displayer.content, displayer.style);
        break;
    }
}

var sys = null;
function GetRenderDebugSystem(){
    if(!sys){
        sys = new RenderDebugSystem();
    }
    return sys;
}

export {
    NewRectDisplayer, NewLineDisplayer, NewTextDisplayer, NewCircleDisplayer,
    GetDebugDisplayerList, GetRenderDebugSystem
}