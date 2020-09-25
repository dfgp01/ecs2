import { RunAction, StopAction } from "../../../director/utils/action";
import { TimeoutAction } from "./timeout";

/**
 * 持续执行一段时间
 */
class DurationAction extends TimeoutAction {
    onStart(){
        super.onStart();
        RunAction(this.action);
    }
    onEnd(){
        StopAction(this.action);
    }
    onCancel(){
        StopAction(this.action);
    }
}

function NewDurationAction(entityId = 0, duration = 0, action = null){
    return new DurationAction(entityId, duration, action);
}

export {
    NewDurationAction
}