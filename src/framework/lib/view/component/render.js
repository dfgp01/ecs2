/**
 * 显示组件，包含一些显示参数
 */
class RenderComponent extends Component {
	constructor(entityId = 0, angle = 0, scale = 1) {
        super(entityId);
        this.angle = angle;
        this.scale = scale;
	}
}

var renderComs = NewLink();
function createRenderComponent(entityId = 0, options = null) {
    //默认值
    options = options ? options : {};
    let com = new RenderComponent(entityId, options.angle, options.scale);
    PushToLink(renderComs, com);
    return com;
}

function getRenderComponent(entityId = 0){
    return GetData(renderComs, entityId);
}

/**
 * 显示元件
 *  和entity关系不大，一个entity可以拥有大于一个DisplayTuple
 *  需要设计机制避免滥用问题
 */
class DisplayTuple extends GameObject {
    constructor(displayObject = null, unitPos = null, order = 0, layerOrder = 0, offset = null){
        super();
        this.displayObject = displayObject;
        this.unitPos = unitPos;
        this.order = order;
        this.layerOrder = layerOrder;
        this.offset = offset;
    }
}

function createDisplayTuple(displayObject = null, unitPos = null, order = 0, layerOrder = 0, offset = null){
    //默认值
    offset = offset ? offset : NewPos();
    return new DisplayTuple(displayObject, unitPos, order, layerOrder, offset);
}