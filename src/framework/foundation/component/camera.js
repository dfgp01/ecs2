import { GameObject } from "./ecs";
import { GetUnitPos, NewUnit } from "../unit/base";
import { GetRectPosCenter, NewRectOffsetRelation, GetRectPosStart, GetRectOffsetRelationRect } from "../unit/rect";
import { GetRectWidth, GetRectHeight, NewPos, NewRect } from "../structure/geometric";
import { NewRectORStart } from "../utils/rect";


/**
 * 摄像机抽象类
 *  因为目前只需要处理简单的逻辑，所以直接由AbstractCamera处理
 *  等以后遇到逻辑分叉点，再用子类实现
 */
class AbstractCamera extends GameObject {
    constructor(unit = null, rectOR = null){
        super();
        this.unit = unit;
        this.rectOR = rectOR;
    }

    getPos(){}
    getStartPos(){}
    getWidth(){}
    getHeight(){}

    toCameraPos(pos = null){}
    toCameraStartPos(pos = null){}

    //显示比例
    setScale(scale = 1){}

    //替换全部特效
    setEffects(effects = null){}

    //增加特效
    addEffect(effect = null){}

    //移除特效
    removeEffect(effect = null){}
}


function NewCamera(x = 0, y = 0, width = 0, height = 0){
    return new AbstractCamera(
        NewUnit(NewPos(x, y)), NewRectOffsetRelation(NewRect(width, height)));
}

function GetCameraPos(camera = null){
    return GetUnitPos(camera.unit);
}

function GetCameraStartPos(camera = null){
    return NewRectORStart(camera.unit, camera.rectOR);
}

function GetCameraWidth(camera = null){
    return GetRectWidth(GetRectOffsetRelationRect(camera.rectOR));
}

function GetCameraHeight(camera = null){
    return GetRectHeight(GetRectOffsetRelationRect(camera.rectOR));
}

export {
    AbstractCamera, NewCamera,
    GetCameraPos, GetCameraStartPos, GetCameraWidth, GetCameraHeight
}