import { Action } from "./base";
import { GetGameUnitByClz } from "../../director/utils/unit";
import { GetUnitVec } from "../../foundation/unit/base";

class MoveAction extends Action{
    constructor(entityId = 0, dx = 0, dy = 0){
        super(entityId);
        this.dx = dx;
        this.dy = dy;
    }
    onStart(){
        this._vec = GetUnitVec(
            GetGameUnitByClz(this));
    }
    onUpdate(dt = 0){
        this._vec.x += this.dx;
        this._vec.y += this.dy;
    }
}

function NewMoveAction(entityId = 0, dx = 0, dy = 0) {
    if(dx == 0 && dy == 0){
        //log here
        return null;
    }
    return new MoveAction(entityId, dx, dy);
}

export{
    NewMoveAction
}