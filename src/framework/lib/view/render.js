import { AddToCollection, CollectionIterator, GetCollectionData } from "../../foundation/component/collection";
import { NewPos, UpdatePos } from "../../foundation/structure/geometric";
import { NewLinkList } from "../collection/linklist";
import { GetGameUnitPosByClz } from "../unit/utils";

const { System, Component } = require("../../foundation/component/ecs");
const { SYSTEM_PRIORITY_RENDER_UPDATE } = require("../../foundation/const");

/**
 * 渲染属性，包含一些显示参数
 */
class RenderComponent extends Component {
	constructor(entityId = 0, isometrics = false, angle = 0, scale = 1) {
        super(entityId);
        this.isometrics = isometrics;
        this.angle = angle;
        this.scale = scale;
        this.displayPos = NewPos();
	}
}

var renderComs = NewLinkList();
function createRenderComponent(entityId = 0, options = null) {
    //默认值
    options = options ? options : {};
    let com = new RenderComponent(entityId, options.isometrics, options.angle, options.scale);
    AddToCollection(renderComs, com);
    return com;
}

/**
 * 查找渲染显示组件，暂时这样搞
 * options : {
 *      isometric : false,
 *      angle : 180,
 *      scale : 0.5
 * }
 */
function GetRenderComponent(entityId = 0, options = null) {
    let com = GetCollectionData(renderComs, entityId);
    return com ? com : createRenderComponent(entityId, options);
}

/**
 * TODO 可能是只更新iso坐标
 */
class IsoUpdateSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_RENDER_UPDATE)
    }
    onUpdate(dt = 0){
        CollectionIterator(renderComs, render => {
            if(render.isometrics){
                let pos = GetGameUnitPosByClz(render);
                UpdatePos(render.displayPos,
                    pos.x - pos.y, (pos.x + pos.y) * 0.5);    
            }
        });
    }
}

var sys = new IsoUpdateSystem();
function GetIsoUpdateSystem(){
    return sys;
}

function UpdateIsoPosWithOffset(offset = null){
    UpdatePos(render.isoPos,
        (pos.x - pos.y) + offset.x,
        (pos.x + pos.y) * 0.5 + offset.y);
}

export{
    GetRenderComponent, GetIsoUpdateSystem
}