
/**
 * 渲染系统，逻辑步骤：
 * 1.   清除画布
 * 2.   重定位摄像机
 * 3.   计算单位显示矩形是否在摄像机矩形内
 * 4.   转换为画布坐标
 * 5.   画出图像
 */
class RenderUpdateSystem extends System {
    onUpdate(dt = 0){
        Clear();
        LinkIterator(GetDisplayList(), displayTuple => {
            let pos = GetPos(displayTuple.entityId);
            UpdateRectPosByUnit(displayTuple.displayArea, pos.x, pos.y);
            DrawFrame(displayTuple.spriteFrame, displayTuple.pos);
        });
    }
}

var renderSys = null;
function GetRenderUpdateSystem(){
    if(!renderSys){
        renderSys = new RenderUpdateSystem();
    }
    return renderSys;
}

class LayerRenderUpdateSystem extends System {
    onUpdate(dt = 0){
        Clear();
        LinkIterator(GetDisplayList(), layer => {
            switch(layer.type){
                case TypeNormal:
                    break;
                case TypeISOmetric:
                    break;
            }
            LinkIterator(layer.list, displayTuple => {

            });
        });
    }
}

export {GetRenderUpdateSystem}