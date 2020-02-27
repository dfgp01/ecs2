
/**
 * 摄像机抽象类
 */
class AbstractCamera {
    constructor(pos = null, screenOffset = null, width = 0, height = 0){
        this.pos = pos;
        this.screenOffset = screenOffset;   //屏幕左上角偏移量
        this.width = width;
        this.height = height;
    }

    toCameraPos(pos = null){}
    toWorldPos(cameraPos = null){}
}

/**
 * 全局摄像机对象
 */
var camera = null;
function SetCamera(cameraObj = null){
    camera = cameraObj;
}

function GetCamera(){
    return cameras;
}