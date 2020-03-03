
/**
 * 先写，再慢慢规范
 */
class PosOffsetTuple extends GameObject {
    constructor(posCom = null, offset = null){
        super();
        this.posCom = posCom;
        this.offset = offset;
    }
}

function NewOffsetTuple(entityId = 0, xOffset = 0, yOffset = 0){
    let posCom = GetPosComponent(entityId);
    return new PosOffsetTuple(posCom, NewVec(xOffset, yOffset));
}

function GetPosOffset(offsetTuple = null){
    return offsetTuple.offset;
}

function GetRealPos(offsetTuple = null){
    let unitPos = GetPos(offsetTuple.posCom);
    let offset = offsetTuple.offset;
    return NewPos(
        unitPos.x + offset.x,
        unitPos.y + offset.y);
}

function UpdateOffset(offsetTuple = null, xOffset = 0, yOffset = 0){
    offsetTuple.offset.x = xOffset;
    offsetTuple.offset.y = yOffset;
}