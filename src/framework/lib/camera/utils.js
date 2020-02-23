
/**
 * options = {
 *      type : 0,
 *      x : 0,
 *      y : 0,
 *      offset-x : 0,
 *      offset-y : 0,
 *      width : 0,
 *      height : 0
 * }
 */
function CreateCameraWithData(options = null, screen = null){
    options = options || {};
    let pos = NewPos(options['x'], options['y']);
    let screenOffset = NewPos(options['offset-x'], options['offset-y']);
    return CreateCamera(screen, 
        options['type'], options['width'], options['height'],
        pos, screenOffset);
}

function CreateCamera(screen = null, type = 0, width = 0, height = 0, pos = null, screenOffset = null){
    let sWidth = GetRectWidth(screen);
    let sHeight = GetRectHeight(screen);
    width = width <= 0 || width > sWidth ? sWidth : width;
    height = height <= 0 || height > sHeight ? sHeight : height;
    pos = pos ? pos : NewPos();
    screenOffset = screenOffset ? screenOffset : NewPos();
    return newCamara(type, pos, screenOffset, width, height);
}