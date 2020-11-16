import { CollectionIterator } from "../../foundation/component/collection";
import { GameObject, System } from "../../foundation/component/ecs";
import { SYSTEM_PRIORITY_POS_UPDATE } from "../../foundation/const";
import { NewPos, NewVec, UpdatePos, UpdatePosWithVec, UpdateVec } from "../../foundation/structure/geometric";
import { NewLinkList } from "../collection/linklist";

/**
 * 通常情况下，game-entity对象都有pos和vec，因此做一个复合类，方便访问属性
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


/**
 * 所有游戏单位
 */
var unitList = NewLinkList();
function GetUnitList(){
    return unitList;
}


/**
 * 统一更新位置
 */
class UnitPosUpdateSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_POS_UPDATE);
    }
    onUpdate(dt = 0){
        CollectionIterator(unitList, unit => {
            if(unit.vec.x == 0 && unit.vec.y == 0){
                return
            }
            UpdatePosWithVec(unit.pos, unit.vec);
            UpdateVec(unit.vec, 0, 0);
        });
    }
}

var sys = null;
function GetUnitPosUpdateSystem(){
    if(!sys){
        sys = new UnitPosUpdateSystem();
    }
    return sys;
}

export {
    NewUnit, GetUnitId, GetUnitPos, SetUnitPos, GetUnitVec, SetUnitVec,
    GetUnitList, GetUnitPosUpdateSystem
}