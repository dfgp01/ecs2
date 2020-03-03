/**
 * 显示图层
 *  order越低，越先渲染，后渲染的会遮住前面渲染的
 */
class Layer {
    constructor(order = 0){
        this.id = order;
        this.order = order;
        this.list = NewLink();
    }
}

var layerList = NewLink();
function addLayer(order = 0){
    let layer = new Layer(order);
    InsertData(layerList, layer);
    return layer;
}

function getLayer(order = 0){
    let layer = GetData(layerList, order);
    if(!layer){
        layer = addLayer(order);
    }
    return layer;
}

function addToLayer(displayTuple = null){
    let layer = getLayer(displayTuple.layerOrder);
    InsertData(layer.list, displayTuple, displayTuple.order);
}

function removeFromLayer(displayTuple = null){
    let layer = getLayer(displayTuple.order);
    if(!layer){
        return;
    }
    ShiftData(layer.list, displayTuple.id);
}