
/**
 * TODO
 * 先写，再慢慢规范
 * 这里不能有posCom，因为这是基础层
 * box-collider用到IsRectsCrossWithVec来检测碰撞，需要重新考虑
 * 要么就做成lib
 */
class PosOffsetRelation {
    constructor(pos = null, offset = null){
        this.pos = pos;
        this.offset = offset;       //通常是指显示时的偏移量，和worldPos无关
    }
}

function NewPosOffsetRelation(pos = null, offset = null){
    offset = offset ? offset : NewVec();
    return new PosOffsetRelation(pos, offset);
}

function GetPos(posOffsetRel = null){
    return posOffsetRel.pos;
}

function GetOffset(posOffsetRel = null){
    return posOffsetRel.offset;
}

function GetRealPos(posOffsetRel = null){
    return NewPos(
        posOffsetRel.pos.x + posOffsetRel.offset.x,
        posOffsetRel.pos.y + posOffsetRel.offset.y);
}

function UpdateOffset(posOffsetRel = null, xOffset = 0, yOffset = 0){
    posOffsetRel.offset.x = xOffset;
    posOffsetRel.offset.y = yOffset;
}

export {
    PosOffsetRelation, NewPosOffsetRelation, GetPos, GetOffset,
    GetRealPos, UpdateOffset
}