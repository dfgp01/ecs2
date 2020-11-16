import { Action, CancelAction, IsActionEnd, IsActionStart, RunAction } from "./base";

/**
 * 线性动作
 */
class ListAction extends Action {
    constructor(entityId = 0, order = 0, actions = null){
        super(entityId, order);
        this.actions = actions;
        this._index = 0;
    }
    onStart(){
        this._index = 0;
        this._curr = this.actions[0];
        RunAction(this._curr);
    }
    onUpdate(){
        if(IsActionEnd(this._curr)){
            this._index++;
            if(this._index < this.actions.length){
                this._curr = this.actions[this._index];
                RunAction(this._curr);
            }
        }
    }
    endCondition(){
        return this._index >= this.actions.length;
    }
    onCancel(){
        CancelAction(this._curr);
    }
}

function NewListAction(entityId = 0, actions = null){
    actions = actions ? actions : [];
    return new ListAction(entityId, 0, actions);
}

function AddToListAction(listAction = null, action = null){
    listAction.actions.push(action);
}


/**
 * 并行动作，仅当所有action都end了，自身才end
 */
class ParallelAction extends Action {
    constructor(entityId = 0, actions = null){
        super(entityId);
        this.actions = actions;
    }
    onStart(dt = 0){
        this.actions.forEach(action => {
            RunAction(action);
        });
    }
    endCondition(){
        this.actions.forEach(action => {
            if(IsActionStart(action)){
                return false;
            }
        });
        return true;
    }
    onCancel(){
        this.actions.forEach(action => {
            CancelAction(action);
        });
    }
}

function NewParallelAction(entityId = 0, actions = null){
    if(!actions || actions.length == 0){
        return;
    }
    return new ParallelAction(entityId, actions);
}

/**
 * 重复动作
 */
class RepeatAction extends Action {
    constructor(entityId = 0, count = 1, action = null){
        super(entityId);
        this.count = count;
        this.action = action;
        this._times = 0;
    }
    onStart(){
        this._times = 0;
        RunAction(this.action);
    }
    onUpdate(dt = 0){
        if(IsActionEnd(this.action)){
            this._times++;
            RunAction(this.action);
        }
    }
    endCondition(){
        return this.count >= 0 && this._times >= this.count;
    }
    onCancel(){
        CancelAction(this.action);
    }
}

function NewRepeatAction(entityId = 0, times = 0, action = null){
    if(times == 0 || !action){
        return null;
    }
    return new RepeatAction(entityId, times, action);
}

function NewRepeatForeverAction(entityId = 0, action = null){
    return NewRepeatAction(entityId, -1, action);
}

export{
    NewListAction, AddToListAction, NewParallelAction,
    NewRepeatAction, NewRepeatForeverAction
}