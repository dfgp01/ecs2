import { ToLocatePos } from "../../foundation/structure/geometric";
import { NewCamera, GetCameraPos, GetCameraStartPos } from "../../foundation/component/camera";
import { GetScreenWidth, GetScreenHeight } from "../../director/service/resource";

/**
 * camera = {
 *      x : 0, y : 0,
 *      width : 800, height : 800
 * }
 */
function CreateCameraWithData(options = null){
    options = options ? options : {};
    let x = options['x'];
    let y = options['y'];
    let width = options['width'];
    let height = options['height'];
    width = width ? width : GetScreenWidth();
    height = height ? height : GetScreenHeight();
    return NewCamera(x, y, width, height);
}

function ToCameraPos(camera = null, pos = null){
    return ToLocatePos(
        pos, GetCameraPos(camera));
}

function ToCameraStartPos(camera = null, pos = null){
    return ToLocatePos(
        pos, GetCameraStartPos(camera));
}

export {
    CreateCameraWithData,
    ToCameraPos, ToCameraStartPos
}