var currCamera = null;

function SetCamera(cameraObj = null){
    currCamera = cameraObj;
}

function GetCamera(){
    return currCamera;
}

/**
 * 摄像机抽象类
 */
class AbstractCamera {
    constructor(pos = null, width = 0, height = 0){
        this.pos = pos;
        this.width = width;
        this.height = height;
    }

    toCameraPos(pos = null){}
}