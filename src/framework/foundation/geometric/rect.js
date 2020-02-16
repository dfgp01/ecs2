import { NewPos, NewVec } from "./point";


/**
 * 2D基础矩形，只有宽高
 * width, height : 宽高
 */
class Rectangle {
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }
}

/**
 * 矩形默认居中于owner
 * 此方法一般由collider调用
 */
function NewRect(width = 0, height = 0){
    if(width==0 || height==0){
        return null;
    }
    return new Rectangle(width, height);
}

function UpdateRectSize(rect = null, width = 0, height = 0){
    rect.width = width;
    rect.height = height;
}


function GetRectWidth(rect = null){
    return rect.width;
}
function GetRectHeight(rect = null){
    return rect.height;
}
function GetRectHalfWidth(rect = null){
    return rect.width * 0.5;
}
function GetRectHalfHeight(rect = null){
    return rect.height * 0.5;
}


//求面积
function GetArea(rect = null){
    return rect.width * rect.height;
}


export {
    NewRect, UpdateRectSize,
    GetRectWidth, GetRectHalfWidth, GetRectHeight, GetRectHalfHeight,
    GetArea
}