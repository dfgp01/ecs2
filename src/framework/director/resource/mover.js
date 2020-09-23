import { System, Component } from "../../foundation/component/ecs";
import { SYSTEM_PRIORITY_POS_UPDATE } from "../../foundation/const";
import { NewLink } from "../../lib/list/linklist";
import { NewPos, NewVec } from "../../foundation/structure/geometric";

class MoverComponent extends Component {
    constructor(entityId = 0, pos = null, vec = null){
        super(entityId);
        this.pos = pos;
        this.vec = vec;
    }
}

function NewMoverComponent(entityId = 0, pos = null, vec = null){
    pos = pos ? pos : NewPos();
    vec = vec ? vec : NewVec();
    return new MoverComponent(entityId, pos, vec);
}

function IsMoved(moverCom = null){
    return moverCom.vec.x != 0 || moverCom.vec.y != 0;
}

var moverList = NewLink();
function GetMoverList(){
    return moverList;
}

/**
 * 统一更新位置
 */
class MoverUpdateSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_POS_UPDATE);
    }
    onUpdate(dt = 0){
        ListIterator(moverList, unit => {
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
function GetMoverUpdateSystem(){
    if(!sys){
        sys = new MoverUpdateSystem();
    }
    return sys;
}

export{
    GetMoverUpdateSystem
}