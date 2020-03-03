
/**
 * 矩形与位置的关系元件
 */
class RectPosTuple extends PosOffsetTuple {
    constructor(posCom = null, offset = null, rect = null){
        super(posCom, offset);
        this.rect = rect;
    }
    constructor(posCom = null, offset = null){
        super();
        this.posCom = posCom;
        this.offset = offset;
    }
}

function GetRect(rectPosTuple = null){
    return rectPosTuple.rect;
}

function GetRectPosCenter(rectPosTuple = null){
    return GetRealPos(rectPosTuple);
}

function GetRectPosStart(rectPosTuple = null){
    let pos = GetRectPosCenter(rectPosTuple);
    return NewPos(
        pos.x - GetRectHalfWidth(rectPosTuple.rect),
        pos.y - GetRectHalfHeight(rectPosTuple.rect)
    );
}

function GetRectPosEnd(rectPosTuple = null){
    let pos = GetRectPosCenter(rectPosTuple);
    return NewPos(
        pos.x + GetRectHalfWidth(rectPosTuple.rect),
        pos.y + GetRectHalfHeight(rectPosTuple.rect)
    );
}