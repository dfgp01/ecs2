
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

class LayerRenderUpdateSystem extends System {
    onUpdate(dt = 0){
        Clear();
        //也可以直接在这里搞多个摄像机
        GetCameras().forEach(camera => {
            UpdateCameraPosStart(camera);
            LinkIterator(GetLayerList(), layer => {
                LinkIterator(layer.list, displayTuple => {
                    if(displayTuple.renderCom.isometric){
                        drawIso(camera, displayTuple);
                    }else{
                        draw(camera, displayTuple);
                    }
                });
            });
        });
    }
}

function GetRenderUpdateSystem(){
    if(!renderSys){
        renderSys = new LayerRenderUpdateSystem();
    }
    return renderSys;
}

function drawIso(camera = null, displayTuple = null){
    let cPosStart = GetCameraPosStart(camera);
    let pos = displayTuple.unitPos;
    let offset = displayTuple.offset;
    let isoX = (pos.x - pos.y) * 0.5 + offset.x;
    let isoY = (pos.x + pos.y) * 0.5 + offset.y;
    let cameraPos = toLocatePos(isoPos, cPosStart);
    displayTuple.displayObject.draw(GetEngine(), cameraPos.x, cameraPos.y);
}

function draw(camera = null, displayTuple = null){
    let pos = displayTuple.unitPos;
    let offset = displayTuple.offset;
    let x = pos.x + offset.x;
    let y = pos.y + offset.y;
    let cameraPos = toLocatePos(realPos, cPosStart);
    displayTuple.displayObject.draw(GetEngine(), cameraPos.x, cameraPos.y);
}

export {GetRenderUpdateSystem}