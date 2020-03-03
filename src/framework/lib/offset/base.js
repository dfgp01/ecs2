
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

function GetPosCom(offsetTuple = null){
    return offsetTuple.posCom;
}

function GetOffset(offsetTuple = null){
    return offsetTuple.offset;
}

function GetUnitPos(offsetTuple = null){
    return GetPos(offsetTuple.posCom);
}

function GetUnitVec(offsetTuple = null){
    return GetVec(offsetTuple.posCom);
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