import { DispatchEvent, GetGameUnitByClz } from "../../director/utils/boot";
import { System, UnitComponent } from "../../foundation/component/ecs";
import { AbstractEventListener, GetEventData, NewEvent } from "../../foundation/component/event";
import { EVENT_TYPE_COLLIDE, SYSTEM_PRIORITY_COLLIDE } from "../../foundation/const";
import { IsDirtyRectsCross, NewRectORCenter } from "../../foundation/utils/rect";


/**
 * 碰撞元件
 * tag : 自定义标识码
 */
class Collider extends UnitComponent {
    constructor(entityId = 0, rectOR = null, tag = 0) {
        super(entityId);
        this.rectOR = rectOR;
        this.tag = tag;
    }
}

function NewCollider(entityId = 0, rectOR = null, tag = 0){
    return new Collider(entityId, rectOR, tag);
}

function GetColliderRectOR(collider = null){
    return collider.rectOR;
}

function GetColliderTag(collider = null){
    return collider.tag;
}

function GetColliderCenterPos(collider = null){
    return NewRectORCenter(GetGameUnitByClz(collider), collider.rectOR);
}


/**
 * 接口模式实现多态
 */
class AbstractColliderContainer {
    init(options = null){}
    addCollider(collider = null){}
    removeCollider(collider = null){}
}


/**
 * 碰撞检测主系统
 */
class AbstractColliderSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_COLLIDE);
    }
    check(dt = 0, collider1 = null, collider2 = null){
        if(IsDirtyRectsCross(
            GetGameUnitByClz(collider1), collider1.rectOR,
            GetGameUnitByClz(collider2), collider2.rectOR)){
            DispatchEvent(
                NewCollideEvent(collider1, collider2));
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
    return NewEvent(EVENT_TYPE_COLLIDE, new CollideEventData(
        collider1, collider2, collider1.tag | collider2.tag
    ));
}

function GetCollideEventTag(collideEvt = null){
    return GetEventData(collideEvt).tag;
}

class AbstractCollideEventListener extends AbstractEventListener {
    constructor(priority = 0){
        super(EVENT_TYPE_COLLIDE, priority);
    }
    handle(event = null){
        let d = GetEventData(event);
        this.onHandle(d.collider1, d.collider2, d.tag);
    }
    onHandle(collider1 = null, collider2 = null, tag = 0){}
}


export{
    Collider, NewCollider, GetColliderRectOR, GetColliderTag, GetColliderCenterPos,
    AbstractColliderContainer, AbstractColliderSystem, 
    NewCollideEvent, GetCollideEventTag, AbstractCollideEventListener
}