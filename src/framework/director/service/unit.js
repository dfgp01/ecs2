import { System } from "../../foundation/component/ecs";
import { GetUnitPos, GetUnitVec } from "../../foundation/unit/base";
import { UpdatePosWithVec, UpdateVec } from "../../foundation/structure/geometric";
import { ListIterator } from "../../foundation/container/list";
import { SYSTEM_PRIORITY_POS_UPDATE } from "../../foundation/const";
import { GetUnitList } from "./resource";

/**
 * 统一更新位置
 */
class UnitPosUpdateSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_POS_UPDATE);
    }
    onUpdate(dt = 0){
        ListIterator(GetUnitList(), unit => {
            let vec = GetUnitVec(unit);
            if(vec.x == 0 && vec.y == 0){
                return
            }
            let pos = GetUnitPos(unit);
            UpdatePosWithVec(pos, vec);
            UpdateVec(vec, 0, 0);
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

export{
    GetUnitPosUpdateSystem
}