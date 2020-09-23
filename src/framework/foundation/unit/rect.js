import { NewVec, NewPos, GetRectHalfWidth, GetRectHalfHeight } from "../structure/geometric";

/**
 * 矩形与位置偏移关系
 */
class RectOffsetRelation {
    constructor(offset = null, rect = null){
        this.offset = offset;
        this.rect = rect;
    }
}

function NewRectOffsetRelation(rect = null, offset = null){
    offset = offset ? offset : NewVec();
    return new RectOffsetRelation(offset, rect);
}

function GetRectOffsetRelationRect(rectOR = null){
    return rectOR.rect;
}

function GetRectOffsetRelationOffset(rectOR = null){
    return rectOR.offset;
}


export {
    NewRectOffsetRelation, GetRectOffsetRelationRect, GetRectOffsetRelationOffset
}



/**
 * TODO 有待优化
 * 两个矩形是否相交，基础碰撞检测（需要先更新坐标）
 * 原理：
 *  左x，取两者最大值
 *  右x，取两者最小值
 *  如果右x大于左x，则x轴相交
 * Y同理：
 *  上y，取两者最大值
 *  下y，取两者最小值
 *  如果下y大于上y，则y轴相交
 *  目前，即使两边重叠，也不算相交，这样能避免很多问题
 */
function NewInnerRect(rectPosTuple1 = null, rectPosTuple2 = null){
    if(!IsRectsCross(rectPosTuple1, rectPosTuple2)){
        return null;
    }

    let start1 = GetRectPosStart(rectPosTuple1);
    let start2 = GetRectPosStart(rectPosTuple2);
    let end1 = GetRectPosEnd(rectPosTuple1);
    let end2 = GetRectPosEnd(rectPosTuple2);

    let r1x1 = start1.x;
    let r2x1 = start2.x;
    let maxX1 = r1x1 > r2x1 ? r1x1 : r2x1;

    let r1x2 = end1.x;
    let r2x2 = end2.x;
    let minX2 = r1x2 < r2x2 ? r1x2 : r2x2;

    let r1y1 = start1.y;
    let r2y1 = start2.y;
    let maxY1 = r1y1 > r2y1 ? r1y1 : r2y1;

    let r1y2 = end1.y;
    let r2y2 = end2.y;
    let minY2 = r1y2 < r2y2 ? r1y2 : r2y2;

    let width = minX2 - maxX1;
    let height = minY2 - maxY1;
    let rect = NewRect(0, 0, width, height);
    if(!rect){
        return null;
    }

    return NewRectPosTuple(0, 0, 
        NewPos(
            maxX1 + GetRectHalfWidth(rect),
            maxY1 + GetRectHalfHeight(rect)
        ), NewVec(), rect);
}

/**
 * 修复位置，根据rect的中心位置修复unit.pos
 */
function FixUnitPos(rectPosTuple = null, rectX = 0, rectY = 0){
    rectPosTuple.unitPos.x = rectX - rectPosTuple.offset.x;
    rectPosTuple.unitPos.y = rectY - rectPosTuple.offset.y;
}

function FixUnitVec(rectPosTuple = null, rectX = 0, rectY = 0) {
    rectPosTuple.unitVec.x = rectX - rectPosTuple.unitPos.x;
    rectPosTuple.unitVec.y = rectY - rectPosTuple.unitPos.y;    
}

/**
 * 根据unit位置更新rect位置（一般场景调用）
 */
function FixRectPos(rectPosTuple = null, unitPosX = 0, unitPosY = 0){
    rectPosTuple.center.x = unitPosX + rectPosTuple.offset.x;
    rectPosTuple.center.y = unitPosY + rectPosTuple.offset.y;
}

/**
 * inner.rect不准越出outter.rect，修正innrer.pos位置
 * inner和outter都是RectPosTuple
 */
function FixInRect(outter = null, inner = null){
    let centerPos = GetRectPosCenter(inner);
    let innerStartPos = GetRectPosStart(inner);
    let innerEndPos = GetRectPosEnd(inner);
    let outterStartPos = GetRectPosStart(outter);
    let outterEndPos = GetRectPosEnd(outter);

    let x = centerPos.x;
    if(innerStartPos.x < outterStartPos.x){
        x = outterStartPos.x + GetRectHalfWidth(inner);
    }else if(innerEndPos.x > outterEndPos.x){
        x = outterEndPos.x - GetRectHalfWidth(inner);
    }

    let y = centerPos.y;
    if(innerStartPos.y < outterStartPos.y){
        y = outterStartPos.y + GetRectHalfHeight(inner);
    }else if(innerEndPos.y > outterEndPos.y){
        y = outterStartPos.y - GetRectHalfHeight(inner);
    }

    FixUnitPos(inner, x, y);
}


/**
 * 当前位置是否在矩形中（同样需要先更新rect位置）
 * 包含踩线情况
 */
function IsPosInRect(pos = null, rectPosTuple = null){
    let startPos = GetRectPosCenter(rectPosTuple);
    let endPos = GetRectPosEnd(rectPosTuple);
    return pos.x >= startPos.x && pos.x <= endPos.x
        && pos.y >= startPos.y && pos.y <= endPos.y;
}



//----------------- 以下待定

/**
 * 根据线段作矩形
 */
function NewOutterRect(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    let width = x2 - x1;
    let height = y2 - y1;
    if(width <= 0 || height <= 0){
        return null;
    }
    let centerX = x1 + (x2 - x1) * 0.5;
    let centerY = y1 + (y2 - y1) * 0.5;
    let rect = NewRectDefault(width, height);
    UpdateRectPos(rect, centerX, centerY);
    return rect;
}

/**
 * 两个矩形间的外接矩形
 */
function NewOutterRectByRects(rect1 = null, rect2 = null){
    let r1x1 = GetRectX1(rect1);
    let r2x1 = GetRectX1(rect2);
    let x1 = r1x1 < r2x1 ? r1x1 : r2x1;
    let r1x2 = GetRectX2(rect1);
    let r2x2 = GetRectX2(rect2);
    let x2 = r1x2 > r2x2 ? r1x2 : r2x2;

    let r1y1 = GetRectY1(rect1);
    let r2y1 = GetRectY1(rect2);
    let y1 = r1y1 < r2y1 ? r1y1 : r2y1;
    let r1y2 = GetRectY2(rect1);
    let r2y2 = GetRectY2(rect2);
    let y2 = r1y2 > r2y2 ? r1y2 : r2y2;

    return NewOutterRect(x1, y1, x2, y2);
}


/**
 * 矩形排斥，targetRect会被blockRect弹出去
 * TODO，以后完善注释
 */
function FixExcludeRect(blockRect = null, targetRect = null){
    let pos1 = blockRect.pos;
    let pos2 = targetRect.pos;
    //计算关系，上下左右
    let vx = pos1.x - pos2.x;
    let vy = pos1.y - pos2.y;
    let x = vx < 0 ? vx*-1 : vx;
    let y = vy < 0 ? vy*-1 : vy;
    if(x > y){
        //左右
        if(vx > 0){
            //rect2在左
            pos2.x = blockRect.posStart.x - targetRect.width - targetRect.xOffset;
        }else{
            //rect2在右
            pos2.x = blockRect.posEnd.x - targetRect.xOffset;
        }
    }else{
        //上下
        if(vy > 0){
            //rect2在上
            pos2.y = blockRect.posStart.y - targetRect.height - targetRect.yOffset;
        }
        else{
            //rect2在下
            pos2.y = blockRect.posEnd.y - targetRect.yOffset;
        }
    }
    UpdateRect(targetRect);
}