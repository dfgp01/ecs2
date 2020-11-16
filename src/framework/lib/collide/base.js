import { System, UnitComponent } from "../../foundation/component/ecs";
import { EVENT_TYPE_COLLIDE, SYSTEM_PRIORITY_COLLIDE } from "../../foundation/const";
import { NewVec } from "../../foundation/structure/geometric";
import { IsRectsCross, NewRectCenter } from "../../foundation/utils/rect";
import { AbstractEventListener, AddNewEvent } from "../events/base";
import { GetGameUnitPosByClz } from "../unit/utils";


/**
 * 碰撞元件
 * tag : 自定义标识码
 */
class Collider extends UnitComponent {
    constructor(entityId = 0, rect = null, offset = null, tag = 0) {
        super(entityId);
        this.rect = rect;
        this.offset = offset;
        this.tag = tag;
    }
}

function NewCollider(entityId = 0, rect = null, tag = 0, offset = null){
    if(!rect){
        //log here
        return null;
    }
    offset = offset ? offset : NewVec();
    return new Collider(entityId, rect, offset, tag);
}

function GetColliderRect(collider = null){
    return collider.rect;
}

function GetColliderOffset(collider = null){
    return collider.offset;
}

function GetColliderTag(collider = null){
    return collider.tag;
}

function NewColliderRectCenter(collider = null){
    return NewRectCenter(GetGameUnitPosByClz(collider), collider.offset);
}


/**
 * 接口模式实现多态
 */
class AbstractColliderContainer {
    onInit(options = null){}
    addCollider(collider = null){}
    removeCollider(collider = null){}
}


/**
 * 碰撞检测主系统
 */
class AbstractColliderSystem extends System {
    constructor(container = null){
        super(SYSTEM_PRIORITY_COLLIDE);
        this.container = container;
    }

    check(dt = 0, collider1 = null, collider2 = null){
        if(IsRectsCross(
            NewColliderRectCenter(collider1), collider1.rect,
            NewColliderRectCenter(collider2), collider2.rect)){
            NewCollideEvent(collider1, collider2);
        }
    }
}

class CollideEventData {
    constructor(collider1 = null, collider2 = null, tag = 0){
        this.collider1 = collider1;
        this.collider2 = collider2;
        this.tag = tag;
    }
}

function NewCollideEvent(collider1 = null, collider2 = null){
    return AddNewEvent(EVENT_TYPE_COLLIDE, new CollideEventData(
        collider1, collider2, collider1.tag | collider2.tag
    ));
}

function GetCollideEventTag(collideEvt = null){
    return GetEventData(collideEvt).tag;
}

class CollideEventListener extends AbstractEventListener {
    constructor(priority = 0, callback = null){
        super(EVENT_TYPE_COLLIDE, priority);
        this.callback = callback;
    }
    onHandle(eventData = null){
        this.callback(eventData.collider1, eventData.collider2, eventData.tag);
    }
}

function NewCollideEventListener(callback = null){
    return new CollideEventListener(callback);
}


export{
    Collider, NewCollider, GetColliderRect, GetColliderOffset, GetColliderTag, NewColliderRectCenter,
    AbstractColliderContainer, AbstractColliderSystem, 
    NewCollideEvent, GetCollideEventTag, NewCollideEventListener
}