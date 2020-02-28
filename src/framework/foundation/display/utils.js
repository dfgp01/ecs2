/**
 * 绘制图形
 * @param {*} displayObject 
 * @param {*} x 屏幕坐标x
 * @param {*} y 屏幕坐标y
 */
function DrawDisplayObject(x = 0, y = 0, displayObject = null, engine = null){
    displayObject.updatePos(x, y);
    displayObject.draw(engine);
}