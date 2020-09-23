
/**
 * 暂定写个新的
 */

const { AbstractCamera } = require("../../foundation/component/camera");
const { NewUnit } = require("../../foundation/unit/base");
const { NewPos, NewRect } = require("../../foundation/structure/geometric");
const { NewRectOffsetRelation } = require("../../foundation/unit/rect");

// class AbstractCamera extends GameObject {
//     constructor(){
//         super();
//     }
//     getPos(){}
//     getStartPos(){}
//     getWidth()
//     getHeight()

//     toCameraPos(pos = null){}
//     toCameraStartPos(pos = null){}
//     setScale(scale = 1){}
//     setEffects(effects = null){}
// }

class NormalCamera extends AbstractCamera {
    constructor(pos = null, rectOR = null){
        super();
        this.unit = NewUnit(pos);
        this.rectOR = rectOR;
    }
}

function NewNormalCamera(x = 0, y = 0, width = 0, height = 0){
    return new NormalCamera(
        NewPos(x, y), NewRectOffsetRelation(NewRect(width, height)));
}