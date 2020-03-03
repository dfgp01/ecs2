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

export {
    CreateAnimateWithData, CreateCameraWithData, CreateTileMapWithData
}