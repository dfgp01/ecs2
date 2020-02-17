/**
 * 基础2D坐标
 */
class Pos {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

function NewPos(x = 0, y = 0){
    return new Pos(x, y);
}

/**
 * 计算相对坐标
 * 以targetPos为准，计算referPos于targetPos的相对坐标
 * 举例：
 *      摄像机位于(50, 50)处，referPos
 *      单位A位于(120, 30)处，targetPos
 *      那么，单位A在摄像机的(120-50, 30-50)处
 */
function ToLocatePos(targetPos = null, referPos = null){
    return NewPos(
        targetPos.x - referPos.x,
        targetPos.y - referPos.y);
}

/**
 * 基础向量
 * distance: 距离系数，注意不是实际距离，只用于比较距离大小
 */
class Vec {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
        this.distance = x * x + y * y;
    }
}

function NewVec(x = 0, y = 0){
    if(x==0 && y==0){
        return null;
    }
    return new Vec(x, y);
}

function NewVecWithPos(posStart = null, posEnd = null){
    return new NewVec(posEnd.x - posStart.x, posEnd.y - posStart.y);
}

function UpdateVec(vec = null, posStart = null, posEnd = null){
    vec.x = posEnd.x - posStart.x;
    vec.y = posEnd.y - posStart.y;
    vec.distance = vec.x * vec.x + vec.y * vec.y;
}

/**
 * 距离系数
 * 注意，并非实际距离值，因为开根号计算消耗大
 * 若只用于对比大小，此系数即可
 */
function GetDistance(vec = null){
    return vec.distance;
}


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

/**
 * 圆形
 */
class Circle {
    constructor(radius = 0) {
        this.radius = radius;
    }
}

function NewCircle(radius = 0){
    if(radius == 0){
        return null;
    }
    return new Circle(radius);
}

function UpdateCircle(circle = null, radius = 0){
    circle.radius = radius;
}

export {
    NewPos, ToLocatePos, 
    NewVec, NewVecWithPos, UpdateVec, GetDistance,
    NewRect, UpdateRectSize, GetRectWidth, GetRectHalfWidth, GetRectHeight, GetRectHalfHeight, GetArea,
    NewCircle, UpdateCircle
}