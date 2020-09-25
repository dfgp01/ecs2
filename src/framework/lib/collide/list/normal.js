import { AddToList, ListIteratorCompare, RemoveFromList } from "../../../foundation/container/list";
import { NewLink } from "../../list/linklist";
import { AbstractColliderContainer, AbstractColliderSystem } from "../base";


class NormalColliderContainer extends AbstractColliderContainer {
    constructor(){
        super();
        this.list = NewLink();
    }
    addCollider(collider = null){
        AddToList(this.list, collider);
    }
    removeCollider(collider = null){
        RemoveFromList(this.list, collider.id);
    }
}


/**
 * 最简单的检测系统，两两互相对比
 */
class NormalColliderSystem extends AbstractColliderSystem {
    onInitContainer(options = null){
        return new NormalColliderContainer();
    }
    
    onUpdate(dt = 0){
        ListIteratorCompare(this.container.list, (collider1, collider2) => {
            super.check(dt, collider1, collider2);
        });
    }
}

var sys = null;
function GetNormalColliderSystem(){
    if(!sys){
        sys = new NormalColliderSystem(new NormalColliderContainer());
    }
    return sys;
}

export{
    GetNormalColliderSystem
}