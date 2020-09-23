import { Component, GameObject } from "../../../foundation/component/ecs";
import { NewLink } from "../../list/linklist";
import { AddToList, GetListData } from "../../../foundation/container/list";
import { NewPos, UpdatePos, NewRect } from "../../../foundation/structure/geometric";
import { GetSpriteFrameWidth, GetSpriteFrameHeight } from "../../../foundation/structure/frame";
import { GetPosComponent } from "../../pos/component";

/**
 * 显示组件，包含一些显示参数
 */
class RenderComponent extends Component {
	constructor(entityId = 0, isometrics = false, angle = 0, scale = 1) {
        super(entityId);
        this.isometrics = isometrics;
        this.angle = angle;
        this.scale = scale;
	}
}

var renderComs = NewLink();
function createRenderComponent(entityId = 0, options = null) {
    //默认值
    options = options ? options : {};
    let com = new RenderComponent(entityId, options.isometrics, options.angle, options.scale);
    AddToList(renderComs, com);
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
    let com = GetListData(renderComs, entityId);
    return com ? com : createRenderComponent(entityId, options);
}

/**
 * 显示元件
 *  和entity关系不大，一个entity可以拥有大于一个DisplayTuple
 *  需要设计机制避免滥用问题
 */
class DisplayTuple extends GameObject {
    constructor(spriteFrame = null, renderCom = null, rectPosRel = null, order = 0, layerOrder = 0){
        super();
        this.spriteFrame = spriteFrame;
        this.renderCom = renderCom;
        this.rectPosRel = rectPosRel;
        this.order = order;
        this.layerOrder = layerOrder;
        this.isoPos = NewPos();
    }
}

function NewDisplayer(entityId = 0, spriteFrame = null, offset = null, order = 0, layerOrder = 1){
    let renderCom = GetRenderComponent(entityId);
    let posCom = GetPosComponent(entityId);
    let rp = NewRectPosRelation(posCom.pos, offset, NewRect(
            GetSpriteFrameWidth(spriteFrame), GetSpriteFrameHeight(spriteFrame)));
    let ds = new DisplayTuple(spriteFrame, renderCom, rp, order, layerOrder);
    return ds;
}

function IsDisplayISOmetrics(displayer = null){
    return displayer.renderCom.isometrics;
}

function GetDisplaySpriteFrame(displayer = null){
    return displayer.spriteFrame;
}

function GetDisplayCenterPos(displayer = null){
    return GetRealPos(displayer.rectPosRel);
}

function GetDisplayIsoPos(displayer = null){
    return displayer.isoPos;
}

function UpdateIsoPos(displayer = null){
    let pos = GetPos(displayer.rectPosRel);
    let offset = GetOffset(displayer.rectPosRel);
    UpdatePos(displayer.isoPos,
        (pos.x - pos.y) + offset.x,
        (pos.x + pos.y) * 0.5 + offset.y);
}

export {
    GetRenderComponent, NewDisplayer, 
    IsDisplayISOmetrics, GetDisplaySpriteFrame, GetDisplayCenterPos,
    GetDisplayIsoPos, UpdateIsoPos
}