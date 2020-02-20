
var currEngine = null;

function SetEngine(engineObj = null){
    currEngine = engineObj;
}

function GetEngine(){
    return currEngine;
}

/**
 * 外部引擎抽象类
 */
class AbstractEngine {
    constructor(fps = 60){
        this.fps = fps;
        this.tick = 1000 / fps;
    }
    clear(){}
    drawFrame(spriteFrame = null, cameraPos = null){}
    drawRect(rect = null, cameraPos = null){}
    drawLine(line = null, cameraPos = null){}
    drawCircle(radius = 0, cameraPos = null){}

    loadResource(imgSrc = "", onLoadCallback = null){}

    onKeyCallback(keyDownCallback = null, keyUpCallback = null){}
    onMouseCallback(mousedownCallback = null, mouseupCallback = null){}
    start(onEnterFrameCallback = null){}
}

export {
    SetEngine, GetEngine, AbstractEngine
}