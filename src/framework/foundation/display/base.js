/**
 * 显示对象抽象接口
 * x, y 都是屏幕坐标/摄像机坐标，因为显示对象与“世界/舞台”无关
 */
class DisplayObject {
    draw(engine = null, x = 0, y = 0){}
}

export {
    DisplayObject
}