
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
        console.error("createScreen error. options is null");
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

var cameras = null;
function AddCamera(cameraObj = null){
    cameras.push(cameraObj);
}

function GetCameras(){
    return cameras;
}

const SingleCamera = 0;
const TwinCameraHorizontal = 1;
const TwinCameraVerticle = 2;
const FourCamera = 3;
function CreateCameraWithData(style = 0, screenWidth = 0, screenHeight = 0){

}

function CreateCamera(pos = null, screenOffset = null, width = 0, height = 0){
    pos = pos ? pos : NewPos();
    screenOffset = screenOffset ? screenOffset : NewPos();
    return new ISOmetricCamera(pos, screenOffset, width, height);
}