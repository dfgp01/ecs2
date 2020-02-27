import { Component } from "../../foundation/structure/ecs";
import { IsPosInRect } from "../../foundation/geometric/rect";

/**
 * 临时命名，未确定目录规划
 * Selectable相关
 */

 /**
  * area is RectPosTuple
  */
class TouchableComponent extends Component {
    constructor(entityId = 0, area = null){
        super(entityId);
        this.area = area;
    }
}

class DraggableComponent extends Component {
    constructor(entityId = 0){
        super(entityId);
    }
}

class TouchSystem extends System {
    onUpdate(dt = 0){
        if(!touchFlag){
            return false;
        }
        let t = getTouchProperties();
        GetTouchableList().iteratorReverse(tuple => {
            if(IsPosInRect(t.worldPos, tuple.area)){
                onTouchCallback(t, tuple);
                return;
                //break;
            }
        });
    }
}