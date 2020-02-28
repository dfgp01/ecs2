/**
 * 显示图层
 *  order越低，越先渲染，后渲染的会遮住前面渲染的
 */
class Layer {
    constructor(order = 0, type = 0){
        this.id = order;
        this.order = order;
        this.type = type;
        this.list = NewLink();
    }
}

/**
const TypeNormal = 0;
const TypeTileMap = 1;
const TypeISOmetric = 2;
const TypeISOmetricTileMap = 3;
*/
const TypeNormal = 0;
const TypeISOmetric = 1;

var layerList = NewLink();
function createLayer(order = 0, type = 0){
    InsertData(layerList, new Layer(order, type));
}

function getLayer(order = 0){
    let layer = GetData(layerList, order);
    if(!layer){
        console.error("layer-order: %d is not exists.", order);
        return null;
    }
    return layer;
}

function addToLayer(displayTuple = null){
    let layer = getLayer(displayTuple.order);
    if(!layer){
        return;
    }
    InsertData(layer.list, displayTuple, displayTuple.order);
}

function removeFromLayer(displayTuple = null){
    let layer = getLayer(displayTuple.order);
    if(!layer){
        return;
    }
    ShiftData(layer.list, displayTuple.id);
}