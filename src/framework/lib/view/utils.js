
/**
 * 切换显示帧
 * TODO 需要判断重复性
 */
function SetFrame(entityId = 0, spriteFrame = null, xOffset = 0, yOffset = 0){
    AddDisplay(entityId, spriteFrame, xOffset, yOffset);
}

/**
 * 隐藏当前单位的帧图像，剔除出显示队列
 */
function Hide(entityId = 0){
    RemoveDisplay(entityId);
}


/**
 * 查找渲染显示组件
 * options : {
 *      angle : 180,
 *      scale : 0.5
 * }
 */
function GetRenderComponent(entityId = 0, options = null) {
    let com = getRenderComponent(entityId);
    return com ? com : createRenderComponent(entityId, options);
}

/**
 * 加入渲染队列
 * layerOrder = 图层顺序，数值从低到高顺序渲染
 * order = 自己所在图层内的顺序
 */
function AddDisplay(displayObject = null, unitPos = null, layerOrder = 0, order = 0, offset = null) {
    let ds = createDisplayTuple(displayObject, unitPos, order, layerOrder, offset);
    addToLayer(ds)
    return ds;
}

function RemoveDisplay(displayTuple = null) {
    removeFromLayer(displayTuple);
}

function AddLayer(order = 0, type = 0){
    createLayer(order, type);
}

export {
    GetRenderComponent,
    AddDisplay, RemoveDisplay,
    AddLayer
}