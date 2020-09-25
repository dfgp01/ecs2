import { AddToLayer, RemoveFromLayer } from "./component/layer";
import { NewDisplayer } from "./component/render";
import { AddToList, PushToList, RemoveFromList } from "../../foundation/container/list";
import { NewDebugDisplayer, GetDebugDisplayerList } from "./debug";


/**
 * 加入渲染队列
 * layerOrder = 图层顺序，数值从低到高顺序渲染
 * order = 自己所在图层内的顺序
 * TODO 需要判断重复性，如一个entityId多次用了同样的sprite，相互覆盖，造成浪费
 */
function AddDisplayer(spriteFrame = null, entityId = 0, layerOrder = 1, order = 0, offset = null) {
    let ds = NewDisplayer(entityId, spriteFrame, offset, order, layerOrder);
    AddToLayer(ds);
    return ds;
}

function RemoveDisplayer(displayer = null) {
    RemoveFromLayer(displayer);
}


function AddDebugDisplayer(entityId = 0, rectOR = null, style = 0){
    let c = NewDebugDisplayer(entityId, rectOR, style);
    AddToList(GetDebugDisplayerList(), c);
    return c;
}

function RemoveDebugDisplayer(id = 0){
    RemoveFromList(GetDebugDisplayerList(), id);
}

export {
    AddDisplayer, RemoveDisplayer, 
    AddDebugDisplayer, RemoveDebugDisplayer
}