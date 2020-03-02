/**
 * 绘制图形
 * @param {*} displayObject 
 * @param {*} x 屏幕坐标x
 * @param {*} y 屏幕坐标y
 */
function DrawDisplayObject(displayObject = null, engine = null, x = 0, y = 0){
    //displayObject.updatePos(x, y);
    displayObject.draw(engine, x, y);
}