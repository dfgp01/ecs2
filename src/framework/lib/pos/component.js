import { AddToList, GetListData, RemoveFromList } from "../../foundation/container/list";
import { NewVec, NewPos, UpdatePos, UpdateVec } from "../../foundation/structure/geometric";

/**
 * 位置组件
 */
class PosComponent extends Component {
    constructor(entityId = 0, pos = null){
        super(entityId);
        this.pos = pos;
        this.vec = NewVec();
    }
}

var posComs = NewLink();
function createPosComponent(entityId = 0) {
    let com = new PosComponent(entityId, NewPos());
    AddToList(posComs, com);
    return com;
}

function GetPosComponent(entityId = 0) {
    let com = GetListData(posComs, entityId);
    return com ? com : createPosComponent(entityId);
}

function RemovePosComponent(entityId = 0){
    RemoveFromList(posComs, entityId);
}

function GetUnitPos(entityId = 0){
    return GetPosComponent(entityId).pos;
}

function SetUnitPos(entityId = 0, x = 0, y = 0){
    UpdatePos(GetUnitPos(entityId), x, y);
}

function GetUnitVec(entityId = 0){
    return GetPosComponent(entityId).vec;
}

function SetUnitVec(entityId = 0, x = 0, y = 0){
    UpdateVec(GetUnitVec(entityId), x, y);
}

export{ 
    GetPosComponent, RemovePosComponent,
    GetUnitPos, SetUnitPos, GetUnitVec, SetUnitVec
}