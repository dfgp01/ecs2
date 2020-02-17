
var currEngine = null;

function SetEngine(engineObj = null){
    currEngine = engineObj;
}

function GetEngine(){
    return engineObj;
}

/**
 * 外部引擎抽象类
 */
class Engine {
    constructor(){}
    drawFrame(spriteFrame = null, cameraPos = null){}
    drawRect(rect = null, cameraPos = null){}
    drawLine(line = null, cameraPos = null){}
    drawCircle(radius = 0, cameraPos = null){}
}

function DrawFrame(spriteFrame = null, x = 0, y = 0, width = 0, height = 0){
    let textureArea = spriteFrame.textureArea;
    drawImage(spriteFrame.bitmapData,
        textureArea.x, textureArea.y, textureArea.width, textureArea.height,
        x, y , width, height);
}

/**
 * TODO 以后要变为rectPosTuple
 */
function DrawRect(x = 0, y = 0, width = 0, height = 0){
    let rect = NewRect(0, 0, width, height);
    UpdateRectCenterPos(rect, x, y);
    drawRectInCamera(rect);
}

function DrawLine(x1 = 0, y1 = 0, x2 = 0, y2 = 0){
    drawLine(x1, y1, x2, y2);
}

function DrawCircle(x = 0, y = 0, radius = 0){
    drawCircle(x, y, radius);
}