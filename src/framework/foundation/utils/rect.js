import { GetRectHalfHeight, GetRectHalfWidth } from "../structure/geometric";
import { Abs } from "../structure/math";
import { GetRectOffsetRelationOffset, GetRectOffsetRelationRect } from "../unit/rect";

const { NewUnitOffsetPos, NewUnitDirtyOffsetPos } = require("./unit");

function NewRectORCenter(unit = null, rectOR = null){
    return NewUnitOffsetPos(unit, GetRectOffsetRelationOffset(rectOR));
}

function NewRectORStart(unit = null, rectOR = null){
    let pos = NewRectORCenter(unit, rectOR);
    fixRectORPos(pos, rectOR, -1);
    return pos;
}

function NewRectPosEnd(unit = null, rectOR = null){
    let pos = NewRectORCenter(unit, rectOR);
    fixRectORPos(pos, rectOR, 1);
    return pos;
}

function NewDirtyRectORCenter(unit = null, rectOR = null){
    return NewUnitDirtyOffsetPos(unit, GetRectOffsetRelationOffset(rectOR));
}

function NewDirtyRectORStart(unit = null, rectOR = null){
    let pos = NewDirtyRectORCenter(unit, rectOR);
    fixRectORPos(pos, rectOR, -1);
    return pos;
}

function NewDirtyRectOREnd(unit = null, rectOR = null){
    let pos = NewDirtyRectORCenter(unit, rectOR);
    fixRectORPos(pos, rectOR, 1);
    return pos;
}

function fixRectORPos(rectPos = null, rectOR = null, offsetFlag = 0){
    let rect = GetRectOffsetRelationRect(rectOR);
    rectPos.x += GetRectHalfWidth(rect) * offsetFlag;
    rectPos.y += GetRectHalfHeight(rect) * offsetFlag;
}


/**
 * 目前的机制，可以使用矩形中心点之间的距离判断是否相交，踩线也算
 */
function IsRectsCross(unit1 = null, rectOR1 = null, unit2 = null, rectOR2 = null){
    return isRectsCross(
        NewRectORCenter(unit1, rectOR1),
        NewRectORCenter(unit2, rectOR2), 
        rectOR1, rectOR2);
}

/**
 * 判断矩形位置加上向量后是否相交，踩线也算
 * 设计初衷：判断位移后是否需要修复正确位置
 */
function IsDirtyRectsCross(unit1 = null, rectOR1 = null, unit2 = null, rectOR2 = null) {
    return isRectsCross(
        NewDirtyRectORCenter(unit1, rectOR1), 
        NewDirtyRectORCenter(unit2, rectOR2),
        rectOR1, rectOR2);
}

function isRectsCross(pos1 = null, pos2 = null, rectOR1 = null, rectOR2 = null){
    let w = Abs(pos1.x - pos2.x);
    if(w > GetRectHalfWidth(rectOR1.rect) + GetRectHalfWidth(rectOR2.rect)){
        return false;
    }
    let h = Abs(pos1.y - pos2.y);
    if(h > GetRectHalfHeight(rectOR1.rect) + GetRectHalfHeight(rectOR2.rect)){
        return false;
    }
    return true;
}

export{
    NewRectORCenter, NewRectORStart, NewRectPosEnd,
    NewDirtyRectORCenter, NewDirtyRectORStart, NewDirtyRectOREnd,
    IsRectsCross, IsDirtyRectsCross
}