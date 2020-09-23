import { NewPos, NewVec, UpdateVec, UpdatePos } from "../structure/geometric";
import { GameObject } from "../component/ecs";

/**
 * 通常情况下，game对象都有pos和vec，因此做一个复合类，方便访问属性
 */
class Unit extends GameObject {
    constructor(pos = null, vec = null){
        super();
        this.pos = pos;
        this.vec = vec;
    }
}

function NewUnit(pos = null, vec = null){
    pos = pos ? pos : NewPos();
    vec = vec ? vec : NewVec();
    return new Unit(pos, vec);
}

function GetUnitId(unit = null){
    return unit.id;
}

function GetUnitPos(unit = null){
    return unit.pos;
}

function SetUnitPos(unit = null, x = 0, y = 0){
    UpdatePos(unit.pos, x, y);
}

function GetUnitVec(unit = null){
    return unit.vec;
}

function SetUnitVec(unit = null, vecX = 0, vecY = 0){
    UpdateVec(unit.vec, vecX, vecY);
}

export {
    NewUnit, GetUnitId, GetUnitPos, SetUnitPos, GetUnitVec, SetUnitVec
}