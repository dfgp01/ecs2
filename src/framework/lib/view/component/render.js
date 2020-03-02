/**
 * 显示组件，包含一些显示参数
 */
class RenderComponent extends Component {
	constructor(entityId = 0, isometrics = false, angle = 0, scale = 1) {
        super(entityId);
        this.isometrics = isometrics;
        this.angle = angle;
        this.scale = scale;
	}
}

var renderComs = NewLink();
function createRenderComponent(entityId = 0, options = null) {
    //默认值
    options = options ? options : {};
    let com = new RenderComponent(entityId, options.isometrics, options.angle, options.scale);
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
    constructor(displayObject = null, renderCom = null, unitPos = null, order = 0, layerOrder = 0, offset = null){
        super();
        this.displayObject = displayObject;
        this.renderCom = renderCom;
        this.unitPos = unitPos;
        this.order = order;
        this.layerOrder = layerOrder;
        this.offset = offset;           //显示时的偏移量，和worldPos无关
        this.isoX = 0;
        this.isoY = 0;
    }
}

function createDisplayTuple(displayObject = null, renderCom = null, unitPos = null, order = 0, layerOrder = 0, offset = null){
    //默认值
    offset = offset ? offset : NewPos();
    return new DisplayTuple(displayObject, renderCom, unitPos, order, layerOrder, offset);
}