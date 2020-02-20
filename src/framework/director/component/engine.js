
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

    //清除画布
    clear(){}

    //画帧
    drawFrame(spriteFrame = null, cameraPos = null){}

    //画矩形, rect是基础矩形
    drawRect(rect = null, cameraPos = null){}

    //画线段，line.vec是基础向量
    drawLine(line = null, cameraPos = null){}

    //画圆，circle.radius是基础半径
    drawCircle(circle = null, cameraPos = null){}

    //imgSrc是图像地址
    loadResource(imgSrc = "", onLoadCallback = null){}

    onKeyCallback(keyDownCallback = null, keyUpCallback = null){}
    onMouseCallback(mousedownCallback = null, mouseupCallback = null){}
    start(onEnterFrameCallback = null){}
}

export {
    SetEngine, GetEngine, AbstractEngine
}