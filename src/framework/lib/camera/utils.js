/**
 * options = {
 *      style : 0,
 *      datas : [
 *          {
 *              x : 0, y : 0,  
 *              //扩展：offset-x : 0, offset-y : 0, width : 0, height : 0
 *          }
 *      ]
 * }
 */
function CreateCameraWithData(options = null, width = 0, height = 0){
    //默认值
    options = options ? options : {
        style : 0,
        datas : [{x : 0, y : 0}]
    };
    //TODO
    return NewCamera(
        options['x'], options['y'],
        width, height
    );
}

function DrawInCamera(camera = null, engine = null, displayObject = null, unitPos = null){
    //TODO in each camera
    //camera.draw(); ==> 包含以下代码
    let cPos = toLocatePos(unitPos, camera.pos);
    DrawDisplayObject(displayObject, engine, cPos.x, cPos.y);
}

//-------------------- 下面是旧的，步子不要扯太大

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