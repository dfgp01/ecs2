
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
    drawFrame(x = 0, y = 0, spriteFrame = null){}

    //画矩形
    drawRect(x = 0, y = 0, width = 0, height = 0){}

    //画线段
    drawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0){}

    //画圆
    drawCircle(x = 0, y = 0, radius = 0){}

    //imgSrc是图像地址
    loadResource(imgSrc = "", onLoadCallback = null){}

    onKeyCallback(keyDownCallback = null, keyUpCallback = null){}
    onMouseCallback(mousedownCallback = null, mouseupCallback = null){}
    start(onEnterFrameCallback = null){}
}

export {
    AbstractEngine
}