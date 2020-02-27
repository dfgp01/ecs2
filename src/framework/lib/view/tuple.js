
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

const TypeNormal = 0;
const TypeISOmetric = 1;
function AddLayer(order = 0, type = 0){
    let layer = GetData(displayList, order);
    if(layer){
        console.error("order: %d is exists.", order);
        return;
    }
    InsertData(displayList, new Layer(order, type));
}

/**
 * 显示元件
 *  和entity关系不大，一个entity可以拥有大于一个DisplayTuple
 *  需要设计机制避免滥用问题
 */
class DisplayTuple extends GameObject {
    constructor(displayObject = null, unitPos = null, order = 0, offset = null){
        super();
        this.displayObject = displayObject;
        this.unitPos = unitPos;
        this.order = order;
        this.offset = offset;
    }
}

/**
 * 画布上的显示队列
 */
var displayList = createDisplayList();
function createDisplayList(){
    let list = NewLink();
    InsertData(list, new Layer());
    return list;
}

function GetDisplayList(){
    return displayList;
}


/**
 * 加入渲染队列
 * layer = 图层顺序，数值从低到高顺序渲染
 */
function AddDisplay(displayObject = null, unitPos = null, layerOrder = 0, order = 0, offset = null) {
    //默认值
    offset = offset ? offset : NewPos();

    let layer = GetData(displayList, order, true);
    if(!layer){
        console.error("layerOrder: %d is not exists.", layerOrder);
        return null;
    }

    //此处可能要用tree优化
    order = order + layerOrder * 100000;
    let t = new DisplayTuple(displayObject, unitPos, order, offset);
    InsertData(layer.list, t, order);
    return t;
}

function RemoveDisplay(displayTuple = null) {
    let layerOrder = displayTuple.order / 100000;
    let layer = GetData(displayList, layerOrder);
    ShiftData(layer, displayTuple.id);
}