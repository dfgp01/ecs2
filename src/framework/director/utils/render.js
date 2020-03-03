
/**
 * 清除画布
 */
function Clear(){
    EngineClear(getEngine());
}

/**
 * TODO 可能会改成spriteFrameId参数
 */
function DrawFrame(pos = null, spriteFrame = null){
    DrawFrameInCamera(
        getDefaultCamera(), pos, spriteFrame);
}

function DrawFrameInCamera(camera = null, pos = null, spriteFrame = null){
    let cPos = ToCameraPos(camera, pos);
    EngineDrawSpriteFrame(getEngine(),
        cPos.x, cPos.y, spriteFrame);
}

function DrawRect(pos = null, width = 0, height = 0){
    DrawRectInCamera(
        getDefaultCamera(), pos, width, height);
}

function DrawRectInCamera(camera = null, pos = null, width = 0, height = 0){
    let cPos = ToCameraPos(camera, pos);
    EngineDrawRect(getEngine(),
        cPos.x, cPos.y, width, height);
}

function DrawLine(pos = null, vec = null){
    DrawLineInCamera(
        getDefaultCamera(), pos, vec);
}

function DrawLineInCamera(camera = null, pos = null, vec = null){
    let cPos = ToCameraPos(camera, pos);
    let cPos2 = ToCameraPos(camera, NewPos(pos.x + vec.x, pos.y + vec.y));
    EngineDrawLine(getEngine(),
        cPos.x, cPos.y, cPos2.x, cPos2.y);
}

function DrawCircle(circle = null){
    GetEngine().drawCircle(
        circle,
        GetCamera().toCameraPos(
            GetCirclePosStart(circle)));
}

export{
    Clear, DrawFrame, DrawFrameInCamera,
    DrawRect, DrawRectInCamera, DrawLine, DrawLineInCamera
}