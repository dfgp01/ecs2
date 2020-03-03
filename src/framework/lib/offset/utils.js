
function NewRectPosTuple(entityId = 0, xOffset = 0, yOffset = 0, rect = null) {
    let posCom = GetPosComponent(entityId);
    return new RectPosTuple(posCom, NewVec(xOffset, yOffset), rect);
}


function NewDisplayTuple(entityId = 0, xOffset = 0, yOffset = 0, spriteFrame = null, order = 0, layerOrder = 0){
    let posCom = GetPosComponent(entityId);
    let renderCom = GetRenderComponent(entityId);
    return new DisplayTuple(posCom, NewVec(xOffset, yOffset), spriteFrame, renderCom, order, layerOrder);
}

/**
 * 目前的机制，可以使用矩形中心点之间的距离判断是否相交
 */
function IsRectsCross(rectPosTuple1 = null, rectPosTuple2 = null){
    let pos1 = GetRectPosCenter(rectPosTuple1);
    let pos2 = GetRectPosCenter(rectPosTuple2);
    let w = Abs(pos1.x - pos2.x);
    if(w > GetRectHalfWidth(rectPosTuple1.rect) + GetRectHalfWidth(rectPosTuple2.rect)){
        return false;
    }
    let h = Abs(pos1.y - pos2.y);
    if(h > GetRectHalfHeight(rectPosTuple1.rect) + GetRectHalfHeight(rectPosTuple2.rect)){
        return false;
    }
    return true;
}

function IsRectsCrossWithVec(rectPosTuple1 = null, rectPosTuple2 = null) {
    let rp1 = GetRectPosCenter(rectPosTuple1);
    let pos1 = NewPos(
        rp1.x + rectPosTuple1.unitVec.x,
        rp1.y + rectPosTuple1.unitVec.y
    );
    let rp2 = GetRectPosCenter(rectPosTuple2);
    let pos2 = NewPos(
        rp2.x + rectPosTuple2.unitVec.x,
        rp2.y + rectPosTuple2.unitVec.y
    );
    let w = Abs(pos1.x - pos2.x);
    if(w > GetRectHalfWidth(rectPosTuple1.rect) + GetRectHalfWidth(rectPosTuple2.rect)){
        return false;
    }
    let h = Abs(pos1.y - pos2.y);
    if(h > GetRectHalfHeight(rectPosTuple1.rect) + GetRectHalfHeight(rectPosTuple2.rect)){
        return false;
    }
    return true;
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

export{
    NewRectPosTuple, UpdateRectPosOffset, GetRectPosOffset, GetRectUnitPos, GetRectUnitVec, GetRect, GetRectPosCenter, GetRectPosStart, GetRectPosEnd,
    NewInnerRect, IsRectsCross, IsRectsCrossWithVec, FixUnitPos, FixUnitVec, FixRectPos, FixInRect, IsPosInRect
}