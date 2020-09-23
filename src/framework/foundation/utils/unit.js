const { NewLink } = require("../../lib/list/linklist");
const { AddToList } = require("../container/list");
const { NewPos } = require("../structure/geometric");
const { NewUnit, GetUnitPos, GetUnitVec } = require("../unit/base");

var unitList = NewLink();
function CreateUnit(x = 0, y = 0){
    let u = NewUnit(NewPos(x, y));
    AddToList(unitList, u);
    return u;
}

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
    CreateUnit, NewUnitOffsetPos, NewUnitDirtyOffsetPos
}