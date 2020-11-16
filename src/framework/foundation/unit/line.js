
/**
 * 基础线段
 * start = Pos(x, y)
 * end = Pos(x, y)
 */
class Line {
    constructor(offset, unitPos = null, vec = null, start, end){
        this.offset = offset;
        this.unitPos = unitPos;
        this.vec = vec;
        this.start = start;
        this.end = end;
    }
}

function NewLine(xOffset = 0, yOffset = 0, unitPos = null, vec = null){
    if(!unitPos || !vec){
        return null;
    }
    if(vec.x==0 && vec.y==0){
        console.error("vec param error. x:%d, y:%d", x, y);
        return null;
    }
    let offset = NewVec(xOffset, yOffset);
    let start = NewPos(unitPos.x + xOffset, unitPos.y + yOffset);
    let end = NewPos(start.x + vec.x, start.y + vec.y);
    return new Line(offset, unitPos, vec, start, end);
}

/**
 * 基础属性 
 */
function GetOffset(line = null){
    return line.offset;
}
function GetUnitPos(line = null){
    return line.unitPos;
}
function GetVec(line = null){
    return line.vec;
}
function GetStartPos(line = null){
    return line.start;
}
function GetEndPos(line = null){
    return line.end;
}

/**
 * 是否平行于x,y轴的线
 */
function IsHorizontalLine(line = null){
    return line.vec.y == 0;
}
function IsVerticalLine(line = null){
    return line.vec.x == 0;
}