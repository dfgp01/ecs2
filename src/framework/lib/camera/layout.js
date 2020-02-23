
const LayoutSingleCamera = 0;
const LayoutTwinCameraHorizontal = 1;
const LayoutTwinCameraVertical = 2;
const LayoutFourCamera = 3;

type = 0, pos = null, screenOffset = null, width = 0, height = 0

/**
 * 单屏
 * @param {*} sceen 
 * @param {*} type 
 * @param {*} pos 
 */
function createSingleCamera(sceen = null, type = 0, pos = null){
    return newCamera(type, pos, null,
        GetRectWidth(sceen), GetRectHeight(sceen));
}

/**
 * 左右分屏
 * TODO 未完成
 */
class LeftRightCamera extends AbstractCamera {
    constructor(left = null, right = null){
        super(pos, screenOffset, width, height);
        this.left = left;
        this.right = right;
    }
    toCameraPos(pos = null){
        return ToLocatePos(pos, this.pos);
    }
}

function createTwinCameraHorizontal(sceen = null, type1 = 0, type2 = 0){
    let width = GetRectWidth(sceen);
    let height = GetRectHeight(sceen);
    return new LeftRightCamera(
        newCamera(type1, pos, null, width * 0.5, height),
        newCamera(type2, pos, NewPos(width * 0.5, 0), width * 0.5, height)
    );
}

/**
 * 上下分屏
 * TODO 未完成
 */
class UpDownCamera extends AbstractCamera {
    constructor(up = null, down = null){
        super(pos, screenOffset, width, height);
        this.up = up;
        this.down = down;
    }
    toCameraPos(pos = null){
        return ToLocatePos(pos, this.pos);
    }
}

function createTwinCameraVertical(sceen = null, type1 = 0, type2 = 0){
    let width = GetRectWidth(sceen);
    let height = GetRectHeight(sceen);
    return new LeftRightCamera(
        newCamera(type1, pos, null, width, height * 0.5),
        newCamera(type2, pos, NewPos(0, height * 0.5), width, height * 0.5)
    );
}