import { AddToLayer, RemoveFromLayer, GetLayer } from "./component/layer";
import { NewDisplayer } from "./component/render";


/**
 * 加入渲染队列
 * layerOrder = 图层顺序，数值从低到高顺序渲染
 * order = 自己所在图层内的顺序
 * TODO 需要判断重复性，如一个entityId多次用了同样的sprite，相互覆盖，造成浪费
 */
function AddDisplayer(spriteFrame = null, entityId = 0, layerOrder = 0, order = 0, offset = null) {
    let ds = NewDisplayer(entityId, spriteFrame, offset, order, layerOrder);
    AddToLayer(ds);
    return ds;
}

function RemoveDisplayer(displayer = null) {
    RemoveFromLayer(displayer);
}

export {
    AddDisplayer, RemoveDisplayer
}