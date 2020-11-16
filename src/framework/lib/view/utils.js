import { AddToCollection, RemoveFromCollection } from "../../foundation/component/collection";
import { GetDebugDisplayerList, NewCircleDisplayer, NewLineDisplayer, NewRectDisplayer, NewTextDisplayer } from "./debug";
import { AddToLayer, GetLayerOrCreate, NewDisplayer, RemoveFromLayer } from "./display";

/**
 * 获取图层，若没有就自动添加
 * @param {*} layerNo 
 */
function GetLayer(layerNo = 0){
    return GetLayerOrCreate(layerNo);
}

/**
 * 加入渲染队列
 * order = 自己所在图层内的顺序
 * layerNo = 图层顺序，数值从低到高顺序渲染
 * todo order不需要是displayer的属性
 */
function AddNewDisplayer(entityId = 0, spriteFrame = null, offset = null, order = 0, layerNo = 0) {
    let ds = NewDisplayer(entityId, spriteFrame, offset, order, layerNo);
    AddDisplayer(ds, layerNo);
    return ds;
}

function AddDisplayer(displayer = null, layerNo = 0) {
    AddToLayer(displayer, displayer.order, layerNo);
}

function RemoveDisplayer(displayer = null, layerNo = 0) {
    RemoveFromLayer(displayer, layerNo);
}



/**
 * #####    测试渲染
 */


function AddRectDebugDisplayer(entityId = 0, style = 0, rect = null, offset = null){
    let ds = NewRectDisplayer(entityId, style, rect, offset);
    AddDebugDisplayer(ds);
    return ds;
}

function AddLineDebugDisplayer(entityId = 0, style = 0, offsetEnd = null, offset = null){
    let ds = NewLineDisplayer(entityId, style, offsetEnd, offset);
    AddDebugDisplayer(ds);
    return ds;
}

function AddTextDebugDisplayer(entityId = 0, style = 0, content = null, offset = null){
    let ds = NewTextDisplayer(entityId, style, content, offset);
    AddDebugDisplayer(ds);
    return ds;
}

function AddCircleDebugDisplayer(entityId = 0, style = 0, radius = 0, offset = null){
    let ds = NewCircleDisplayer(entityId, style, radius, offset);
    AddDebugDisplayer(ds);
    return ds;
}

function AddDebugDisplayer(debugDs = null){
    AddToCollection(GetDebugDisplayerList(), debugDs);
}

function RemoveDebugDisplayer(id = 0){
    RemoveFromCollection(GetDebugDisplayerList(), id);
}

export {
    GetLayer, 
    AddNewDisplayer, AddDisplayer, RemoveDisplayer, 
    AddRectDebugDisplayer, AddLineDebugDisplayer, AddTextDebugDisplayer, AddCircleDebugDisplayer,
    AddDebugDisplayer, RemoveDebugDisplayer
}