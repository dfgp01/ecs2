import { GetGameUnitByClz } from "../../../director/utils/boot";
import { GetRectHalfHeight, GetRectHalfWidth } from "../../../foundation/structure/geometric";
import { Abs } from "../../../foundation/structure/math";
import { SetUnitVec, GetUnitVec } from "../../../foundation/unit/base";
import { GetRectOffsetRelationRect } from "../../../foundation/unit/rect";
import { NewDirtyRectOREnd, NewDirtyRectORStart, NewRectORCenter } from "../../../foundation/utils/rect";
import { GetColliderRectOR } from "../base";

/**
 * 碰撞位置关系
 */
export const COLLIDE_LR = 1;    //左右
export const COLLIDE_RL = 2;    //右左
export const COLLIDE_X = 3;     //x轴

export const COLLIDE_UD = 4;    //上下
export const COLLIDE_DU = 8;    //下上
export const COLLIDE_Y = 12;    //y轴

/**
 *  todo 需要重新设计
 * 获取碰撞位置关系
 */
function GetColliderFlag(collider1 = null, collider2 = null){
    let rectOR1 = GetColliderRectOR(collider1);
    let rectOR2 = GetColliderRectOR(collider1);
    let rect1 = GetRectOffsetRelationRect(rectOR1);
    let rect2 = GetRectOffsetRelationRect(rectOR2);
    let pos1 = NewRectORCenter(
        GetGameUnitByClz(collider1), rectOR1);
    let pos2 = NewRectORCenter(
        GetGameUnitByClz(collider2), rectOR2);
    
    let flag = 0;
    let w = Abs(pos1.x - pos2.x);
    if(w >= GetRectHalfWidth(rect1) + GetRectHalfWidth(rect2)){
        flag = flag | (pos1.x < pos2.x ? COLLIDE_LR : COLLIDE_RL);
    }
    let h = Abs(pos1.y - pos2.y);
    if(h >= GetRectHalfHeight(rect1) + GetRectHalfHeight(rect2)){
        flag = flag | (pos1.y < pos2.y ? COLLIDE_UD : COLLIDE_DU);
    }
    return flag;
}


/**
 * 简易方案构想，目前机制：
 *      body和block的碰撞计算要加上vec
 */
function BoxCollide(bodyCollider = null, blockCollider = null){
    let flag = GetColliderFlag(bodyCollider, blockCollider);

    //两种情况要处理，
    //1：在斜边方向，无视
    //2：斜向进来的，已经过了一帧，陷进去了
    if((flag & COLLIDE_Y) > 0 && (flag & COLLIDE_X) > 0){
        return 0;
    }
    let bodyVec = GetUnitVec(GetGameUnitByClz(bodyCollider));
    if(flag == 0){
        bodyVec.x > 0 ? fixInBlockLeft(bodyCollider, blockCollider) : fixInBlockRight(bodyCollider, blockCollider);
    }

    switch(flag){
        case COLLIDE_LR:
            fixInBlockLeft(bodyCollider, blockCollider);
            break;
        case COLLIDE_RL:
            fixInBlockRight(bodyCollider, blockCollider);
            break;
        case COLLIDE_UD:
            fixInBlockUp(bodyCollider, blockCollider);
            break;
        case COLLIDE_DU:
            fixInBlockDown(bodyCollider, blockCollider);
            break;
    }
    return flag;
}

function fixInBlockLeft(bodyCollider = null, blockCollider = null){
    let bodyUnit = GetGameUnitByClz(bodyCollider);
    let bodyRectOR = GetColliderRectOR(bodyCollider);
    let bodyPos = NewRectORCenter(bodyUnit, bodyRectOR);
    let bodyVec = GetUnitVec(bodyUnit);
    let bodyHalfWidth = GetRectHalfWidth(GetRectOffsetRelationRect(bodyRectOR));
    let blockStart = NewDirtyRectORStart(
        GetGameUnitByClz(blockCollider), 
        GetColliderRectOR(blockCollider));
    SetUnitVec(
        bodyUnit, 
        blockStart.x - bodyHalfWidth - bodyPos.x,
        bodyVec.y);
}

function fixInBlockRight(bodyCollider = null, blockCollider = null){
    let bodyUnit = GetGameUnitByClz(bodyCollider);
    let bodyRectOR = GetColliderRectOR(bodyCollider);
    let bodyPos = NewRectORCenter(bodyUnit, bodyRectOR);
    let bodyVec = GetUnitVec(bodyUnit);
    let bodyHalfWidth = GetRectHalfWidth(GetRectOffsetRelationRect(bodyRectOR));
    let blockEnd = NewDirtyRectOREnd(
        GetGameUnitByClz(blockCollider), 
        GetColliderRectOR(blockCollider));
    SetUnitVec(
        bodyUnit, 
        blockEnd.x + bodyHalfWidth - bodyPos.x,
        bodyVec.y);
}

function fixInBlockUp(bodyCollider = null, blockCollider = null){
    let bodyUnit = GetGameUnitByClz(bodyCollider);
    let bodyRectOR = GetColliderRectOR(bodyCollider);
    let bodyPos = NewRectORCenter(bodyUnit, bodyRectOR);
    let bodyVec = GetUnitVec(bodyUnit);
    let bodyHalfHeight = GetRectHalfHeight(GetRectOffsetRelationRect(bodyRectOR));
    let blockStart = NewDirtyRectORStart(
        GetGameUnitByClz(blockCollider), 
        GetColliderRectOR(blockCollider));
    SetUnitVec(
        bodyUnit,
        bodyVec.x,
        blockStart.y - bodyHalfHeight - bodyPos.y);
}

function fixInBlockDown(bodyCollider = null, blockCollider = null){
    let bodyUnit = GetGameUnitByClz(bodyCollider);
    let bodyRectOR = GetColliderRectOR(bodyCollider);
    let bodyPos = NewRectORCenter(bodyUnit, bodyRectOR);
    let bodyVec = GetUnitVec(bodyUnit);
    let bodyHalfHeight = GetRectHalfHeight(GetRectOffsetRelationRect(bodyRectOR));
    let blockEnd = NewDirtyRectOREnd(
        GetGameUnitByClz(blockCollider), 
        GetColliderRectOR(blockCollider));
    SetUnitVec(
        bodyUnit,
        bodyVec.x,
        blockEnd.y + bodyHalfHeight - bodyPos.y);
}


export {
    GetColliderFlag, BoxCollide
}