import { Component, GameObject } from "../../foundation/structure/ecs";
import { PushToLink, GetLinkData, RemoveByKeyId, NewLink } from "../../foundation/structure/link";
import { NewRectPosTuple } from "../pos/rect/component";
import { NewRect } from "../../foundation/geometric/rect";
import { GetSpriteFrameWidth, GetSpriteFrameHeight } from "../../foundation/structure/frame";
import { GetPos } from "../pos/utils";


/**
 * 显示组件，包含一些显示参数
 */
class RenderComponent extends Component {
	constructor(entityId = 0, angle = 0, scale = 1) {
        super(entityId);
        this.angle = angle;
        this.scale = scale;
	}
}


var renderComs = NewLink();

/**
 * options : {
 *      angle : 180,
 *      scale : 0.5
 * }
 */
function createRenderComponent(entityId = 0, options = null) {
    //默认值
    options = options ? options : {};
    let com = new RenderComponent(entityId, options.angle, options.scale);
    PushToLink(renderComs, com);
    return com;
}

function GetRenderComponent(entityId = 0, options = null) {
    let com = GetLinkData(renderComs, entityId);
    return com ? com : createRenderComponent(entityId, options);
}

export {
    GetRenderComponent
}