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
    let c = options.datas[0];
    return NewCamera(c['x'], c['y'], width, height);
}

function ToCameraStartPos(camera = null, pos = null){
    return ToLocatePos(
        pos, GetCameraStart(camera));
}

export {
    CreateCameraWithData,
    ToCameraStartPos
}