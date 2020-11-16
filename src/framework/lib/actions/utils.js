import { GetSpriteFrame } from "../../director/utils/view";
import { ANIMATE_TYPE_NORMAL, ANIMATE_TYPE_REPEAT, CreateNormalAnimate, CreateRepeatAnimate, NewDisplayFrame } from "./animate";
import { NewDurationAction, NewTimeoutAction } from "./time";

/**
 * 创建序列帧动画
 * animateData = {
 *  type : 0,
 *  frames : [
 *      {
 *          name : "hero_run_1",
 *          duration : 0,
 *          offset-x : 0,
 *          offset-y : 0
 *      }
 *  ]
 * }
 */
function CreateAnimateWithData(entityId = 0, animateData = null){
    if(!animateData){
        return null;
    }
    
    let framesData = animateData['frames'];
    if(!framesData || framesData.length == 0){
        return null;
    }

    let animateFrames = [];
    framesData.forEach(frameData => {
        animateFrames.push(
            NewDisplayFrame(
                GetSpriteFrame(frameData['name']), 
                frameData['offset-x'], frameData['offset-y'], frameData['duration'])
        );
    });

    let type = animateData['type'];
    switch(type){
        case ANIMATE_TYPE_NORMAL:
            return CreateNormalAnimate(entityId, animateFrames);
        case ANIMATE_TYPE_REPEAT:
            return CreateRepeatAnimate(entityId, animateFrames);
        default:
            return CreateNormalAnimate(entityId, animateFrames);
    }
}


/**
 * 创建timeout动作
 * @param {*} entityId 
 * @param {*} duration 
 * @param {*} action 
 */
function CreateTimeoutAction(entityId = 0, duration = 0, action = null){
    if(duration <= 0 || !action){
        return null;
    }
    return NewTimeoutAction(entityId, duration, action);
}

/**
 * 创建duration动作
 * @param {*} entityId 
 * @param {*} duration 
 * @param {*} action 
 */
function CreateDurationAction(entityId = 0, duration = 0, action = null){
    if(duration <= 0 || !action){
        return null;
    }
    return NewDurationAction(entityId, duration, action);
}

export {
    CreateAnimateWithData, CreateTimeoutAction, CreateDurationAction
}