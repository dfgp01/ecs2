import { NewDurationAction } from "./time/duration";
import { NewTimeoutAction } from "./time/timeout";

/**
 * 创建序列帧动画
 * animateData = {
 *  type : 0,
 *  frames : [
 *      {
 *          duration : 0,
 *          xOffset : 0,
 *          yOffset : 0
 *      }
 *  ]
 * }
 */
function CreateAnimateWithData(animateData = null){
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
            CreateAnimateFrame(getSpriteFrameByName(spriteFrameName),
                frameData['duration'], frameData['xOffset'], frameData['yOffset']));
    });
    return CreateAnimateAction(animateData['type'], entityId, animateFrames);
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