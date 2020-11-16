import { Action, CancelAction, RunAction } from "./base";

/**
 * 当时间到达时才执行
 */
class TimeoutAction extends Action {
    constructor(entityId = 0, duration = 0, action = null){
        super(entityId);
        this.duration = duration;
        this.action = action;
        this._pass = 0;
    }
    onStart(){
        this._pass = 0;
    }
    onUpdate(dt = 0){
        this._pass += dt;
    }
    endCondition(){
        return this._pass >= this.duration
    }
    onEnd(){
        //时间到，执行action，这里不需要实现onCancel，因为被中断后会移出actionlist，不会执行this.action
        RunAction(this.action);
    }
}

function NewTimeoutAction(entityId = 0, duration = 0, action = null){
    return new TimeoutAction(entityId, duration, action);
}


/**
 * 持续执行一段时间
 */
class DurationAction extends TimeoutAction {
    onStart(){
        super.onStart();
        RunAction(this.action);
    }
    onEnd(){
        CancelAction(this.action);
    }
    onCancel(){
        CancelAction(this.action);
    }
}

function NewDurationAction(entityId = 0, duration = 0, action = null){
    return new DurationAction(entityId, duration, action);
}

export{
    NewTimeoutAction, NewDurationAction
}