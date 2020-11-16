import { AddToCollection, CollectionIteratorCompare, RemoveFromCollection } from "../../../foundation/component/collection";
import { NewLinkList } from "../../collection/linklist";
import { AbstractColliderContainer, AbstractColliderSystem } from "../base";


class NormalColliderContainer extends AbstractColliderContainer {
    constructor(){
        super();
        this.list = NewLinkList();
    }
    onInit(options = null){
        
    }
    addCollider(collider = null){
        AddToCollection(this.list, collider);
    }
    removeCollider(collider = null){
        RemoveFromCollection(this.list, collider.id);
    }
}


/**
 * 最简单的检测系统，两两互相对比
 */
class NormalColliderSystem extends AbstractColliderSystem {
    onUpdate(dt = 0){
        CollectionIteratorCompare(this.container.list, (collider1, collider2) => {
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