
/**
 * 屏幕对象，暂时放这
 */
var screen = null;
function GetScreen(options = null){
    if(!screen){
        screen = createScreen(options);
    }
    return screen;
}

/**
 * 
 * @param {*} options {width: 0, height: 0}
 */
function createScreen(options = null){
    if(!options){
        console.error("ptions is null");
    }
    return NewRect(
        options['width'], options['height']
    );
}


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
}

var camera = null;
function SetCamera(cameraObj = null){
    camera = cameraObj;
}

function GetCamera(){
    return cameras;
}