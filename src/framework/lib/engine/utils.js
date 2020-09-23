import { NewH5Engine } from "./web/model";
import { GetScreenWidth, GetScreenHeight } from "../../director/service/resource";

const EngineWeb = 0;

/**
 * @param {*} options
 * {
 *      type : 0,
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
    let fps = options['fps'];
    fps = fps ? fps : 60;
    let type = options['type'];
    type = type ? type : EngineWeb;

    let engine = null;
    switch(type){
        case EngineWeb:
            engine = NewH5Engine(
                GetScreenWidth(), GetScreenHeight(), fps);
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