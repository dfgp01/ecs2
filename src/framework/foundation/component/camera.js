
/**
 * 摄像机抽象类
 * 目前，Camera即是RectPosTuple，只是其offset=0而已
 * 后续可能会增加新属性，先用个类来做
 */
class AbstractCamera {
    constructor(rectPosTuple = null, screenOffset = null){
        this.rectPosTuple = rectPosTuple;
        this.screenOffset = screenOffset;   //屏幕左上角偏移量
    }
}