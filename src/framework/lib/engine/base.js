
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
    drawRect(centerPos = null, rect = null){}

    //画线段
    drawLine(centerPos = null, endPos = null){}

    //画圆
    drawCircle(centerPos = null, radius = 0){}

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

function EngineDrawRect(engine = null, centerPos = null, rect = null){
    engine.drawRect(centerPos, rect);
}

function EngineDrawLine(engine = null, startPos = null, endPos = null){
    engine.drawLine(startPos, endPos);
}

function EngineDrawCircle(engine = null, centerPos = null, radius = 0){
    engine.drawCircle(centerPos, radius);
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
    EngineDrawFrame, EngineDrawRect, EngineDrawLine, EngineDrawCircle,
    EngineLoadResource, EngineOnKeyCallback, EngineOnTouchCallback, EngineStart
}