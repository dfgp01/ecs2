
/**
 * 显示元件
 *  和entity关系不大，一个entity可以拥有大于一个DisplayTuple
 *  需要设计机制避免滥用问题
 */
class DisplayTuple extends PosOffsetTuple {
    constructor(posCom = null, offset = null, spriteFrame = null, renderCom = null, order = 0, layerOrder = 0){
        super(posCom, offset);
        this.spriteFrame = spriteFrame;
        this.renderCom = renderCom;
        this.order = order;
        this.layerOrder = layerOrder;
        this.isoX = 0;
        this.isoY = 0;
    }
}