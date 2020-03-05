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
    width = width ? width : 400;
    let height = options['height'];
    height = height ? height : 400;
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
            return null;
    }

    //注册按键回调
    if(options.keyDownHandler && options.keyUpHanler){
        engine.onKeyCallback(options.keyDownHandler, options.keyUpHanler);
    }
    if(options.mousedownHandler && options.mouseupHandler){
        engine.onMouseCallback(options.mousedownHandler, options.mouseupHandler);
    }
    return engine;
}

export {
    CreateEngineWithData
}