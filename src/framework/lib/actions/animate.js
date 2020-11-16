import { NewVec } from "../../foundation/structure/geometric";
import { GetGameUnitById } from "../unit/utils";
import { AddNewDisplayer, RemoveDisplayer } from "../view/utils";
import { Action } from "./base";
import { NewDurationAction } from "./time";
import { NewListAction, NewRepeatForeverAction } from "./wrap";

export const ANIMATE_TYPE_NORMAL = 0;
export const ANIMATE_TYPE_REPEAT = 1;
export const ANIMATE_TYPE_STOP_LAST = 2;
export const ANIMATE_TYPE_GOTO_FIRST = 3;



/**
 * 动画帧VO而已、叫AnimateFrame或DisplayFrame
 */
class DisplayFrame {
    constructor(spriteFrame = null, offset = null, duration = 0) {
        this.spriteFrame = spriteFrame;
        this.offset = offset;
        this.duration = duration;
    }
}

function NewDisplayFrame(spriteFrame = null, xOffset = 0, yOffset = 0, duration = 0){
    return new DisplayFrame(
        spriteFrame, NewVec(xOffset, yOffset), duration);
}

/**
 * 只是显示帧而已
 */
class SetFrameAction extends Action {
    constructor(entityId = 0, spriteFrame = null, offset = null){
        super(entityId);
        this.spriteFrame = spriteFrame;
        this.offset = offset;
    }
    onStart(){
        this._ds = AddNewDisplayer(this.entityId, this.spriteFrame, this.offset);
    }
    onEnd(){
        RemoveDisplayer(this._ds);
    }
    onCancel(){
        RemoveDisplayer(this._ds);
    }
}

function CreateNormalAnimate(entityId = 0, animateFrames = null){
    let actions = [];
    animateFrames.forEach(displayFrame => {
        actions.push(
            NewDurationAction(entityId, displayFrame.duration,
                new SetFrameAction(entityId, displayFrame.spriteFrame, displayFrame.offset)))
    });
    return NewListAction(entityId, actions);
}

function CreateRepeatAnimate(entityId = 0, animateFrames = null){
    return NewRepeatForeverAction(entityId, 
        CreateNormalAnimate(entityId, animateFrames));
}

export{
    NewDisplayFrame, CreateNormalAnimate, CreateRepeatAnimate
}