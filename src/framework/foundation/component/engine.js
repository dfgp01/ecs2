
/**
 * 外部引擎抽象类
 * x, y 都是屏幕坐标，注意
 */
class AbstractEngine {
    constructor(fps = 60){
        this.fps = fps;
        this.tick = 1000 / fps;
    }

    //清除画布
    clear(){}

    //画帧
    drawFrame(centerPos = null, spriteFrame = null){}

    //画矩形
    drawRect(centerPos = null, rect = null, style = 0){}

    //画线段
    drawLine(centerPos = null, endPos = null, style = 0){}

    //画圆
    drawCircle(centerPos = null, radius = 0, style = 0){}

    //文字
    drawText(centerPos = null, content = "", style = 0){}

    //imgSrc是图像地址
    loadResource(imgSrc = "", onLoadCallback = null){}

    start(onEnterFrameCallback = null){}
}

function EngineClear(engine = null){
    engine.clear();
}

function EngineDrawFrame(engine = null, centerPos = null, spriteFrame = null){
    engine.drawFrame(centerPos, spriteFrame);
}

function EngineDrawRect(engine = null, centerPos = null, rect = null, style = 0){
    engine.drawRect(centerPos, rect, style);
}

function EngineDrawLine(engine = null, startPos = null, endPos = null, style = 0){
    engine.drawLine(startPos, endPos, style);
}

function EngineDrawCircle(engine = null, centerPos = null, radius = 0, style = 0){
    engine.drawCircle(centerPos, radius, style);
}

function EngineDrawText(engine = null, centerPos = null, content = "", style = 0){
    engine.drawText(centerPos, content, style);
}

function EngineLoadResource(engine = null, imgSrc = "", onLoadCallback = null){
    engine.loadResource(imgSrc, onLoadCallback);
}

function EngineOnKeyCallback(engine = null, keyDownCallback = null, keyUpCallback = null){
    engine.onKeyCallback(keyDownCallback, keyUpCallback);
}

function EngineOnTouchCallback(engine = null, touchOnCallback = null, touchOverCallback = null){
    engine.onTouchCallback(touchOnCallback, touchOverCallback);
}

function EngineStart(engine = null, onEnterFrameCallback = null){
    engine.start(onEnterFrameCallback);
}

export {
    AbstractEngine, EngineClear, 
    EngineDrawFrame, EngineDrawRect, EngineDrawLine, EngineDrawCircle, EngineDrawText,
    EngineLoadResource, EngineOnKeyCallback, EngineOnTouchCallback, EngineStart
}