const { RunAction, StopAction } = require("../../../director/utils/action");
const { Action, IsActionEnd } = require("../../../foundation/component/action");

class ListAction extends Action {
    constructor(entityId = 0, order = 0){
        super(entityId, order);
        this.actions = [];
        this._index = 0;
    }
    onStart(){
        this._index = 0;
        this._curr = this.actions[0];
        RunAction(this._curr);
    }
    onUpdate(){
        if(this._index >= this.actions.length){
            return;
        }
        if(IsActionEnd(this._curr)){
            this._index++;
            if(this._index < this.actions.length){
                this._curr = this.actions[this._index];
                RunAction(this._curr);
            }
        }
    }
    isEnd(){
        return this._index >= this.actions.length && IsActionEnd(this._curr);
    }
    onCancel(){
        StopAction(this._curr);
    }
}

function NewListAction(entityId = 0, order = 0){
    return new ListAction(entityId, order);
}

function AddToListAction(listAction = null, action = null){
    listAction.actions.push(action);
}

export{
    NewListAction, AddToListAction
}