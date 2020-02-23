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
 * options = {
 *      type : 0,
 *      x : 0, y : 0, width : 0, height : 0
 * }
 */
function CreateCameraWithData(options = null){
    if(!options){
        return null;
    }
    let width = options['width'];
    let height = options['height'];
    if(!width || !height){
        return null;
    }
    return NewCamera(
        options['x'], options['y'],
        width, height
    );
}

export {
    CreateAnimateWithData, CreateCameraWithData, CreateTileMapWithData
}