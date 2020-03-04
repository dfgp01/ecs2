import { NewRectPosRelation } from "../../foundation/offset/rect";

/**
 * 摄像机抽象类
 * 目前，Camera即是RectPosTuple，只是其offset=0而已
 * 后续可能会增加新属性，先用个类来做
 */
class BaseCamera {
    constructor(rectPosRel = null, screenOffset = null){
        this.rectPosRel = rectPosRel;
        this.screenOffset = screenOffset;   //屏幕左上角偏移量
    }
}

function NewCamera(x = 0, y = 0, width = 0, height = 0){
    let pos = NewPos(x, y);
    let rp = NewRectPosRelation(pos, null, NewRect(width, height));
    return new BaseCamera(rp);
}

export {
    NewCamera
}