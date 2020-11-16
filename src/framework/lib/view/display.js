import { DrawFrame } from "../../director/utils/render";
import { AddToCollection, CollectionIterator, GetCollectionData, RemoveFromCollection } from "../../foundation/component/collection";
import { System, UnitComponent } from "../../foundation/component/ecs";
import { SYSTEM_PRIORITY_FRAME_UPDATE } from "../../foundation/const";
import { NewPos, NewPosWithVec, NewVec } from "../../foundation/structure/geometric";
import { NewLinkList } from "../collection/linklist";
import { GetGameUnitPosByClz } from "../unit/utils";
import { GetRenderComponent } from "./render";


const DEFAULT_LAYER = 1;

/**
 * 显示图层
 *  order越低，越先渲染，后渲染的会遮住前面渲染的
 */
class Layer {
    constructor(order = 0){
        this.id = order;        //collection use
        this.order = order;
        //this.displayers = NewBinaryTree();
        this.displayers = NewLinkList();
    }
}

var layerList = NewLinkList();

function GetLayerOrCreate(order = 0){
    order = order ? order : DEFAULT_LAYER;
    let layer = GetCollectionData(layerList, order);
    if(!layer){
        layer = new Layer(order);
        AddToCollection(layerList, layer);
    }
    return layer;
}

function AddToLayer(displayer = null, layerNo = 0){
    let layer = GetLayerOrCreate(layerNo);
    AddToCollection(layer.displayers, displayer, displayer.order);
}

function RemoveFromLayer(displayer = null, layerNo = 0){
    let layer = GetLayerOrCreate(layerNo);
    RemoveFromCollection(layer.displayers, displayer.id);
}


/**
 * 显示元件
 *  和entity关系不大，一个entity可以拥有大于一个DisplayTuple
 *  需要设计机制避免滥用问题
 */
class Displayer extends UnitComponent {
    constructor(entityId = 0, spriteFrame = null, offset = null, renderCom = null, order = 0, layerNo = 0){
        super(entityId);
        this.spriteFrame = spriteFrame;
        this.offset = offset;
        this.renderCom = renderCom;
        this.order = order;         //todo order, layerNo丢弃，在外部传入
        this.layerNo = layerNo;
        this.isoPos = NewPos();
    }
}

function NewDisplayer(entityId = 0, spriteFrame = null, offset = null, order = 0, layerNo = 0){
    offset = offset ? offset : NewVec();
    let renderCom = GetRenderComponent(entityId);
    return new Displayer(entityId, spriteFrame, offset, renderCom, order, layerNo);
}


/**
 * 渲染系统，逻辑步骤：
 * 1.   清除画布
 * 2.   重定位摄像机
 * 3.   计算单位显示矩形是否在摄像机矩形内
 * 4.   转换为画布坐标
 * 5.   画出图像
 */
class FrameUpdateSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_FRAME_UPDATE)
    }
    onUpdate(dt = 0){
        CollectionIterator(layerList, layer => {
            CollectionIterator(layer.displayers, displayer => {
                let center = NewPosWithVec(
                    GetGameUnitPosByClz(displayer), displayer.offset);
                DrawFrame(center, displayer.spriteFrame);
            });
        });
    }
}

var sys = null;
function GetFrameUpdateSystem(){
    if(!sys){
        sys = new FrameUpdateSystem();
    }
    return sys;
}

export {
    GetLayerOrCreate, AddToLayer, RemoveFromLayer,
    NewDisplayer, GetFrameUpdateSystem
}