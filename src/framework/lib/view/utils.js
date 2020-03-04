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

/**
 * 待定
 * options : [
 *  {
 *      order : 0,
 *      type : 1 格式参考tilemap一节
 *  }
 * ]
 */
function CreateLayersWithData(options = null, onCreatedCallback = null){
    options = options && options >= 0 ? options : [{}];
    options.forEach(layerOptions => {
        let layer = GetLayer(layerOptions['order']);
        if(onCreatedCallback){
            let displayTupleList = onCreatedCallback();
        }
    });
}

export {
    GetRenderComponent,
    AddDisplayer, RemoveDisplayer,
    CreateLayersWithData
}