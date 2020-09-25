const { NewPos } = require("../structure/geometric");
const { GetUnitPos, GetUnitVec } = require("../unit/base");

function NewUnitOffsetPos(unit = null, offset = null){
    let pos = GetUnitPos(unit);
    return NewPos(
        pos.x + offset.x,
        pos.y + offset.y);
}

function NewUnitDirtyOffsetPos(unit = null, offset = null){
    let pos = GetUnitPos(unit);
    let vec = GetUnitVec(unit);
    return NewPos(
        pos.x + vec.x + offset.x,
        pos.y + vec.y + offset.y);
}

export{
    NewUnitOffsetPos, NewUnitDirtyOffsetPos
}