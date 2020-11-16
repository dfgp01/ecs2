import { GameObject } from "./ecs";
import { GetRectWidth, GetRectHeight, NewPos, NewRect, NewVec } from "../structure/geometric";
import { NewGameUnit } from "../../lib/unit/utils";
import { GetUnitPos } from "../../lib/unit/base";
import { NewRectStart } from "../utils/rect";


/**
 * 摄像机抽象类
 *  因为目前只需要处理简单的逻辑，所以直接由AbstractCamera处理
 *  等以后遇到逻辑分叉点，再用子类实现
 */
class AbstractCamera extends GameObject {
    constructor(unit = null, rect = null){
        super();
        this.unit = unit;
        this.rect = rect;
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
        NewGameUnit(NewPos(x, y)), NewRect(width, height));
}

function GetCameraPos(camera = null){
    return GetUnitPos(camera.unit);
}

function GetCameraStartPos(camera = null){
    return NewRectStart(
        GetUnitPos(camera.unit),
        NewVec(),
        camera.rect);
}

function GetCameraWidth(camera = null){
    return GetRectWidth(camera.rect);
}

function GetCameraHeight(camera = null){
    return GetRectHeight(camera.rect);
}

export {
    AbstractCamera, NewCamera,
    GetCameraPos, GetCameraStartPos, GetCameraWidth, GetCameraHeight
}