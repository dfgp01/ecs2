import { ACTION_STATE_END, ACTION_STATE_RUNNING, IsActionEnd, IsActionStart, SetActionState } from "../../foundation/component/action";
import { AddToList, RemoveFromList } from "../../foundation/container/list";
import { GetRunnigActionList } from "../service/action";

/**
 * 运行action，并加入到action系统link中，一般供外部调用 
 */
function RunAction(action = null){
    if(IsActionStart(action)){
        return;
    }
    SetActionState(action, ACTION_STATE_RUNNING);
    //InsertToList(GetRunnigActionList(), action, GetActionOrder(action));
    AddToList(GetRunnigActionList(), action);
    action.onStart();
}

/**
 * 中断运行中的action
 */
function StopAction(action = null){
    if(IsActionEnd(action)){
        return;
    }
    SetActionState(action, ACTION_STATE_END);
    RemoveFromList(GetRunnigActionList(), action.id);
    action.onCancel();
}

export{
    RunAction, StopAction
}