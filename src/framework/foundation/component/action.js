import { UnitComponent } from "./ecs";

export const ACTION_STATE_RUNNING = 1;
export const ACTION_STATE_END = 2;

/**
*   action模块的设计理念是：
*       给策划人员操作的动态配置，由json驱动（data-driven），再由脚本系统生成为静态代码
*   目前先用离散配置代替

*   生命周期管理
        onStart -> 初始化，由utils.RunAction触发
        onUpdate -> 由system主流程调用，只执行主逻辑，不需要判断终止条件
        isEnd: 由system在执行onUpdate后访问，返回bool，决定是否达到终止条件了，返回true则表示可以终止此action
        onEnd: 在system请求isEnd=true后调用，用于收尾，如资源回收
        onStop: 由utils.StopAction触发，强制中断，不走isEnd流程，默认调用onEnd，因此根据情况可能需要额外处理
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
    isEnd(){    return false;   }
    onCancel(){}
}

function GetActionOrder(action = null){
    return action.order;
}

function GetActionState(action = null){
    return action.state;
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


export {
    Action, GetActionOrder, GetActionState, SetActionState, IsActionStart, IsActionEnd
}