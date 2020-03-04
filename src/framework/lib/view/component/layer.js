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
    InsertToList(layerList, layer);
    return layer;
}

function GetLayer(order = 0){
    let layer = GetListData(layerList, order);
    if(!layer){
        layer = addLayer(order);
    }
    return layer;
}

function GetLayerList(){
    return layerList;
}

function GetLayerDataList(layer = null){
    return layer.list;
}

function AddToLayer(displayTuple = null){
    let layer = GetLayer(displayTuple.layerOrder);
    InsertToList(layer.list, displayTuple, displayTuple.order);
}

function RemoveFromLayer(displayTuple = null){
    let layer = GetLayer(displayTuple.order);
    RemoveFromList(layer.list, displayTuple.id);
}

export {
    GetLayer, GetLayerList, GetLayerDataList, AddToLayer, RemoveFromLayer
}