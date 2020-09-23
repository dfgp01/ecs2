import { NewVec, NewPos, GetRectHalfWidth, GetRectHalfHeight, NewPosWithVec, GetVecDistance, GetCircleRadius } from "../structure/geometric";
import { GetUnitOffsetPos, GetUnitDirtyOffsetPos, GetUnitVec } from "./base";
import { Abs } from "../structure/math";

/**
 * 圆形与位置偏移关系
 */
class CircleOffsetRelation {
    constructor(offset = null, circle = null){
        this.offset = offset;
        this.circle = circle;
    }
}

function NewCircleOffsetRelation(offset = null, circle = null){
    offset = offset ? offset : NewVec();
    return new CircleOffsetRelation(offset, circle);
}

function GetCircle(circleOR = null){
    return circleOR.circle;
}

function GetCirclePosCenter(unit = null, circleOR = null){
    return GetUnitOffsetPos(unit, circleOR.offset);
}

function GetDirtyCirclePosCenter(unit = null, circleOR = null){
    return GetUnitDirtyOffsetPos(unit, circleOR.offset);
}


/**
 * 目前的机制，可以使用圆心之间的距离判断是否相交，踩线也算
 */
function IsCirclesCross(unit1 = null, circleOR1 = null, unit2 = null, circleOR2 = null){
    let pos1 = GetCirclePosCenter(unit1, circleOR1);
    let pos2 = GetCirclePosCenter(unit2, circleOR2);

    //根据勾股定理：a^2 + b^2 = c^2，那么只需以两圆心位置为vec，判断是否小于等于两园半径之和
    return GetVecDistance(NewVec(
            Abs(pos1.x - pos2.x), Abs(pos1.y - pos2.y))) <= 
        GetCircleRadius(circleOR1.circle) + GetCircleRadius(circleOR2.circle);
}

/**
 * 判断矩形位置加上向量后是否相交，踩线也算
 * 设计初衷：判断位移后是否需要修复正确位置
 */
function IsDirtyCirclesCross(unit1 = null, rectOR1 = null, unit2 = null, rectOR2 = null) {
    let pos1 = NewPosWithVec(
        GetCirclePosCenter(unit1, circleOR1),
        GetUnitVec(unit1)
    );
    let pos2 = NewPosWithVec(
        GetCirclePosCenter(unit2, circleOR2),
        GetUnitVec(unit2)
    );

    //根据勾股定理：a^2 + b^2 = c^2，那么只需以两圆心位置为vec，判断是否小于等于两园半径之和
    return GetVecDistance(NewVec(
        Abs(pos1.x - pos2.x), Abs(pos1.y - pos2.y))) <= 
    GetCircleRadius(circleOR1.circle) + GetCircleRadius(circleOR2.circle);
}

export {
    NewCircleOffsetRelation, GetCircle, 
    GetCirclePosCenter, GetDirtyCirclePosCenter,
    IsCirclesCross, IsDirtyCirclesCross
}