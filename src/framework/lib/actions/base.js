import { AddToCollection, CollectionIterator, RemoveFromCollection } from "../../foundation/component/collection";
import { System, UnitComponent } from "../../foundation/component/ecs";
import { SYSTEM_PRIORITY_ACTION } from "../../foundation/const";
import { NewLinkList } from "../collection/linklist";

export const ACTION_STATE_RUNNING = 1;
export const ACTION_STATE_END = 2;

/**
*   action模块的设计理念是：
*       给策划人员操作的动态配置，由json驱动（data-driven），再由脚本系统生成为静态代码
*   目前先用离散配置代替

*   生命周期管理
        onStart -> 初始化，由utils.RunAction触发
        onUpdate -> 由system主流程调用，只执行主逻辑，不需要判断终止条件
        endCondition: 由system在执行onUpdate后访问，返回bool，决定是否达到终止条件了，返回true则表示可以终止此action
        onEnd: 在system请求endCondition=true后调用，用于收尾，如资源回收
        onCancel: 由utils.CancelAction触发，强制中断，不走isEnd流程，默认调用onEnd，因此根据情况可能需要额外处理
*/
class Action extends UnitComponent {
    constructor(entityId = 0, order = 0){
        super(entityId);
        this.order = order; //排序号，优先级
        this.state = 0;
    }
    onStart(){}
    onUpdate(dt = 0){}
    onEnd(){}
    endCondition(){    return false;   }
    onCancel(){}
}

function GetActionOrder(action = null){
    return action.order;
}

function SetActionState(action = null, state = 0){
    action.state = state;
}

function IsActionStart(action = null){
    return action.state == ACTION_STATE_RUNNING;
}

function IsActionEnd(action = null){
    return action.state == ACTION_STATE_END;
}


var actionList = NewLinkList();
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
        CollectionIterator(actionList, action => {
            action.onUpdate(dt);
            if(action.endCondition()){
                SetActionState(action, ACTION_STATE_END);
                RemoveFromCollection(actionList, action.id);
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


/**
 * 运行action，并加入到action系统link中，一般供外部调用 
 */
function RunAction(action = null){
    if(IsActionStart(action)){
        return;
    }
    SetActionState(action, ACTION_STATE_RUNNING);
    AddToCollection(actionList, action);
    action.onStart();
}

/**
 * 强制中断运行中的action
 */
function CancelAction(action = null){
    if(IsActionEnd(action)){
        return;
    }
    SetActionState(action, ACTION_STATE_END);
    RemoveFromCollection(actionList, action.id);
    action.onCancel();
}


export {
    Action, GetActionOrder, SetActionState, IsActionStart, IsActionEnd,
    GetRunnigActionList, GetActionSystem, RunAction, CancelAction
}