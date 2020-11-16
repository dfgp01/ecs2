import { GetRectHalfHeight, GetRectHalfWidth, NewPosWithVec } from "../structure/geometric";
import { Abs } from "../structure/math";

function NewRectStart(unitPos = null, offset = null, rect = null){
    let pos = NewRectCenter(unitPos, offset);
    pos.x -= GetRectHalfWidth(rect);
    pos.y -= GetRectHalfHeight(rect);
    return pos;
}

function NewRectEnd(unitPos = null, offset = null, rect = null){
    let pos = NewRectCenter(unitPos, offset);
    pos.x += GetRectHalfWidth(rect);
    pos.y += GetRectHalfHeight(rect);
    return pos;
}

function NewRectCenter(unitPos = null, offset = null){
    return NewPosWithVec(unitPos, offset);
}

/**
 * 目前的机制，可以使用矩形中心点之间的距离判断是否相交，踩线也算
 */
function IsRectsCross(rectCenter1 = null, rect1 = null, rectCenter2 = null, rect2 = null){
    let w = Abs(rectCenter1.x - rectCenter2.x);
    if(w > GetRectHalfWidth(rect1) + GetRectHalfWidth(rect2)){
        return false;
    }
    let h = Abs(rectCenter1.y - rectCenter2.y);
    if(h > GetRectHalfHeight(rect1) + GetRectHalfHeight(rect2)){
        return false;
    }
    return true;
}

export{
    NewRectStart, NewRectEnd, NewRectCenter, IsRectsCross
}