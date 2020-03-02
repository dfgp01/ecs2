
/**
 * 摄像机抽象类
 */
class AbstractCamera {
    constructor(rectPosTuple = null, screenOffset = null){
        this.rectPosTuple = rectPosTuple;
        this.screenOffset = screenOffset;   //屏幕左上角偏移量
    }
}