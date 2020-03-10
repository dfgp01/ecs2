import { NewH5Engine } from "./web/model";

const EngineWeb = 0;

/**
 * @param {*} options
 * {
 *      type : 0,
 *      width : 400,
 *      height : 400,
 *      fps : 60,
 *      keyDownHandler : func,
 *      keyUpHanler : func,
 *      mousedownHandler : func,
 *      mouseupHandler : func
 * }
 */
function CreateEngineWithData(options = null){
    //默认值
    options = options ? options : {};
    let width = options['width'];
    width = width ? width : 800;
    let height = options['height'];
    height = height ? height : 800;
    let fps = options['fps'];
    fps = fps ? fps : 60;
    let type = options['type'];
    type = type ? type : EngineWeb;

    let engine = null;
    switch(type){
        case EngineWeb:
            engine = NewH5Engine(width, height, fps);
            break;
        default:
            //error log
            console.error("error type");
            return null;
    }
    return engine;
}

export {
    CreateEngineWithData
}