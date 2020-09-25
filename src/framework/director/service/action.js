import { ACTION_STATE_END, SetActionState } from "../../foundation/component/action";
import { System } from "../../foundation/component/ecs";
import { SYSTEM_PRIORITY_ACTION } from "../../foundation/const";
import { ListIterator, RemoveFromList } from "../../foundation/container/list";
import { NewLink } from "../../lib/list/linklist";

var actionList = NewLink();
function GetRunnigActionList(){
    return actionList;
}

/**
 * 动作系统
 */
class ActionSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_ACTION);
    }
    onUpdate(dt = 0) {
        ListIterator(actionList, action => {
            action.onUpdate(dt);
            if(action.isEnd()){
                SetActionState(action, ACTION_STATE_END);
                RemoveFromList(actionList, action.id);
                action.onEnd();
            }
        });
    }
}

var sys = null;
function GetActionSystem(){
    if(!sys){
        sys = new ActionSystem();
    }
    return sys;
}


export{
    GetRunnigActionList, GetActionSystem
}