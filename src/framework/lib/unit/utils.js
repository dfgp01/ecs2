import { AddToCollection, GetCollectionData, RemoveFromCollection } from "../../foundation/component/collection";
import { NewPos } from "../../foundation/structure/geometric";
import { GetUnitList, GetUnitPos, GetUnitVec, NewUnit } from "./base";

function NewGameUnit(pos = null, vec = null){
    let u = NewUnit(pos, vec);
    AddToCollection(GetUnitList(), u);
    return u;
}

function RemoveGameUnit(entityId = 0){
    RemoveFromCollection(GetUnitList(), entityId);
}

function GetGameUnitById(entityId = 0){
    return GetCollectionData(GetUnitList(), entityId);
}

function GetGameUnitPosById(entityId = 0){
    return GetUnitPos(
        GetGameUnitById(entityId));
}

function GetGameUnitByClz(unitComponent = null){
    return GetGameUnitById(unitComponent.entityId);
}

function GetGameUnitPosByClz(unitComponent = null){
    return GetUnitPos(
        GetGameUnitByClz(unitComponent));
}

function NewPosWithUnitOffset(unit = null, offset = null){
    let pos = GetUnitPos(unit);
    return NewPos(
        pos.x + offset.x,
        pos.y + offset.y);
}

function NewDirtyPosWithUnitOffset(unit = null, offset = null){
    let pos = GetUnitPos(unit);
    let vec = GetUnitVec(unit);
    return NewPos(
        pos.x + vec.x + offset.x,
        pos.y + vec.y + offset.y);
}

export{
    NewGameUnit, RemoveGameUnit, GetGameUnitById, GetGameUnitPosById, GetGameUnitByClz, GetGameUnitPosByClz,
    NewPosWithUnitOffset, NewDirtyPosWithUnitOffset
}